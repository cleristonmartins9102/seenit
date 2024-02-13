import { ChangeMonitorParam } from '@/domain/uteis/field'
import { Validation } from '@/presentation/protocols/validation'
import { FieldError } from './field-error'
import { FieldControl } from './type/field-control'

export class FormField<ElementType=any> implements FieldControl {
  error = new FieldError()
  uniqueKey: string
  touched = false
  setState: Function
  autocompleteType: boolean = false
  value = ''
  focusObservers = []
  changeMonitors: ChangeMonitorParam[] = []
  constructor (
    private validator: Validation[] = [],
    private readonly observers: any = [],
    private element?: ElementType
  ) {
    this.runValidator('')
  }

  subscribe (fn: Function): void {
    this.observers.push(fn)
  }

  setAutoComplete (value: boolean): void {
    this.autocompleteType = value
  }

  reset (): void {
    this.setValue(null).then(r => {}).catch(e => {})
    this.touched = false
    this.runValidator('', true)
    this.monitor()
  }

  addChangeMonitor (param: ChangeMonitorParam): void {
    this.changeMonitors.push(param)
  }

  setToutched (): this {
    this.touched = true
    return this
  }

  addElement (element: ElementType): void {
    this.element = element
  }

  focusOut (lastValue?: any): void {
    this.focusObservers.forEach(observer => observer(lastValue))
  }

  subscribeFocusOut (fn: Function): void {
    this.focusObservers.push(fn)
  }

  unsubscribe (observerName?: string): void {
    if (observerName) {
      this.focusObservers = this.focusObservers.filter(observer => observer.name !== observerName)
    } else {
      this.focusObservers = []
      this.changeMonitors = []
    }
  }

  async setValue (value: any): Promise<FieldControl> {
    return new Promise((resolve, reject) => {
      this.runValidator(value)
      const el = this.element as any
      if (el && el.value !== value) {
        el.value = value
      }
      this.value = value
      this.observers.forEach((fn: Function) => {
        fn(value)
      })
      this.monitor()
      resolve(this)
    })
  }

  async setValueSilent (value: any, silent?: boolean): Promise<FieldControl> {
    return new Promise((resolve, reject) => {
      this.runValidator(value)
      this.value = value
      resolve(this)
    })
  }

  private monitor (): void {
    this.changeMonitors.forEach(changeMonitor => {
      if (this.error.getError()) {
        if (changeMonitor?.state.error !== this.error.getError()) {
          changeMonitor?.setChange(prev => {
            return {
              ...prev,
              error: this.error.getError()
            }
          })
        }
      }
      if (!this.error.getError()) {
        changeMonitor?.setChange({
          ...changeMonitor?.state,
          error: null
        })
      }
    })
  }

  getValue (): any {
    return this.value
  }

  getError (): any {
    return this.error.getError()
  }

  addState (state: any): void {
    if (!this.setState) {
      this.setState(this.error)
    }
  }

  addValidator (validator: Validation<any>): void {
    this.validator.push(validator)
    // this.runValidator('')
  }

  delValidator (validatorName: string): void {
    this.validator = this.validator.filter((validator: any) => validator.fieldName !== validatorName)
    this.runValidator('', true)
  }

  private runValidator (value: string, discreet: boolean = false): Error | null {
    let error = null
    for (const validation of this.validator) {
      error = validation.validate(value)
      if (error) {
        break
      }
    }
    if (!discreet) {
      this.error.setError(error)
    } else {
      this.error.setError(error, true)
    }
    return error
  }
}
