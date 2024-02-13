import { Home } from '@/presentation/pages/home/home'
import { Signup } from '@/presentation/pages/signup/signup'
import { store } from '@/store/store'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'

export const RootRouter = (): any => {
  return (<Provider store={store}>
    <ReactTooltip></ReactTooltip>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>)
}
