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

  const handleSubmit = async (
    formData: Omit<Event, 'id' | 'created_at'>, 
    mediaFiles: { image?: File, video?: File }
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Handle image upload if provided
      let finalImageUrl = formData.image_url;
      if (mediaFiles.image) {
        try {
          const uploadedUrl = await uploadFile(mediaFiles.image, 'images');
          if (uploadedUrl) {
            finalImageUrl = uploadedUrl;
          }
        } catch (uploadErr) {
          console.error('Error uploading image:', uploadErr);
          setError('Failed to upload image. Please try again.');
          setLoading(false);
          return;
        }
      }

      // Handle video upload if provided
      let finalVideoUrl = formData.video_url;
      if (mediaFiles.video) {
        try {
          const uploadedUrl = await uploadFile(mediaFiles.video, 'videos');
          if (uploadedUrl) {
            finalVideoUrl = uploadedUrl;
          }
        } catch (uploadErr) {
          console.error('Error uploading video:', uploadErr);
          setError('Failed to upload video. Please try again.');
          setLoading(false);
          return;
        }
      }

      // Proceed with event creation/update
      if (isEditing && currentEvent?.id) {
        // If editing and we have a new image, we might want to delete the old one
        if (mediaFiles.image && currentEvent.image_url && currentEvent.image_url !== finalImageUrl) {
          try {
            await deleteFile(currentEvent.image_url, 'images');
          } catch (deleteErr) {
            console.error('Error deleting old image (non-critical):', deleteErr);
            // Continue with update even if delete fails
          }
        }

        // If editing and we have a new video, delete the old one
        if (mediaFiles.video && currentEvent.video_url && currentEvent.video_url !== finalVideoUrl) {
          try {
            await deleteFile(currentEvent.video_url, 'videos');
          } catch (deleteErr) {
            console.error('Error deleting old video (non-critical):', deleteErr);
            // Continue with update even if delete fails
          }
        }
        
        // Update existing event
        await updateEvent(currentEvent.id, { 
          ...formData, 
          image_url: finalImageUrl,
          video_url: finalVideoUrl
        });
        setSuccess('Event updated successfully!');
      } else {
        // Create new event
        // Set display order to be the highest + 1 if not specified
        let displayOrder = formData.display_order;
        if (!displayOrder) {
          const maxOrder = events.length > 0 
            ? Math.max(...events.map(e => e.display_order)) 
            : 0;
          displayOrder = maxOrder + 1;
        }
        
        await createEvent({ 
          ...formData, 
          image_url: finalImageUrl,
          video_url: finalVideoUrl,
          display_order: displayOrder
        });
        setSuccess('Event created successfully!');
      }
      
      // Refresh events and close modal
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
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setLoading(true);
      try {
        // Get the event to delete so we can clean up its files
        const eventToDelete = events.find(event => event.id === id);
        
        if (!eventToDelete) {
          console.error(`Event with ID ${id} not found in local state`);
          setError('Failed to delete event: Event not found in local state');
          setLoading(false);
          return;
        }
        
        console.log(`Attempting to delete event with ID: ${id}`);
        
        // Delete the event from the database - this will throw an error if deletion fails
        await deleteEvent(id);
        // If we reach here, deletion was successful
        
        // Clean up associated files
        const fileDeletePromises = [];
        
        // Handle image deletion
        if (eventToDelete.image_url) {
          console.log(`Attempting to delete image: ${eventToDelete.image_url}`);
          const imagePromise = deleteFile(eventToDelete.image_url, 'images')
            .then(() => console.log(`Successfully deleted image: ${eventToDelete.image_url}`))
            .catch(err => {
              console.error(`Error deleting image file: ${eventToDelete.image_url}`, err);
              // Non-critical error, don't throw
            });
          fileDeletePromises.push(imagePromise);
        }
        
        // Handle video deletion
        if (eventToDelete.video_url) {
          console.log(`Attempting to delete video: ${eventToDelete.video_url}`);
          const videoPromise = deleteFile(eventToDelete.video_url, 'videos')
            .then(() => console.log(`Successfully deleted video: ${eventToDelete.video_url}`))
            .catch(err => {
              console.error(`Error deleting video file: ${eventToDelete.video_url}`, err);
              // Non-critical error, don't throw
            });
          fileDeletePromises.push(videoPromise);
        }
        
        // Wait for all file deletions to complete (or fail)
        await Promise.allSettled(fileDeletePromises);
        
        // Update local state - use a callback to ensure we're working with the latest state
        setEvents(prevEvents => {
          const updatedEvents = prevEvents.filter(event => event.id !== id);
          console.log(`Updated events list, removed event with ID ${id}. New count: ${updatedEvents.length}`);
          return updatedEvents;
        });
        
        // Force a refresh of events from the database to ensure UI is in sync
        fetchEvents();
        
        setSuccess('Event deleted successfully!');
        console.log(`Event with ID ${id} completely deleted`);
      } catch (err) {
        console.error(`Critical error deleting event ${id}:`, err);
        setError(`Failed to delete event: ${err instanceof Error ? err.message : 'Unknown error'}`);
        
        // If there was an error, refresh events from the database to ensure UI is in sync
        fetchEvents();
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

  const openNewEventModal = () => {
    setCurrentEvent(null);
    setIsEditing(false);
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
        <EventList
          events={events}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onMoveUp={handleMoveUp}
          onMoveDown={handleMoveDown}
          onToggleActive={handleToggleActive}
        />
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <EventForm
              isEditing={isEditing}
              currentEvent={currentEvent}
              onSubmit={handleSubmit}
              onCancel={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventManagement;
