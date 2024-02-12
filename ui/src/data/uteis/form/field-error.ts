import { FieldGetError, FieldSetError } from '@/domain/uteis/field'
import { Subscribe } from '@/domain/uteis/subscribe'

export class FieldError implements FieldSetError, FieldGetError, Subscribe {
  error: string
  observers: Function[] = []

  subscribe (observer: Function): any {
    this.observers.push(observer)
  }

  unsubscribe (): any {
    this.observers = []
  }

  getError (): string {
    return this.error
  }

  resetError (): void {
    this.error = null
  }

  setError (error: any, discreet: boolean = false): void {
    this.error = error
    if (!discreet) {
      this.observers.forEach(observer => observer(error))
    }
  }
}
