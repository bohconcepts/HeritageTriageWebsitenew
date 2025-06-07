import React from 'react';
import { Event } from '../lib/types';
import { ArrowUp, ArrowDown, Edit, Trash2 } from 'lucide-react';

interface EventListProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onToggleActive: (id: string, isActive: boolean) => void;
}

const EventList: React.FC<EventListProps> = ({
  events,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  onToggleActive
}) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Media
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
                  <div className="flex flex-col gap-2">
                    {/* Image preview */}
                    {event.image_url && (
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
                    )}
                    
                    {/* Video preview */}
                    {event.video_url && (
                      <div className="flex-shrink-0 h-20 w-20">
                        <video 
                          src={event.video_url} 
                          className="h-20 w-20 object-cover rounded"
                          controls
                        />
                      </div>
                    )}
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
                    onClick={() => onToggleActive(event.id!, event.is_active)}
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
                      onClick={() => onMoveUp(index)}
                      disabled={index === 0}
                      className={`p-1 rounded ${
                        index === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      title="Move up"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onMoveDown(index)}
                      disabled={index === events.length - 1}
                      className={`p-1 rounded ${
                        index === events.length - 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      title="Move down"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onEdit(event)}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                      title="Edit event"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(event.id!)}
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
  );
};

export default EventList;
