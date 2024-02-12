import { MissingJWTSecret } from '../../../src/application/errors'
import { type Encrypter } from '../../../src/domain/encrypter'
import jsonwebtoken from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  async encrypt (data: Encrypter.DataType): Promise<string> {
    if (!process.env?.SECRET) throw new MissingJWTSecret()
    const expectedDate = new Date().toJSON()

    return jsonwebtoken.sign({ ...data, expectedDate }, process.env.SECRET)
  }
}
