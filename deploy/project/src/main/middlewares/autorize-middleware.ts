import { UnauthorizedError } from '../../application/errors'
import { DecrypterAdapter } from '@seenit-common/decrypter'

export type InputAutorize = { headers: { authorization: string } }
export type AutorizeReturn = {
  id: number
  firstName: string
  surname: string
  email: string
  expectedDate: string
  permissions: string[]
}

export const autorizeMiddeware = async (req: InputAutorize): Promise<Error | AutorizeReturn> => {
  if (!req.headers?.authorization) {
    return new UnauthorizedError()
  } else {
    const decryptor = new DecrypterAdapter()
    try {
      const autorizationSplited = req.headers.authorization.split(' ')
      let token = ''
      if (autorizationSplited.length > 0) {
        token = autorizationSplited[1]
      }
      const decryptedToken = await decryptor.decrypt<AutorizeReturn>(token, 1440)
      return decryptedToken
    } catch (error) {
      console.log(error)
      return new UnauthorizedError()
    }
  }
}
