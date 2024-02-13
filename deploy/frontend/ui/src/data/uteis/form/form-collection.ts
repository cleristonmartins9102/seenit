import { ChangeMonitorParam, FieldAddChangeMonitor, FieldAddElement, FieldCheckAllTouched, FieldGetError, FieldGetValue, FieldReset, FieldSetValue, GetField } from '@/domain/uteis/field'
import { Subscribe } from '@/domain/uteis/subscribe'
import { RequiredFieldValidator } from '@/presentation/validators'
import { FieldControl } from '@/data/uteis/form/type/field-control'
import { FormField } from './form-field'
import uniqid from 'uniqid'

export class FormCollection implements Subscribe, FieldReset, FieldGetValue, FieldCheckAllTouched, GetField, FieldAddChangeMonitor {
  formFields: FieldControl
  value = {}
  unique = uniqid()
  observers: any = []
  error: {}
  changeMonitor: ChangeMonitorParam
  getField (fieldName: string): FieldControl {
    return this.formFields[fieldName]
  }

  addChangeMonitor (param: ChangeMonitorParam): void {
    this.changeMonitor = param
  }

  add (fieldName: string, field: FieldGetError): void {
    this.error = this.error ? this.error : field?.error?.getError()
    this.formFields = {
      ...this.formFields,
      [fieldName]: field
    }
    field?.error?.subscribe((error: any): void => {
      if (this.changeMonitor?.state.error?.message !== this.getError()?.message) {
        this.changeMonitor?.setChange({
          ...this.changeMonitor.state,
          error: this.getError()
        })
      }
      if (!this.getError()) {
        this.changeMonitor?.setChange({
          ...this.changeMonitor.state,
          error: null
        })
      }
      this.observers.forEach(observer => {
        observer(error)
      })
      this.error = error
    })
  }

  reset (): void {
    // this.unsubscribe()
    for (const fieldName in this.formFields) {
      this.formFields[fieldName].reset()
    }
  }

  checkAllTouched (): boolean {
    for (const fieldName in this.formFields) {
      if ((this.formFields[fieldName].validator?.filter(validator => validator instanceof RequiredFieldValidator).lenght) && !this.formFields[fieldName].touched) return false
    }
    return true
  }

  subscribe (fn: Function): void {
    this.observers.push(fn)
  }

  unsubscribe (observerName?: string): void {
    for (const fieldName in this.formFields) {
      if (typeof this.formFields[fieldName] === 'object') {
        this.formFields[fieldName]?.unsubscribe(observerName)
      }
    }
    this.observers = []
  }

  focusOut (fn: Function): void {
    for (const fieldName in this.formFields) {
      if (typeof this.formFields[fieldName] === 'object') {
        this.formFields[fieldName]?.subscribeFocusOut(fn)
      }
    }
  }

  loadField (fieldName: string): FieldControl {
    return this.formFields[fieldName] ?? 'not_found'
  }

  getValue (): any {
    let value = {}
    for (const fieldName in this.formFields) {
      if (typeof this.formFields[fieldName] === 'object') {
        const fields = this.formFields[fieldName].getValue()
        const newField = []
        if (Array.isArray(fields)) {
          fields.forEach(field => {
            newField.push(field.getValue())
          })
          value = {
            ...value,
            [fieldName]: newField
          }
        } else {
          value = {
            ...value,
            [fieldName]: this.formFields[fieldName].getValue()
          }
        }
      } else {
        value = {
          ...value,
          [fieldName]: this.formFields[fieldName]
        }
      }
    }

    return value
  }

  getError (): any {
    // if (this.error) {
    //   return this.error
    // }
    // const error: any = Object.values(this.formFields).filter((field: any) => {
    //   if (typeof field === 'object') {
    //     if (typeof field.value === 'object') {
    //       if (Array.isArray(field.value)) {
    //         const err: any = field.value.filter(form => !!form.getError()) ?? []
    //         if (err.length > 0) {
    //           this.error = err[0].getError()
    //           return true
    //         }
    //       }
    //     }
    //     this.error = field?.getError()
    //     return this.error
    //   }
    // })
    this.error = null
    for (const field of Object.values(this.formFields)) {
      if (typeof field === 'object') {
        if (typeof field.value === 'object') {
          if (Array.isArray(field.value)) {
            const err: any = field.value.filter(form => !!form.getError()) ?? []
            if (err.length > 0) {
              this.error = err[0].getError()
              break
            }
          } else {
            const value = field?.value
            if (value instanceof FormField) {
              const err = field?.value?.getError()
              if (err) {
                this.error = err
                break
              }
            }
          }
        }
        this.error = field?.getError()
        if (this.error) break
      }
    }
    return this.error

    // return this.error ? this.error : (error.length > 0 ? error[0]?.getError() : null)
  }

  setError (errorMsg: string): void {
    this.error = errorMsg
  }
}
