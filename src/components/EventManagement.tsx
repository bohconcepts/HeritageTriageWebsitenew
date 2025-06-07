import React, { useState, useEffect } from 'react';
import { 
  getAllEvents, 
  createEvent, 
  updateEvent, 
  deleteEvent, 
  updateEventOrder 
} from '../services/eventService';
import { uploadFile, deleteFile } from '../services/storageService';
import { Event } from '../lib/types';
import { Plus } from 'lucide-react';
import EventForm from './EventForm';
import EventList from './EventList';

const EventManagement: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Partial<Event> | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState<Omit<Event, 'id' | 'created_at'>>({
    image_url: '',
    registration_link: '',
    is_active: true,
    display_order: 0,
  });

  // Fetch all events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await getAllEvents();
      setEvents(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      // Handle file input
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const file = files[0];
        setImageFile(file);
        
        // Create a preview URL for the image
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Validate that we have an image (either a new upload or existing URL when editing)
    if (!imageFile && !formData.image_url && !isEditing) {
      setError('Please select an image to upload');
      setLoading(false);
      return;
    }

    try {
      // If we have a new image file, upload it first
      let finalImageUrl = formData.image_url;
      if (imageFile) {
        setUploadingImage(true);
        try {
          const uploadedUrl = await uploadFile(imageFile, 'images');
          if (uploadedUrl) {
            finalImageUrl = uploadedUrl;
            setFormData({ ...formData, image_url: uploadedUrl });
          }
        } catch (uploadErr) {
          console.error('Error uploading image:', uploadErr);
          setError('Failed to upload image. Please try again.');
          setLoading(false);
          return;
        } finally {
          setUploadingImage(false);
        }
      }

      // Proceed with event creation/update
      if (isEditing && currentEvent?.id) {
        // If editing and we have a new image, we might want to delete the old one
        if (imageFile && currentEvent.image_url && currentEvent.image_url !== finalImageUrl) {
          try {
            await deleteFile(currentEvent.image_url, 'images');
          } catch (deleteErr) {
            console.error('Error deleting old image (non-critical):', deleteErr);
            // Continue with update even if delete fails
          }
        }
        
        // Update existing event
        await updateEvent(currentEvent.id, { ...formData, image_url: finalImageUrl });
        setSuccess('Event updated successfully!');
      } else {
        // Create new event
        // Set display order to be the highest + 1 if not specified
        if (!formData.display_order) {
          const maxOrder = events.length > 0 
            ? Math.max(...events.map(e => e.display_order)) 
            : 0;
          formData.display_order = maxOrder + 1;
        }
        await createEvent({ ...formData, image_url: finalImageUrl });
        setSuccess('Event created successfully!');
      }
      
      // Reset form and refresh events
      resetForm();
      fetchEvents();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving event:', err);
      setError('Failed to save event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event: Event) => {
    setCurrentEvent(event);
    setFormData({
      image_url: event.image_url,
      registration_link: event.registration_link || '',
      is_active: event.is_active,
      display_order: event.display_order,
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setLoading(true);
      try {
        await deleteEvent(id);
        setEvents(events.filter(event => event.id !== id));
        setSuccess('Event deleted successfully!');
      } catch (err) {
        console.error('Error deleting event:', err);
        setError('Failed to delete event. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index <= 0) return;
    
    const eventToMove = events[index];
    const eventAbove = events[index - 1];
    
    if (!eventToMove.id || !eventAbove.id) return;
    
    setLoading(true);
    try {
      // Swap display orders
      await updateEventOrder(eventToMove.id, eventAbove.display_order);
      await updateEventOrder(eventAbove.id, eventToMove.display_order);
      
      // Refresh events
      fetchEvents();
    } catch (err) {
      console.error('Error reordering events:', err);
      setError('Failed to reorder events. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMoveDown = async (index: number) => {
    if (index >= events.length - 1) return;
    
    const eventToMove = events[index];
    const eventBelow = events[index + 1];
    
    if (!eventToMove.id || !eventBelow.id) return;
    
    setLoading(true);
    try {
      // Swap display orders
      await updateEventOrder(eventToMove.id, eventBelow.display_order);
      await updateEventOrder(eventBelow.id, eventToMove.display_order);
      
      // Refresh events
      fetchEvents();
    } catch (err) {
      console.error('Error reordering events:', err);
      setError('Failed to reorder events. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    setLoading(true);
    try {
      await updateEvent(id, { is_active: !isActive });
      setEvents(events.map(event => 
        event.id === id ? { ...event, is_active: !isActive } : event
      ));
      setSuccess(`Event ${!isActive ? 'activated' : 'deactivated'} successfully!`);
    } catch (err) {
      console.error('Error updating event status:', err);
      setError('Failed to update event status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      image_url: '',
      registration_link: '',
      is_active: true,
      display_order: 0,
    });
    setCurrentEvent(null);
    setIsEditing(false);
    setImageFile(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openNewEventModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Event Management</h2>
        <button
          onClick={openNewEventModal}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-150 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Event
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      {loading && !isModalOpen ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image Preview
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registration Link
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Display Order
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No events found. Click "Add New Event" to create one.
                  </td>
                </tr>
              ) : (
                events.map((event, index) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-20 w-20">
                          <img 
                            src={event.image_url} 
                            alt="Event" 
                            className="h-20 w-20 object-cover rounded"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {event.registration_link ? (
                        <a 
                          href={event.registration_link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {event.registration_link.length > 30 
                            ? `${event.registration_link.substring(0, 30)}...` 
                            : event.registration_link}
                        </a>
                      ) : (
                        <span className="text-gray-500">None</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleActive(event.id!, event.is_active)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          event.is_active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {event.is_active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.display_order}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleMoveUp(index)}
                          disabled={index === 0}
                          className={`p-1 rounded ${
                            index === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'
                          }`}
                          title="Move up"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleMoveDown(index)}
                          disabled={index === events.length - 1}
                          className={`p-1 rounded ${
                            index === events.length - 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'
                          }`}
                          title="Move down"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(event)}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                          title="Edit event"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(event.id!)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded"
                          title="Delete event"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Event Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                {isEditing ? 'Edit Event' : 'Add New Event'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                title="Close modal"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="image_upload" className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Image *
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    id="image_upload"
                    name="image_upload"
                    accept="image/*"
                    onChange={handleInputChange}
                    ref={fileInputRef}
                    className="hidden"
                    required={isEditing ? false : true}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {imageFile ? 'Change Image' : 'Select Image'}
                  </button>
                  {imageFile && (
                    <span className="text-sm text-gray-500">{imageFile.name}</span>
                  )}
                </div>
                {uploadingImage && (
                  <div className="mt-2 text-sm text-blue-500">Uploading image...</div>
                )}
                {formData.image_url && !imageFile && isEditing && (
                  <div className="mt-2 text-sm text-gray-500">
                    Current image will be kept if no new image is selected
                  </div>
                )}
              </div>

              {(imagePreview || formData.image_url) && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image Preview
                  </label>
                  <div className="w-full h-40 bg-gray-100 rounded-md overflow-hidden">
                    <img
                      src={imagePreview || formData.image_url}
                      alt="Event Preview"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="mb-4">
                <label htmlFor="registration_link" className="block text-sm font-medium text-gray-700 mb-1">
                  Registration Link
                </label>
                <input
                  type="url"
                  id="registration_link"
                  name="registration_link"
                  value={formData.registration_link}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/register"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="display_order" className="block text-sm font-medium text-gray-700 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  id="display_order"
                  name="display_order"
                  value={formData.display_order}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Lower numbers will be displayed first. Leave at 0 for automatic ordering.
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
                    Active (visible on the website)
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      {isEditing ? 'Update Event' : 'Create Event'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventManagement;
