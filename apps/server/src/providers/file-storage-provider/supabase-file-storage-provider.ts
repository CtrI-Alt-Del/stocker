import { createClient, type SupabaseClient } from '@supabase/supabase-js'

import type { IFileStorageProvider } from '@stocker/core/interfaces'
import { ENV } from '@/constants'
import { AppError, ValidationError } from '@stocker/core/errors'

const supabaseUrl = ENV.supabaseUrl
const supabaseKey = ENV.supabaseKey

const supabase = createClient(supabaseUrl, supabaseKey)
const baseImageUrl = `${supabaseUrl}/storage/v1/object/public/stocker/`

export class SupabaseFileStorageProvider implements IFileStorageProvider {
  private readonly supabase: SupabaseClient

  constructor() {
    this.supabase = supabase
  }

  async upload(fileBuffer: Buffer): Promise<string> {
    const filepath = `/images/${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`
    const { error } = await this.supabase.storage
      .from('stocker')
      .upload(filepath, fileBuffer, {
        contentType: 'image/jpg',
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      throw new AppError('Storage Error', `Upload Failed: ${error.message}`)
    }

    return `${baseImageUrl}${filepath}`
  }

  async delete(fileId: string): Promise<void> {
    console.log({ fileId })
    const filePath = fileId.split('stocker/')[1]
    if (!filePath) {
      throw new ValidationError('Storaged file not found')
    }

    const { error } = await this.supabase.storage
      .from('stocker')
      .remove([filePath.slice(1)])

    if (error) {
      throw new AppError('Storage Error', `Delete Failed: ${error.message}`)
    }
  }
}
