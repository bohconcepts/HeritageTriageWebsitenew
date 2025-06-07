import React from 'react';
import { signOut } from '../services/authService';

interface LogoutButtonProps {
  redirectUrl?: string;
  className?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ 
  redirectUrl = '/login',
  className = "px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-150"
}) => {
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      // Use direct DOM manipulation to ensure the button is visible
      const logoutMessage = document.createElement('div');
      logoutMessage.textContent = 'Logging out...';
      logoutMessage.style.position = 'fixed';
      logoutMessage.style.top = '20px';
      logoutMessage.style.right = '20px';
      logoutMessage.style.backgroundColor = 'rgba(0,0,0,0.7)';
      logoutMessage.style.color = 'white';
      logoutMessage.style.padding = '10px';
      logoutMessage.style.borderRadius = '5px';
      logoutMessage.style.zIndex = '9999';
      document.body.appendChild(logoutMessage);
      
      // Clear all storage and cookies
      localStorage.clear();
      sessionStorage.clear();
      
      // Clear cookies
      document.cookie.split(';').forEach(c => {
        document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
      });
      
      // Call Supabase signOut
      await signOut(redirectUrl);
      
      // Force redirect after a short delay
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 300);
    } catch (error) {
      console.error('Error during logout:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  return (
    <a 
      href="#logout"
      onClick={handleLogout}
      className={`${className} cursor-pointer relative z-50`}
    >
      Logout
    </a>
  );
};

export default LogoutButton;
