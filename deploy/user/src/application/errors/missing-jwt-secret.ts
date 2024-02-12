export class MissingJWTSecret extends Error {
  constructor () {
    super('missing jwt secret')
    this.name = 'MissingJwtSecret'
  }
}
