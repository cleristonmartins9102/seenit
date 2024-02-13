import React from 'react'
import Styles from './loading-text-styles.scss'

type PropsParam = {
  text: string
  time?: string
}
export const LoadingText: React.FC<PropsParam> = ({ time, text }: PropsParam) => {
  const style = {
    animationDuration: time,
    mozkitAnimationDuration: time
  }
  return (
    <div className={Styles.wrapText}>
      <p className={Styles.text} style={style}>{text}</p>
      <p>Please wait...</p>
    </div>
  )
}
