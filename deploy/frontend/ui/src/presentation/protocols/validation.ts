export interface Validation<formFieldType=any> {
  validate (formField: formFieldType): Error
}
