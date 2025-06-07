import { supabase } from '../lib/supabase';

/**
 * Sign up with email and password
 */
export const signUpWithEmail = async (email: string, password: string, userData?: Record<string, string | number | boolean>) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
      emailRedirectTo: `${window.location.origin}/confirm-email`,
    }
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/**
 * Sign in with email and password
 */
export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/**
 * Sign out the current user
 * @param redirectUrl - Optional URL to redirect to after logout (defaults to '/login')
 */
export const signOut = async (redirectUrl: string = '/login') => {
  try {
    // First, clear browser storage
    localStorage.clear();
    sessionStorage.clear();
    
    // Clear all cookies related to authentication
    document.cookie.split(';').forEach(c => {
      document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
    
    // Then sign out from Supabase with global scope
    const { error } = await supabase.auth.signOut({ scope: 'global' });
    
    if (error) {
      console.error('Supabase signOut error:', error);
      throw error;
    }
    
    // Force a delay to ensure everything is cleared
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Force a complete page reload to clear any cached state
    window.location.href = redirectUrl;
    
    return true;
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};

/**
 * Get the current session
 */
export const getCurrentSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data.session;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = async () => {
  const session = await getCurrentSession();
  return !!session;
};
