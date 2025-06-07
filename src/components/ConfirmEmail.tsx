import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { AuthError } from '@supabase/supabase-js';

const ConfirmEmail = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your email...');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        // First try to get the current session
        await supabase.auth.getSession();
        
        // The hash part of the URL contains the token information
        const hash = location.hash.substring(1); // Remove the # character
        const hashParams = new URLSearchParams(hash);
        
        // Get access_token and refresh_token from hash fragment
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const type = hashParams.get('type');
        
        // Check if this is a recovery link
        if (type === 'recovery') {
          // For password recovery links, redirect to reset password page
          navigate('/reset-password' + location.hash);
          return;
        }
        
        // If we don't have tokens in the hash, check the query params as fallback
        if (!accessToken && !refreshToken) {
          const queryParams = new URLSearchParams(location.search);
          const token = queryParams.get('token');
          
          if (!token) {
            setStatus('error');
            setMessage('Invalid confirmation link. Please request a new one.');
            return;
          }
          
          // Try to verify with token from query params
          const { error } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: 'email',
          });
          
          if (error) {
            handleAuthError(error);
            return;
          }
        } else {
          // If we have tokens in the hash, set the session directly
          if (accessToken) {
            const { error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken || '',
            });
            
            if (error) {
              handleAuthError(error);
              return;
            }
          }
        }

        // If we got here, the confirmation was successful
        setStatus('success');
        setMessage('Your email has been confirmed successfully! Redirecting to login...');
        
        // Redirect to login page after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (err) {
        setStatus('error');
        if (err instanceof AuthError) {
          handleAuthError(err);
        } else {
          setMessage('An unexpected error occurred. Please try again later.');
          console.error('Email confirmation error:', err);
        }
      }
    };
    
    const handleAuthError = (error: AuthError) => {
      setStatus('error');
      
      // Handle specific error cases
      if (error.message.includes('session')) {
        setMessage('Error confirming email: Auth session missing!');
      } else if (error.message.includes('expired')) {
        setMessage('This confirmation link has expired. Please request a new one.');
      } else {
        setMessage(`Error confirming email: ${error.message}`);
      }
    };

    confirmEmail();
  }, [location.search, location.hash, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Email Confirmation
          </h2>
        </div>
        
        <div className={`rounded-md p-4 ${
          status === 'loading' ? 'bg-blue-50' : 
          status === 'success' ? 'bg-green-50' : 
          'bg-red-50'
        }`}>
          {status === 'loading' && (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mr-3"></div>
              <p className="text-blue-700">{message}</p>
            </div>
          )}
          
          {status === 'success' && (
            <p className="text-green-700">{message}</p>
          )}
          
          {status === 'error' && (
            <div>
              <p className="text-red-700">{message}</p>
              <button 
                onClick={() => navigate('/login')}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
