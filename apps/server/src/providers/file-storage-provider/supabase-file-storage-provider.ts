import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { IFileStorageProvider } from '@stocker/core/interfaces';
import { AppError } from '@stocker/core/errors';

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

export class SupabaseFileStorageProvider implements IFileStorageProvider {
  private readonly supabase: SupabaseClient;
  
  constructor() {
    this.supabase = supabase;
  }

  async upload(fileBuffer: Buffer): Promise<string> {
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const { data, error } = await this.supabase.storage.from('BUCETA').upload(`${fileName}.jpg`, fileBuffer, {
      cacheControl: '3600',
      upsert: false
    });

    if (error) {
      throw new AppError("Storage Error" , `Inserção Falhou: ${error.message}`);
    }
    
    return data.path;
  }

  async delete(fileId: string): Promise<void> {
    const { error } = await this.supabase.storage.from('BUCETA').remove([fileId]);
    if (error) {
      throw new AppError("Storage Error", `Deleção Falhou: ${error.message}`);
    }
  }
}
