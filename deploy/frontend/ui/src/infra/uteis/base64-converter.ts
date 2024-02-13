import { Base64Encode } from '../protocols/base64-encode'

export class Base64Converter implements Base64Encode {
  encode (content: string): string {
    return btoa(content)
  }
}
