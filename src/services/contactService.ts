import { supabase, adminSupabase, ContactFormData } from '../lib/supabase';

// Table name for contact submissions
const CONTACTS_TABLE = 'contacts';

/**
 * Submit a new contact form entry
 */
export const submitContactForm = async (formData: Omit<ContactFormData, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from(CONTACTS_TABLE)
    .insert([
      { 
        ...formData,
        status: 'new',
        created_at: new Date().toISOString()
      }
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/**
 * Get all contact form submissions (admin only)
 */
export const getAllContacts = async () => {
  const { data, error } = await adminSupabase
    .from(CONTACTS_TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/**
 * Get a single contact by ID (admin only)
 */
export const getContactById = async (id: string) => {
  const { data, error } = await adminSupabase
    .from(CONTACTS_TABLE)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/**
 * Update a contact (admin only)
 */
export const updateContact = async (id: string, updates: Partial<ContactFormData>) => {
  const { data, error } = await adminSupabase
    .from(CONTACTS_TABLE)
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/**
 * Delete a contact (admin only)
 */
export const deleteContact = async (id: string) => {
  const { error } = await adminSupabase
    .from(CONTACTS_TABLE)
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return true;
};
