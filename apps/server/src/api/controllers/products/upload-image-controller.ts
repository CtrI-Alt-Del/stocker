import type { IHttp } from "@stocker/core/interfaces";
import { FileStorageProvider } from "@/providers/file-storage-provider";

export class UploadImageController {
    async handle(http: IHttp) {
        const fileBuffer = await http.getFile()
        const url = await FileStorageProvider.upload(fileBuffer)
        return http.send({ imageUrl: url })
    }
    
}