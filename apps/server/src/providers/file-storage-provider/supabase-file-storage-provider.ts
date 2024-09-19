import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { IFileStorageProvider } from '@stocker/core/interfaces';
import { ENV } from '@/constants';
import { AppError } from '@stocker/core/errors';

const supabaseUrl = ENV.supabaseUrl
const supabaseKey = ENV.supabaseKey

const supabase = createClient(supabaseUrl, supabaseKey);
const baseImageUrl = `${supabaseUrl}/storage/v1/object/public/stocker/`;

export class SupabaseFileStorageProvider implements IFileStorageProvider {
  private readonly supabase: SupabaseClient;
  
  constructor() {
    this.supabase = supabase;
  }

  async upload(fileBuffer: Buffer): Promise<string> {
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const { error } = await this.supabase.storage.from('stocker').upload(`${fileName}.jpg`, fileBuffer, {
      cacheControl: '3600',
      upsert: false
    });

    if (error) {
      throw new AppError("Storage Error" , `Upload Failed: ${error.message}`);
    }
    
    return `${baseImageUrl}${fileName}.jpg`;
  }

  async delete(fileId: string): Promise<void> {
    const { error } = await this.supabase.storage.from('stocker').remove([fileId]);
    if (error) {
      throw new AppError("Storage Error", `Delete Failed: ${error.message}`); 
    }
  }
}
