import { supabase, adminSupabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

// Upload a file to Supabase storage
export const uploadFile = async (
  file: File,
  bucket: string = 'images',
  folder: string = ''
): Promise<string> => {
  try {
    // Create a unique file name to prevent collisions
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    // Try with regular client first (for authenticated users)
    let uploadResult = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });
      
    // If that fails, try with admin client
    if (uploadResult.error) {
      console.log('Regular upload failed, trying with admin client:', uploadResult.error);
      uploadResult = await adminSupabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });
    }
    
    // Check for errors after both attempts
    if (uploadResult.error) {
      console.error('Error uploading file:', uploadResult.error);
      throw new Error(uploadResult.error.message);
    }
    
    // Get the public URL for the file
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(uploadResult.data.path);
    
    return urlData.publicUrl;
  } catch (error) {
    console.error('Error in uploadFile:', error);
    throw error;
  }
};

// Delete a file from Supabase storage
export const deleteFile = async (
  filePath: string,
  bucket: string = 'images'
): Promise<void> => {
  try {
    // Skip if the URL doesn't look like a valid URL or Supabase storage URL
    if (!filePath) {
      console.log('No file path provided, skipping delete');
      return;
    }
    
    // Try to extract the file name from the URL
    let fileName;
    
    try {
      // Check if it's a valid URL
      const url = new URL(filePath);
      const pathParts = url.pathname.split('/');
      
      // Find the position of 'object' in the path (Supabase storage format)
      const objectIndex = pathParts.findIndex(part => part === 'object');
      
      if (objectIndex !== -1 && objectIndex < pathParts.length - 2) {
        // Format: /storage/v1/object/bucket-name/file-name
        // We want to extract just the file-name part
        fileName = pathParts.slice(objectIndex + 2).join('/');
      } else {
        // Fallback to just using the last part of the path
        fileName = pathParts[pathParts.length - 1];
      }
    } catch {
      // If it's not a valid URL, treat the whole string as a file path
      console.log('Not a valid URL, treating as direct file path');
      const pathParts = filePath.split('/');
      fileName = pathParts[pathParts.length - 1];
    }
    
    if (!fileName) {
      console.log('Could not extract file name from path:', filePath);
      return;
    }
    
    console.log('Attempting to delete file:', fileName, 'from bucket:', bucket);
    
    // Try with regular client first
    let deleteResult = await supabase.storage
      .from(bucket)
      .remove([fileName]);
    
    // If that fails, try with admin client
    if (deleteResult.error) {
      console.log('Regular delete failed, trying with admin client:', deleteResult.error);
      deleteResult = await adminSupabase.storage
        .from(bucket)
        .remove([fileName]);
    }
    
    if (deleteResult.error) {
      console.error('Error deleting file:', deleteResult.error);
      // Don't throw as deletion is not critical
    } else {
      console.log('File deleted successfully:', fileName);
    }
  } catch (error) {
    console.error('Error in deleteFile:', error);
    // Don't throw the error as deletion is not critical
    // Just log it and continue
  }
};
