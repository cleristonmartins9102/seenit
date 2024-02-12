import { UnauthorizedError } from '../../application/errors'

export type InputAutorize = { headers: { authorization: string } }
export type AutorizeReturn = {
  id: number
  firstName: string
  surname: string
  permissions: string[]
}

export const autorizeMiddeware = (req: InputAutorize): Error | AutorizeReturn => {
  if (!req.headers?.authorization) {
    return new UnauthorizedError()
  } else {
    const decryptedToken = { id: 1, firstName: 'John', surname: 'Liam', email: 'any@gmail.com', permissions: ['CRUD'] } // Fake Decrypt
    return decryptedToken
  }
}
