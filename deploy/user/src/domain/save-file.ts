import { type FileDataModel } from 'models'

export interface SaveFile {
  save (file: FileDataModel): Promise<SaveFile.Return>
}

export namespace SaveFile {
  export type Return = {
    url: string
  }
}
