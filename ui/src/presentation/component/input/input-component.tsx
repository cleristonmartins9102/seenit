import { FieldControl } from '@/data/uteis/form/type/field-control'
import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react'
import Styles from './input-component.styles.scss'
import { InputErrorComponent } from '../error-component/input/input-error-component-styles'

interface PropsParam extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: any
  text: string
  className?: string
  radius?: string
  fieldcontrol?: FieldControl
  name?: string
  testid?: string
  numberOnly?: boolean
  textTransform?: any
  disabled?: boolean
  quiet?: boolean
  labelSize?: string
}

export const InputComponent: React.FC<PropsParam> = (props: PropsParam) => {
  const { children, testid, numberOnly, quiet, textTransform, labelSize, ...cleanProps } = props
  const { fieldcontrol } = cleanProps
  const [lastValue, setLastValue] = useState<any>()
  const handledElement = useRef<HTMLInputElement>()
  const listenChange = (event: any): void => {
    if (fieldcontrol?.autocompleteType) return
    const keysFree = ['Tab', 'Backspace']
    const value = event.target.value
    if ((numberOnly && !keysFree.includes(event.key) && !/[0-9]|[.]/.test(event.key))) {
      event.preventDefault()
    }
    handledElement.current.value = value
    setLastValue(value)
    fieldcontrol?.setValue(value)
  }
  const [state, setState] = useState({
    error: fieldcontrol?.getError()?.message ?? null
  })

  useEffect(() => {
    handledElement.current.onfocus = (event: any): void => {
      setLastValue(null)
      fieldcontrol?.setToutched()
    }
    // handledElement.current.onkeyup = listenChange
    handledElement.current.onkeydown = listenChange
    handledElement.current.onblur = listenChange
    handledElement.current.onblur = () => {
      fieldcontrol?.focusOut(lastValue)
    }
  }, [lastValue])

  useEffect(() => {
    const monitor: any = fieldcontrol
    if (fieldcontrol && monitor.changeMonitors.length === 0) {
      fieldcontrol?.addChangeMonitor({
        state,
        setChange: setState
      })
      fieldcontrol?.addElement(handledElement.current)
    }
    return () => fieldcontrol?.unsubscribe()
  }, [])

  const style: CSSProperties = {
    textTransform: props.textTransform,
    borderRadius: props.radius
  }
  return (
    <div className={[Styles.wrap, props.className].join(' ')} style={props.style}>
      <input
        {...cleanProps}
        autoComplete='new-password'
        data-testid={testid}
        className={props.disabled ? [Styles.input, Styles.disabled].join(' ') : Styles.input}
        placeholder=' '
        style={style}
        ref={handledElement}
        // onChange={(event: any) => fieldcontrol?.setValue(event.target.value)}
        onChange={(event: any) => listenChange(event)}
        disabled={props.disabled}
        // onFocus={ e => { e.target.readOnly = false; e.target.focus() }}
      />
      <label onClick={() => handledElement.current.focus() } style={{ fontSize: labelSize ?? '' }}>{props.text}</label>
      {!quiet && <InputErrorComponent data-testid={`${testid}Error`}
        error={state.error} inputElement={handledElement.current}/>}
    </div>
  )
}
