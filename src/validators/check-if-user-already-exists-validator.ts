import { EmailAlreadyExistsError } from '../application/errors'
import { type LoadUsers } from '../services/contract/user/user-contracts'
import { type Validation } from '../services/contract/validation'

export class CheckEmailExistsValidator implements Validation {
  constructor (private readonly userRepository: LoadUsers) {}
  validate (input: { email: string }): Error | null {
    const users = this.userRepository.load()
    const user = users.filter(user => user.email === input.email)
    if (user.length) return new EmailAlreadyExistsError(input.email)
    return null
  }
}
