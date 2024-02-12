import React, { useEffect } from 'react'
import Styles from './error-component-styles.scss'

type PropsParams = any

export const ErrorComponent: React.FC<PropsParams> = ({ text, ...props }: PropsParams) => {
  return (
    <div className={props.className ? [Styles.errorText, props.className].join(' ') : Styles.errorText}>
      <span data-testid={props['data-testid'] || 'error'} {...props} id='errorComponent' className={props.className ? [Styles.errorText, props.className].join(' ') : Styles.errorText}>{text}</span>
    </div>
  )
}
