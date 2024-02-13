import { FieldAddElement, FieldGetError, FieldGetValue, FieldSetError, FieldSetValue } from '@/domain/uteis/field'
import { Subscribe } from '@/domain/uteis/subscribe'
import { InvalidEmailError } from '@/presentation/errors/invalid-email-error'
import { Validation } from '@/presentation/protocols/validation'
import { FieldError } from './field-error'
import { FormCollection } from './form-collection'
import { FieldControl } from './type/field-control'

class EmailValidatorSpy implements Validation {
  validate (formField: string): Error {
    return null
  }
}

type ErrorBody = {
  value: Error
  observers?: Function[]
  subscribe?: () => void
}

type FormFieldErrorType = {
  error: ErrorBody
}

class FieldErrorSpy implements FieldSetError, FieldGetError, Subscribe {
  error: string
  observers: Function[] = []

  subscribe (observer: Function): any {
    this.observers.push(observer)
  }

  getError (): string {
    return this.error
  }

  setError (error: any): void {
    this.observers.forEach(observer => observer(error))
    this.error = error
  }
}

class FormFieldSpy implements FieldSetValue, FieldGetError, FieldGetValue {
  error = new FieldErrorSpy()
  value = 'any_value'
  constructor (private readonly validator?: Validation) {}

  setValue (value: any): any {
    return null
  }

  getError (): string {
    return null
  }

  getValue (): any {
    return this.value
  }
}

type SutType = {
  sut: Subscribe & FieldGetValue & FieldGetError
  emailValidatorSpy: EmailValidatorSpy
  formFieldSpy: FormFieldSpy
  fieldErrorSpy: FieldErrorSpy
  formFieldSpy2: FormFieldSpy
}

const makeSut = (): SutType => {
  const fieldErrorSpy = new FieldErrorSpy()
  const emailValidatorSpy = new EmailValidatorSpy()
  const formFieldSpy = new FormFieldSpy(emailValidatorSpy)
  const formFieldSpy2 = new FormFieldSpy()

  const sut = new FormCollection()
  sut.add('email', formFieldSpy)
  sut.add('name', formFieldSpy2)
  return {
    sut,
    fieldErrorSpy,
    emailValidatorSpy,
    formFieldSpy,
    formFieldSpy2
  }
}

describe('FormCollection', () => {
  test('Should call the validation and set an error if exist', async () => {
    const { sut, formFieldSpy } = makeSut()
    formFieldSpy.error.setError({ email: 'invalid_email' })
    expect(sut.getError()).toBeTruthy()
    expect(sut.getError()).toEqual({
      email: 'invalid_email'
    })
  })

  test('Should the error is the same like FormField', async () => {
    const { sut, formFieldSpy } = makeSut()
    const error = formFieldSpy.error
    error.setError('any_error')
    expect(sut.getError()).toEqual(error.getError())
  })

  test.only('Should the value is correct', async () => {
    const { sut, formFieldSpy, formFieldSpy2 } = makeSut()
    expect(sut.getValue()).toEqual({ email: formFieldSpy.getValue(), name: formFieldSpy2.getValue() })
  })
})
