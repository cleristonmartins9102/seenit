import React, { useEffect, useState } from 'react'
import Styles from './save-user.scss'
import { InputComponent } from '@/presentation/component/upload'
import { FormCollection, FormField } from '@/data/uteis/form'
import { MinLengthValidator, RequiredFieldValidator } from '@/presentation/validators'
import { ProjectModel } from '@/domain/projects/load'
import { connect } from 'react-redux'
import { usersActions } from '@/store/actions/users/user-actions'
import { Permissions, UserModel } from '@/domain/user/signup'
import { remoteUpdateUser } from '@/data/users/remote-update-user'
import uniqid from 'uniqid'

const userCollection = new FormCollection()
userCollection.add('id', new FormField())
userCollection.add('firstName', new FormField([new RequiredFieldValidator('firstName'), new MinLengthValidator('firstName', 2)]))
userCollection.add('surname', new FormField([new RequiredFieldValidator('surname'), new MinLengthValidator('surname', 2)]))
userCollection.add('permissions', new FormField())


export type Params = {
  addAllUser?: (project: UserModel[]) => any
  addAloneUser?: (project: UserModel) => any
  removeUser?: (project: string) => any
  setCurrentUser?: (project: UserModel) => any
  users?: UserModel[]
  currentUser?: UserModel
}

export const saveUser: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({users, currentUser, addAllUser, setCurrentUser, addAloneUser, removeUser,...params}: Params & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [state, setState] = useState({ allFieldsTouched: false, error: userCollection.getError() })

  useEffect(() => {
    userCollection.focusOut(() => setState(prev => ({
      ...prev,
      error: userCollection.getError(),
      allFieldsTouched: userCollection.checkAllTouched()
    })))

    if (currentUser) populate(currentUser)
  }, [])

  const populate = (data: UserModel): void => {
    userCollection.getField('id').setValue(data.id)
    userCollection.getField('firstName').setValue(data.firstName)
    userCollection.getField('surname').setValue(data.surname)
  }

  const handleRequest = async (e): Promise<void> => {
      const resp = await remoteUpdateUser(userCollection.getValue())
      addAloneUser(resp)   
    params.onClick(e)
  }

  const handleCheck = (e, appId, moduleId) => {
    const { permissions } = currentUser
    const findApp = permissions.findIndex(app => app.app.id === appId)
    if (findApp !== -1) {
      const slicedApp = Object.assign({}, permissions[findApp])
      const findModule = slicedApp.app.module.findIndex(m => m.id === moduleId)
      if (findModule !== -1) {
        const module = slicedApp.app.module[findModule]
        module.accepted = e.target.checked
        slicedApp.app = {...slicedApp.app, module: []}
      }
    }
    // console.log(permissions)
  }
  return (
    <div className={Styles.wrapName}>
      <InputComponent text='First Name' fieldcontrol={userCollection.getField('firstName')}/>
      <InputComponent text='Surname' fieldcontrol={userCollection.getField('surname')}/>
      <table className={Styles.wrapUl}>
        {currentUser.permissions.map(p => {
          return <>
            <tr key={uniqid()} className={Styles.appName}>
              <th> <span>{p.app.name[0].toUpperCase() + p.app.name.slice(1)}</span></th>
            </tr>
            <tr key={uniqid()}>
              <table className={Styles.table}>
                {p.app.module.map(m => <tr key={uniqid()}>
                  <td>{m.name}</td>
                  <td>
                    <table className={Styles.table}>
                      <tr><td><input type='checkbox' disabled={true} onClick={(e) => handleCheck(e, p.app.id, m.id)} defaultChecked={!!m.accepted}/></td></tr>
                    </table>
                  </td>
                </tr>)}
              </table>
            </tr>
          </>
        })}
      </table>
      <button disabled={state.error} onClick={handleRequest}>Update</button>
    </div>
  )
}

const dispatchToProps = (dispatch): any => ({
  addAllUser: (projects): ProjectModel[] => dispatch(usersActions.set_all_user(projects)),
  addAloneUser: (projects: ProjectModel) => dispatch(usersActions.addAloneUser(projects)),
  removeUser: (projects: string) => dispatch(usersActions.remove_user(projects)),
  setCurrentUser: (projects: ProjectModel) => dispatch(usersActions.setCurrentUser(projects))
})

export const SaveUser = connect(({users}: any) => ({ users: users.users, currentUser: users.currentUser}), dispatchToProps)(saveUser)

