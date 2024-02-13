export class FileSizeExceedsLimitError extends Error {
  constructor (sizeLimit?: string) {
    super(`File size exceeds the limit of ${sizeLimit}`)
    this.name = 'FileSizeError'
  }
}
