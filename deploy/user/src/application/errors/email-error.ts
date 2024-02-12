export class EmailError extends Error {
  constructor (email: string) {
    super(`Email format no match ${email}`)
    this.name = 'EmailError'
  }
}

export class EmailAlreadyExistsError extends Error {
  constructor (email: string) {
    super(`Email already exists ${email}`)
    this.name = 'EmailAlreadyExists'
  }
}
