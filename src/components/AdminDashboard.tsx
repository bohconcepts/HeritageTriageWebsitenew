import React, { useState, useEffect } from 'react';
import { getAllContacts, updateContact, deleteContact } from '../services/contactService';
import LogoutButton from './LogoutButton';
import { ContactFormData } from '../lib/supabase';
import UserManagement from './UserManagement';
import UserProfile from './UserProfile';
import EventManagement from './EventManagement';

const AdminDashboard: React.FC = () => {
  const [contacts, setContacts] = useState<ContactFormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingContact, setEditingContact] = useState<ContactFormData | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'contacts' | 'users' | 'profile' | 'events'>('contacts');

  // Fetch all contacts on component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await getAllContacts();
      setContacts(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError('Failed to load contacts. Please try again.');
    } finally {
      setLoading(false);
    }
  };



  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateContact(id, { status });
      setContacts(contacts.map(contact => 
        contact.id === id ? { ...contact, status } : contact
      ));
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Failed to update status. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await deleteContact(id);
        setContacts(contacts.filter(contact => contact.id !== id));
      } catch (err) {
        console.error('Error deleting contact:', err);
        setError('Failed to delete contact. Please try again.');
      }
    }
  };

  const handleEditClick = (contact: ContactFormData) => {
    setEditingContact({ ...contact });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (editingContact) {
      setEditingContact({
        ...editingContact,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSaveEdit = async () => {
    if (!editingContact?.id) return;
    
    try {
      await updateContact(editingContact.id, editingContact);
      setContacts(contacts.map(contact => 
        contact.id === editingContact.id ? editingContact : contact
      ));
      setEditingContact(null);
    } catch (err) {
      console.error('Error updating contact:', err);
      setError('Failed to update contact. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
  };

  // Filter contacts based on status
  const filteredContacts = statusFilter === 'all'
    ? contacts
    : contacts.filter(contact => contact.status === statusFilter);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">Heritage Triage Admin</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, Admin</span>
            <LogoutButton redirectUrl="/admin/login" />
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
      
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'contacts' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Contacts
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'events' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'users' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            User Management
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'profile' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            My Profile
          </button>
        </nav>
      </div>

      {activeTab === 'contacts' && (
        <>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="status-filter" className="mr-2 font-medium">
              Filter by Status:
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded p-2"
              aria-label="Filter contacts by status"
            >
              <option value="all">All</option>
              <option value="new">New</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2 text-gray-500">Loading contacts...</p>
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No contacts found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredContacts.map((contact) => (
                    <tr key={contact.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{contact.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{contact.company}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={contact.status || 'new'}
                          onChange={(e) => handleStatusChange(contact.id!, e.target.value)}
                          className="text-sm rounded border border-gray-300 p-1"
                          aria-label={`Change status for ${contact.name}`}
                        >
                          <option value="new">New</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {contact.created_at ? new Date(contact.created_at).toLocaleDateString() : 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditClick(contact)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(contact.id!)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
      
      {activeTab === 'events' && <EventManagement />}
      {activeTab === 'users' && <UserManagement />}
      {activeTab === 'profile' && <UserProfile />}

      {editingContact && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Contact</h3>
            
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={editingContact.name}
                onChange={handleEditChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={editingContact.email}
                onChange={handleEditChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={editingContact.company || ''}
                onChange={handleEditChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={editingContact.message}
                onChange={handleEditChange}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded"
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={editingContact.status || 'new'}
                onChange={handleEditChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      </main>
      
      {/* Footer */}
      <footer className="bg-white shadow-inner mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} Heritage Triage. All rights reserved.</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Admin Portal v1.0</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
