import fs from 'fs'

import { type SaveFile } from '../../domain'
import { type FileDataModel } from 'models'
import { v4 as uuidv4 } from 'uuid'

export class FileStorageAdapter implements SaveFile {
  async save (baseImage: FileDataModel): Promise<FileStorageAdapter.Return> {
    const localPath = './public/images/'
    const filename = `${baseImage.fileName}-${uuidv4()}.${baseImage.extension}`
    // Check that if directory is present or not.
    if (!fs.existsSync(`${localPath}`)) {
      fs.mkdirSync(`${localPath}`)
    }
    if (!fs.existsSync(localPath)) {
      fs.mkdirSync(localPath)
    }
    fs.writeFileSync(localPath + filename, baseImage.base64, { encoding: 'base64' })
    return { filename, url: `http://127.0.0.1:3000/images/${filename}` }
  }
}

export namespace FileStorageAdapter {
  export type Return = {
    filename: string
    url: string
  }
}
