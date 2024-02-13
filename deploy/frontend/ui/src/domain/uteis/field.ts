import { FieldControl } from '@/data/uteis/form/type/field-control'
import { Validation } from '@/presentation/protocols/validation'

export interface FieldSetValue {
  setValue (value: any, silent?: boolean): any
}

export interface FieldSetValueSilent {
  setValueSilent (value: any, silent?: boolean): any
}

export interface FieldReset {
  reset (): void
}

export interface FieldGetValue {
  getValue (): any
}
export interface FieldAddElement<ElementType> {
  addElement (element: ElementType): void
}

export type ChangeMonitorParam = {
  state: any
  setChange: Function
}
export interface FieldAddChangeMonitor {
  addChangeMonitor (param: ChangeMonitorParam)
}

export interface GetField {
  getField (fieldName: string): FieldControl
}
export interface FieldGetError {
  error: any
  getError (): any
}

export interface FieldSetError {
  setError (error: any, discreet: boolean): void
}

export interface FieldFocusOut {
  focusOut (lastvalue?: any): void
}

export interface FieldSetAutoComplete {
  autocompleteType: boolean
  setAutoComplete(value: boolean): void
}
export interface FieldAddValidator {
  addValidator (validator: Validation): void
}

export interface FieldCheckAllTouched {
  checkAllTouched (): boolean
}

export interface FieldDeleteValidator {
  delValidator (validatorName: string): void
}

export interface FieldToutched {
  setToutched (): void
}
