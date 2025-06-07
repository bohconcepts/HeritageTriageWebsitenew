import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../services/userService';
import LogoutButton from './LogoutButton';

interface UserData {
  id: string;
  email: string;
  full_name?: string;
}

const UserDashboard: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const userData = await getCurrentUser();
      
      if (userData) {
        setUser({
          id: userData.id,
          email: userData.email || '',
          full_name: (userData.user_metadata as Record<string, string>)?.full_name || '',
        });
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
    } finally {
      setLoading(false);
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-gray-800">Heritage Triage</h1>
          </div>
        </header>
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-500">Loading dashboard...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">Heritage Triage</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user?.full_name || 'User'}</span>
            <LogoutButton />
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6 bg-gray-50">
            <h3 className="text-lg leading-6 font-medium text-gray-800">
              My Dashboard
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-600">
              Welcome to your personal Heritage Triage dashboard
            </p>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-lg font-medium text-gray-800 mb-2">Your Profile</h4>
                <p className="text-gray-600 mb-4">Manage your personal information and account settings</p>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Full name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user?.full_name || 'Not provided'}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Email address</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
                  </div>
                </dl>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-lg font-medium text-gray-800 mb-2">Upcoming Events</h4>
                <p className="text-gray-600 mb-4">Stay updated with our latest events and activities</p>
                <p className="text-sm text-gray-500">No upcoming events at this time.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white shadow-inner mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} Heritage Triage. All rights reserved.</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">User Portal v1.0</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserDashboard;
