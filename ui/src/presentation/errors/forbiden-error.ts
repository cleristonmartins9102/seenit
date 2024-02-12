export class ForbidenError extends Error {
  constructor (msg?: string) {
    super(msg)
    this.name = 'ForbidenError'
  }
}
