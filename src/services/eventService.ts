import { supabase, adminSupabase } from '../lib/supabase';
import { Event } from '../lib/types';

// Get all events
export const getAllEvents = async (): Promise<Event[]> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('display_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching events:', error);
    throw new Error(error.message);
  }
  
  return data || [];
};

// Get active events for the public site
export const getActiveEvents = async (): Promise<Event[]> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching active events:', error);
    throw new Error(error.message);
  }
  
  return data || [];
};

// Create a new event
export const createEvent = async (event: Omit<Event, 'id' | 'created_at'>): Promise<Event> => {
  console.log('createEvent called with data:', event);
  
  // Validate required fields
  if (!event.title) {
    console.error('Event title is required');
    throw new Error('Event title is required');
  }
  
  // Try with admin client first (should have higher privileges)
  console.log('Attempting to create event with admin client');
  let result = await adminSupabase
    .from('events')
    .insert([event])
    .select()
    .single();
  
  // If that fails, try with regular client
  if (result.error) {
    console.log('Admin client failed with error:', result.error);
    
    if (result.error.code === '42501') { // RLS policy violation
      console.log('Admin client failed due to RLS, trying with regular client');
      result = await supabase
        .from('events')
        .insert([event])
        .select()
        .single();
    } else if (result.error.code === '23502') { // not-null violation
      console.error('Not-null violation. Missing required fields:', result.error.details);
      throw new Error(`Database error: Missing required fields - ${result.error.details}`);
    } else if (result.error.code === '23505') { // unique violation
      console.error('Unique constraint violation:', result.error.details);
      throw new Error(`Database error: Duplicate entry - ${result.error.details}`);
    }
  }
  
  if (result.error) {
    console.error('Error creating event:', result.error);
    throw new Error(`Failed to create event: ${result.error.message}`);
  }
  
  console.log('Event created successfully:', result.data);
  return result.data;
};

// Update an existing event
export const updateEvent = async (id: string, event: Partial<Event>): Promise<Event> => {
  // Try with admin client first
  let result = await adminSupabase
    .from('events')
    .update(event)
    .eq('id', id)
    .select()
    .single();
  
  // If that fails, try with regular client
  if (result.error && result.error.code === '42501') { // RLS policy violation
    console.log('Admin client failed due to RLS, trying with regular client');
    result = await supabase
      .from('events')
      .update(event)
      .eq('id', id)
      .select()
      .single();
  }
  
  if (result.error) {
    console.error('Error updating event:', result.error);
    throw new Error(result.error.message);
  }
  
  return result.data;
};

// Delete an event
export const deleteEvent = async (id: string): Promise<void> => {
  // Try with admin client first
  let result = await adminSupabase
    .from('events')
    .delete()
    .eq('id', id);
  
  // If that fails, try with regular client
  if (result.error && result.error.code === '42501') { // RLS policy violation
    console.log('Admin client failed due to RLS, trying with regular client');
    result = await supabase
      .from('events')
      .delete()
      .eq('id', id);
  }
  
  if (result.error) {
    console.error('Error deleting event:', result.error);
    throw new Error(result.error.message);
  }
};

// Update event display order
export const updateEventOrder = async (id: string, newOrder: number): Promise<Event> => {
  const { data, error } = await adminSupabase
    .from('events')
    .update({ display_order: newOrder })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating event order:', error);
    throw new Error(error.message);
  }
  
  return data;
};
