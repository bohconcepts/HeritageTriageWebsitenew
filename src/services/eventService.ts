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
  console.log(`Attempting to update event with ID: ${id}`);
  
  // First check if the event exists
  const checkResult = await adminSupabase
    .from('events')
    .select('id')
    .eq('id', id);
    
  if (checkResult.error) {
    console.error('Error checking if event exists:', checkResult.error);
    throw new Error(`Failed to check if event exists: ${checkResult.error.message}`);
  }
  
  if (!checkResult.data || checkResult.data.length === 0) {
    console.error(`Event with ID ${id} not found in database`);
    throw new Error(`Event with ID ${id} not found`);
  }
  
  console.log(`Event with ID ${id} found, proceeding with update`);
  
  // Try with admin client first
  let result = await adminSupabase
    .from('events')
    .update(event)
    .eq('id', id)
    .select();
  
  // If that fails, try with regular client
  if (result.error && result.error.code === '42501') { // RLS policy violation
    console.log('Admin client failed due to RLS, trying with regular client');
    result = await supabase
      .from('events')
      .update(event)
      .eq('id', id)
      .select();
  }
  
  if (result.error) {
    console.error('Error updating event:', result.error);
    throw new Error(`Failed to update event: ${result.error.message}`);
  }
  
  if (!result.data || result.data.length === 0) {
    console.error(`No rows updated for event ID: ${id}`);
    throw new Error(`Event with ID ${id} could not be updated`);
  }
  
  console.log(`Successfully updated event with ID: ${id}`);
  return result.data[0];
};

// Delete an event
export const deleteEvent = async (id: string): Promise<void> => {
  console.log(`Attempting to delete event with ID: ${id} from database`);
  
  // Try with admin client first
  let result = await adminSupabase
    .from('events')
    .delete()
    .eq('id', id)
    .select(); // Add select to get the deleted rows
  
  // If that fails, try with regular client
  if (result.error && result.error.code === '42501') { // RLS policy violation
    console.log('Admin client failed due to RLS, trying with regular client');
    result = await supabase
      .from('events')
      .delete()
      .eq('id', id)
      .select(); // Add select to get the deleted rows
  }
  
  if (result.error) {
    console.error('Error deleting event:', result.error);
    throw new Error(`Database error: ${result.error.message}`);
  }
  
  // Check if any rows were actually deleted
  if (!result.data || result.data.length === 0) {
    console.error(`No rows deleted for event ID: ${id}`);
    throw new Error(`Event with ID ${id} not found or could not be deleted`);
  }
  
  console.log(`Successfully deleted ${result.data.length} row(s) for event ID: ${id}`);
};

// Update event display order
export const updateEventOrder = async (id: string, newOrder: number): Promise<Event> => {
  console.log(`Attempting to update order for event with ID: ${id} to ${newOrder}`);
  
  // First check if the event exists
  const checkResult = await adminSupabase
    .from('events')
    .select('id')
    .eq('id', id);
    
  if (checkResult.error) {
    console.error('Error checking if event exists:', checkResult.error);
    throw new Error(`Failed to check if event exists: ${checkResult.error.message}`);
  }
  
  if (!checkResult.data || checkResult.data.length === 0) {
    console.error(`Event with ID ${id} not found in database`);
    throw new Error(`Event with ID ${id} not found`);
  }
  
  console.log(`Event with ID ${id} found, proceeding with order update`);
  
  // Try with admin client first
  const result = await adminSupabase
    .from('events')
    .update({ display_order: newOrder })
    .eq('id', id)
    .select();
  
  if (result.error) {
    console.error('Error updating event order:', result.error);
    throw new Error(`Failed to update event order: ${result.error.message}`);
  }
  
  if (!result.data || result.data.length === 0) {
    console.error(`No rows updated for event order, ID: ${id}`);
    throw new Error(`Event with ID ${id} order could not be updated`);
  }
  
  console.log(`Successfully updated order for event with ID: ${id} to ${newOrder}`);
  return result.data[0];
};
