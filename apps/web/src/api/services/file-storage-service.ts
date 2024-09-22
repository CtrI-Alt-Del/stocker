import type { IApiClient, IFileStorageService } from '@stocker/core/interfaces'

export const FileStorageService = (apiClient: IApiClient): IFileStorageService => {
  return {
    async uploadImage(imageFile: File) {
      const data = new FormData()
      data.set('file', imageFile)
      return await apiClient.multipart<{ imageUrl: string }>('/file-storage/image', data)
    },

    async deleteImage(imageId: string) {
      return await apiClient.delete('/file-storage/image', { imageId })
    },
  }
}
