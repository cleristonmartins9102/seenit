import React, { useEffect } from 'react'
import Styles from './saved-styles.scss'

interface PropsParam extends React.HTMLAttributes<HTMLSpanElement> {
  msg: string
  closeAction?: () => void
  styleFree?: boolean
  textColor?: string
  textWeight?: string
  textSize?: string
}
export const SavedDialog: React.FC<PropsParam> = ({ closeAction, msg, textColor, textWeight, textSize, styleFree, children, ...props }: PropsParam) => {
  
  const handleCloseAction = (event: any) => {
    if (event?.stopPropagation) event.stopPropagetion()
    closeAction()
  }
  return (
    <div className={Styles.negative}>
      <div className={[Styles.wrapDialog, !styleFree ? Styles.embedded : Styles.free, props.className].join(' ')}>
        <div className={Styles.body}>
          <span style={{ fontSize: textSize, color: textColor, fontWeight: textWeight }}>{msg ?? 'Saved!'}</span>
          <div className={[Styles.wrapChildren].join(' ')}>
            {children}
          </div>
        </div>
      </div>
    </div>

  )
}
