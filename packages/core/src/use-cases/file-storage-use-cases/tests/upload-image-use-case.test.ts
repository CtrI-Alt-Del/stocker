import { beforeEach, describe, expect, it } from 'vitest'
import { UploadImageUseCase } from '../upload-image-use-case'
import { FileStorageProviderMock } from '../../../../__tests__/mocks/providers'

let fileStorageProvider: FileStorageProviderMock
let useCase: UploadImageUseCase

describe('Upload image use case', () => {
  beforeEach(() => {
    fileStorageProvider = new FileStorageProviderMock()
    useCase = new UploadImageUseCase(fileStorageProvider)
  })

  it('should upload image', async () => {
    const imageFileBuffer = Buffer.from('image')
    await useCase.execute(imageFileBuffer)
    expect(fileStorageProvider.storegedFileBuffer).toEqual(imageFileBuffer)
  })

  it('should return the url of the storaged image', async () => {
    const imageFileBuffer = Buffer.from('image')
    const url = await useCase.execute(imageFileBuffer)

    expect(typeof url).toBe('string')
  })
})
