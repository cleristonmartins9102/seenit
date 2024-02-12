class CustomError extends Error {
  code: number | undefined
}

export class RequiredParameterError extends CustomError {
  code = 400
  constructor (paramName: string) {
    super(`Required param ${paramName}`)
    this.name = 'RequiredParameterError'
  }
}

export class BadRequestError extends CustomError {
  code = 400
  constructor (message: string) {
    super(message)
    this.name = 'BadRequestError'
  }
}

export class UnauthorizedError extends CustomError {
  code = 401
  constructor () {
    super('Unauthorized')
    this.name = 'UnauthorizedError'
  }
}

