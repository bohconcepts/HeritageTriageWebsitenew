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
  // Try with admin client first (should have higher privileges)
  let result = await adminSupabase
    .from('events')
    .insert([event])
    .select()
    .single();
  
  // If that fails, try with regular client
  if (result.error && result.error.code === '42501') { // RLS policy violation
    console.log('Admin client failed due to RLS, trying with regular client');
    result = await supabase
      .from('events')
      .insert([event])
      .select()
      .single();
  }
  
  if (result.error) {
    console.error('Error creating event:', result.error);
    throw new Error(result.error.message);
  }
  
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
