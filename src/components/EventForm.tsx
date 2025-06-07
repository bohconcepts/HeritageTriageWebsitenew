import React, { useState, useRef, useEffect } from 'react';
import { Event } from '../lib/types';
import { uploadFile, deleteFile } from '../services/storageService';
import { Upload, X } from 'lucide-react';

interface EventFormProps {
  isEditing: boolean;
  currentEvent: Partial<Event> | null;
  onSubmit: (eventData: Omit<Event, 'id' | 'created_at'>, mediaFiles: { image?: File, video?: File }) => Promise<void>;
  onCancel: () => void;
}

const EventForm: React.FC<EventFormProps> = ({
  isEditing,
  currentEvent,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<Omit<Event, 'id' | 'created_at'>>({
    image_url: '',
    video_url: '',
    registration_link: '',
    is_active: true,
    display_order: 0,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [videoPreview, setVideoPreview] = useState<string>('');
  const [uploadingMedia, setUploadingMedia] = useState(false);
  
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Initialize form data when editing an existing event
  useEffect(() => {
    if (currentEvent) {
      setFormData({
        image_url: currentEvent.image_url || '',
        video_url: currentEvent.video_url || '',
        registration_link: currentEvent.registration_link || '',
        is_active: currentEvent.is_active !== undefined ? currentEvent.is_active : true,
        display_order: currentEvent.display_order || 0,
      });
    }
  }, [currentEvent]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const file = files[0];
        
        if (name === 'image_upload') {
          setImageFile(file);
          // Create a preview URL for the image
          const previewUrl = URL.createObjectURL(file);
          setImagePreview(previewUrl);
        } else if (name === 'video_upload') {
          setVideoFile(file);
          // Create a preview URL for the video
          const previewUrl = URL.createObjectURL(file);
          setVideoPreview(previewUrl);
        }
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that we have an image (either a new upload or existing URL when editing)
    if (!imageFile && !formData.image_url && !isEditing) {
      alert('Please select an image to upload');
      return;
    }

    setUploadingMedia(true);
    
    try {
      await onSubmit(formData, { 
        image: imageFile || undefined, 
        video: videoFile || undefined 
      });
    } catch (error) {
      console.error('Error in form submission:', error);
    } finally {
      setUploadingMedia(false);
    }
  };

  const clearPreviews = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview('');
    }
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
      setVideoPreview('');
    }
  };

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      clearPreviews();
    };
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      {/* Image Upload */}
      <div className="mb-4">
        <label htmlFor="image_upload" className="block text-sm font-medium text-gray-700 mb-1">
          Upload Image {!isEditing && '*'}
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="file"
            id="image_upload"
            name="image_upload"
            accept="image/*"
            onChange={handleInputChange}
            ref={imageInputRef}
            className="hidden"
            required={isEditing ? false : true}
          />
          <button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Upload className="mr-2 h-4 w-4" />
            {imageFile ? 'Change Image' : 'Select Image'}
          </button>
          {imageFile && (
            <span className="text-sm text-gray-500">{imageFile.name}</span>
          )}
        </div>
        {formData.image_url && !imageFile && isEditing && (
          <div className="mt-2 text-sm text-gray-500">
            Current image will be kept if no new image is selected
          </div>
        )}
      </div>

      {/* Image Preview */}
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

      {/* Video Upload */}
      <div className="mb-4">
        <label htmlFor="video_upload" className="block text-sm font-medium text-gray-700 mb-1">
          Upload Video (Optional)
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="file"
            id="video_upload"
            name="video_upload"
            accept="video/*"
            onChange={handleInputChange}
            ref={videoInputRef}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => videoInputRef.current?.click()}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Upload className="mr-2 h-4 w-4" />
            {videoFile ? 'Change Video' : 'Select Video'}
          </button>
          {videoFile && (
            <span className="text-sm text-gray-500">{videoFile.name}</span>
          )}
        </div>
        {formData.video_url && !videoFile && isEditing && (
          <div className="mt-2 text-sm text-gray-500">
            Current video will be kept if no new video is selected
          </div>
        )}
      </div>

      {/* Video Preview */}
      {(videoPreview || formData.video_url) && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Video Preview
          </label>
          <div className="w-full bg-gray-100 rounded-md overflow-hidden">
            <video
              src={videoPreview || formData.video_url}
              controls
              className="w-full max-h-40"
              onError={(e) => {
                console.error("Video error:", e);
              }}
            />
          </div>
        </div>
      )}

      {/* Registration Link */}
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

      {/* Display Order */}
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

      {/* Active Status */}
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

      {/* Form Actions */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={uploadingMedia}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
        >
          {uploadingMedia ? (
            <>
              <span className="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"></span>
              Uploading...
            </>
          ) : (
            <>
              {isEditing ? 'Update' : 'Create'} Event
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default EventForm;
