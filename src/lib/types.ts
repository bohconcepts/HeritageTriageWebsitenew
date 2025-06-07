// Type definitions for the application

// Event type definition based on the database schema
export interface Event {
  id?: string;
  image_url: string;
  video_url?: string;
  registration_link?: string;
  is_active: boolean;
  display_order: number;
  created_at?: string;
}
