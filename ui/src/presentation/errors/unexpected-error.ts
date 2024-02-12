export class UnexpectedError extends Error {
  status: number
  constructor (msg = '', code?: number) {
    super(msg)
    this.name = 'UnexpectedError'
    this.status = code
  }
}
