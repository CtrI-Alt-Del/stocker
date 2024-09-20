import type { ApiResponse } from '../../responses'

export interface IFileStorageService {
  uploadImage(imageFile: File): Promise<ApiResponse<{ imageUrl: string }>>
  deleteImage(imageId: string): Promise<ApiResponse<void>>
}
