import React, { useEffect, useState } from 'react'
import Styles from './input-error-component-styles.scss'

type PropsParams = {
  error?: boolean
  inputElement?: any
  'data-testid'?: string
}

export const InputErrorComponent: React.FC<PropsParams> = (props: PropsParams) => {
  const [typing, setTyping] = useState(false)
  const { error, inputElement, ...clenProps } = props
  let timeOut = null
  useEffect(() => {
    props.inputElement?.addEventListener('keyup', checkTyping)
    props.inputElement?.addEventListener('keydown', checkTyping)
    return () => {
      props.inputElement?.removeEventListener('keyup', checkTyping)
      props.inputElement?.removeEventListener('keydown', checkTyping)
      if (timeOut) window.clearTimeout(timeOut)
    }
  }, [error])
  const checkTyping = (): void => {
    setTyping(true)
    if (timeOut) window.clearTimeout(timeOut)
    timeOut = setTimeout(() => {
      setTyping(false)
    }, 400)
  }
  const getClassName = (): any => {
    if (!error) {
      return [Styles.noError, typing ? Styles.typing : ''].join(' ')
    } else {
      const style = [Styles.error]
      if (typing) {
        style.push(Styles.typing)
      }
      return style.join(' ')
    }
  }
  return (
    <div {...clenProps} className={getClassName()}></div>
  )
}
