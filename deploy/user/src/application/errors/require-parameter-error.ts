export class RequiredParameterError extends Error {
  constructor (paramName: string) {
    super(`Required param ${paramName}`)
    this.name = 'RequiredParameterError'
  }
}
