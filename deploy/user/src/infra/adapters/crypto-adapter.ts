import { randomBytes, scrypt } from 'crypto'
import { type Hasher } from '../../domain'
import { promisify } from 'util'

export class CryptoAdapter implements Hasher {
  async hash (password: string): Promise<string> {
    const salt = randomBytes(16).toString('hex')
    const scriptAsync = promisify(scrypt)
    const buf = await scriptAsync(password, salt, 64) as Buffer
    return `${buf.toString('hex')}.${salt}`
  }
}
