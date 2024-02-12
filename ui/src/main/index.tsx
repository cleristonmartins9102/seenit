import React from 'react'
import ReactDom from 'react-dom'
import '@/shared/styles/global.scss'
import { RootRouter } from './route/root'

ReactDom.render(
  <RootRouter />,
  document.getElementById('main')
)
