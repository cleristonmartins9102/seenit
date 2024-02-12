export interface Decrypter {
  decrypt (data: string): Promise<Decrypter.Return | Error>
}

export namespace Decrypter {
  export type Return = {
    id: number
    firstName: string
    surname: string
    email: string
    permissions: string[]
  }
}
