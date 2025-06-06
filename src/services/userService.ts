import { adminSupabase, supabase } from '../lib/supabase';

export interface UserData {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at?: string;
  user_metadata?: {
    full_name?: string;
    role?: string;
  };
  role?: string;
  is_active?: boolean;
}

/**
 * Get all users (admin only)
 */
export const getAllUsers = async (): Promise<UserData[]> => {
  // Using admin client with service role key
  const { data, error } = await adminSupabase.auth.admin.listUsers();

  if (error) {
    throw new Error(error.message);
  }

  // Transform the data to match our interface
  return data.users.map(user => ({
    id: user.id,
    email: user.email || '',
    created_at: user.created_at || '',
    last_sign_in_at: user.last_sign_in_at,
    user_metadata: user.user_metadata as UserData['user_metadata'],
    role: (user.user_metadata as Record<string, string>)?.role || 'user',
    is_active: !(user as unknown as { banned_until?: string }).banned_until
  }));
};

/**
 * Get current user
 */
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data.user;
};

/**
 * Create a new user (admin only)
 */
export const createUser = async (email: string, password: string, userData: { full_name?: string; role?: string }) => {
  // Using admin client with service role key
  const { data, error } = await adminSupabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Auto-confirm the email
    user_metadata: userData
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/**
 * Update user details (admin only)
 */
export const updateUser = async (userId: string, userData: { email?: string; user_metadata?: Record<string, unknown> }) => {
  // Using admin client with service role key
  const { data, error } = await adminSupabase.auth.admin.updateUserById(
    userId,
    userData
  );

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/**
 * Delete a user (admin only)
 */
export const deleteUser = async (userId: string) => {
  // Using admin client with service role key
  const { error } = await adminSupabase.auth.admin.deleteUser(userId);

  if (error) {
    throw new Error(error.message);
  }

  return true;
};

/**
 * Reset user password (admin only)
 */
export const resetUserPassword = async (userId: string, password: string) => {
  // Using admin client with service role key
  const { data, error } = await adminSupabase.auth.admin.updateUserById(
    userId,
    { password }
  );

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/**
 * Invite a new user by sending them an email (admin only)
 */
export const inviteUser = async (email: string, userData: { full_name?: string; role?: string }) => {
  // Generate a random password (user will reset it)
  const tempPassword = Math.random().toString(36).slice(-10);
  
  // Create the user
  const { user } = await createUser(email, tempPassword, userData);
  
  if (!user) {
    throw new Error('Failed to create user');
  }
  
  // Send password reset email
  const { error } = await adminSupabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) {
    throw new Error(error.message);
  }

  return user;
};
