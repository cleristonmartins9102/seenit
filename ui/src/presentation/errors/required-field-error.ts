export class RequiredFieldError extends Error {
  constructor (fieldName: string) {
    super(`The field ${fieldName} need to be filled`)
    this.name = `The field ${fieldName} need to be filled`
  }
}
