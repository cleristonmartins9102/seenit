export class Unauthorized extends Error {
  constructor (msg?: string) {
    super(msg)
    this.name = 'UnauthorizedError'
  }
}
