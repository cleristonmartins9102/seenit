export interface Validation<PT = unknown> {
  validate (input: PT): Error | null
}
