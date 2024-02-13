import React, { useEffect, useState } from 'react'

import Styles from './signup.scss'
import { InputComponent } from '../../component/input/input-component'
import { FormCollection, FormField } from '@/data/uteis/form'
import { EmailValidate, MinLengthValidator, RequiredFieldValidator } from '../../validators'
import { remoteSignup } from '@/data/signup/remote-signup'
import { UploadDialogComponent } from '../../component/upload'
import { Base64Converter } from '@/infra/uteis/base64-converter'
import { storageSaveAccountFactory } from '@/main/factories/usercases/storage-save-account-factory'
import { useNavigate } from 'react-router-dom'

const loginFormCollection = new FormCollection()
loginFormCollection.add('firstName', new FormField([new RequiredFieldValidator('firstname'), new MinLengthValidator('firstname', 2)]))
loginFormCollection.add('surname', new FormField([new RequiredFieldValidator('surname'), new MinLengthValidator('surname', 1)]))
loginFormCollection.add('email', new FormField([new RequiredFieldValidator('email'), new MinLengthValidator('email', 8), new EmailValidate()]))
loginFormCollection.add('password', new FormField([new RequiredFieldValidator('password'), new MinLengthValidator('password', 8)]))
loginFormCollection.add('avatar', new FormField([new RequiredFieldValidator('avatar')]))

export const Signup: React.FC = () => {
  const [state, setState] = useState({ uploadAvatarOpended: false, avatar: '', allFieldsTouched: false, error: loginFormCollection.getError() })
  const base64Converter = new Base64Converter()
  const navigate = useNavigate()
  useEffect(() => {
    loginFormCollection.focusOut(() => setState(prev => ({
      ...prev,
      error: loginFormCollection.getError(),
      allFieldsTouched: loginFormCollection.checkAllTouched()
    })))
  }, [])

  const handlerRequest = async (): Promise<void> => {
    const storage = storageSaveAccountFactory()
    const httpResponse = await remoteSignup(loginFormCollection.getValue())
    await storage.save(httpResponse as any)
    navigate('/home')
  }
  return (
    <div className={Styles.container}>
      <div className={Styles.conainerSignup}>
        <div className={Styles.header}>
          <h1>Signup</h1>
        </div>
        <div className={Styles.form}>
          <div className={Styles.wrapAvatar}>
            <div className={Styles.vatar}>
              <img onClick={() => setState(prev => ({ ...prev, uploadAvatarOpended: true }))}src={state.avatar ? `data:image/png;base64,${state.avatar}` : 'https://avatars.hubspot.net/default-100'} alt="" />
              {state.uploadAvatarOpended && <UploadDialogComponent
                base64Converter={base64Converter}
                states={() => {}}
                accept=".jpeg,.png"
                formFieldEmit={async (avatar: { target: { value: { fileName: string, fileBase64: string} }}) => {
                  setState(prev => ({ ...prev, uploadAvatarOpended: false, avatar: avatar.target.value.fileBase64 }))
                  const splitedFileName = avatar.target.value.fileName.split('.')
                  await loginFormCollection.getField('avatar').setValue({
                    fileName: splitedFileName[0],
                    extension: splitedFileName[1],
                    base64: avatar.target.value.fileBase64
                  })
                }}
              />}
            </div>
            <div className={Styles.wrapNames}>
              <div className={Styles.wrapInput}>
                <InputComponent text='First Name' fieldcontrol={loginFormCollection.getField('firstName')}/>
              </div>
              <div className={Styles.wrapInput}>
                <InputComponent text='Surname'fieldcontrol={loginFormCollection.getField('surname')}/>
              </div>
            </div>

          </div>
          <InputComponent text='Email'fieldcontrol={loginFormCollection.getField('email')}/>
          <InputComponent text='Password' type='password'fieldcontrol={loginFormCollection.getField('password')}/>
          <button id="saveBtn" disabled={state.error} className="disabled" onClick={handlerRequest}>Next</button>
        </div>
      </div>
    </div>
  )
}
