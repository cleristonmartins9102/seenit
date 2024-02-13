import { faker } from '@faker-js/faker'
import { fireEvent, RenderResult } from '@testing-library/react'
type PopulateFieldParam = {
  elName: string
  value?: any
}

export const populateField = (view: RenderResult, options: PopulateFieldParam[]): void => {
  options.forEach((field) => {
    const element = view.getByTestId(field.elName)
    fireEvent.focus(element)
    fireEvent.blur(element)
    fireEvent.keyUp(element, { target: { value: field.value ?? faker.internet.email() } })
  })
}

export const setFocusAndBlu = (elements: HTMLElement[]): void => {
  elements.forEach((element: HTMLElement) => {
    fireEvent.focus(element)
    fireEvent.blur(element)
  })
}

export const getElementsByTestId = (view: RenderResult, elementsName: string[]): any => {
  let elements = {}
  elementsName.forEach(elName => {
    elements = { ...elements, [elName]: view.getByTestId(elName) }
  })
  return elements
}
