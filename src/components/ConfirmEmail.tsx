import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const ConfirmEmail = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your email...');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        // Get the token from the URL query parameters
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        const type = queryParams.get('type');
        
        if (!token || type !== 'email_confirmation') {
          setStatus('error');
          setMessage('Invalid confirmation link. Please request a new one.');
          return;
        }

        // Verify the email with Supabase
        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'email',
        });

        if (error) {
          setStatus('error');
          setMessage(`Error confirming email: ${error.message}`);
        } else {
          setStatus('success');
          setMessage('Your email has been confirmed successfully! Redirecting to login...');
          
          // Redirect to login page after a short delay
          setTimeout(() => {
            navigate('/admin/login');
          }, 3000);
        }
      } catch (err) {
        setStatus('error');
        setMessage('An unexpected error occurred. Please try again later.');
        console.error('Email confirmation error:', err);
      }
    };

    confirmEmail();
  }, [location.search, navigate]);

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
                onClick={() => navigate('/admin/login')}
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
