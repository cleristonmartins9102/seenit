import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { InputComponent } from './input-component'

describe('InputComponent', () => {
  test('Should does not accept number if prop numberOnly is true', async () => {
    const view = render(<InputComponent text='any' numberOnly testid='input'/>)
    fireEvent.keyUp(view.getByTestId('input'), { target: { value: 'alpha1' } })
    expect((view.getByTestId('input') as any).value).toBe('alpha')
  })
})
