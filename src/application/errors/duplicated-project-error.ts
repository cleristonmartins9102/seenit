export class DuplicatedProjectError extends Error {
  constructor (name: string) {
    super(`Project with name ${name} already exists`)
    this.name = 'DuplicatedProjectError'
  }
}
