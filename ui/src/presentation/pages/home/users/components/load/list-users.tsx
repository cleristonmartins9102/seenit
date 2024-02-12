import React, { useEffect, useState } from 'react'
import { remoteLoadProjects } from '@/data/load-projects/remote-load-projects'
import Styles from './list-users.scss'
import uniqid from 'uniqid'
import { connect } from 'react-redux'
import { projectActions } from '@/store/actions/project/project-actions'
import { ProjectModel } from '@/domain/projects/load'
import { SavedDialog } from "@/presentation/component/dialog/saved/saved"
import { remoteLoadUsers } from '@/data/users/remote-load-users'
import { usersActions } from '@/store/actions/users/user-actions'
import { UserModel } from '@/domain/user/signup'
import { SaveUser } from '../save/save-user'
// import { SaveProject } from '../save/save-project'

export type Params = {
  addAllUser?: (project: UserModel[]) => any
  addAloneUser?: (project: UserModel) => any
  removeUser?: (project: string) => any
  setCurrentUser?: (project: UserModel) => any
  users?: UserModel[]
  currentUser?: UserModel
}

const listUsers: React.FC<Params> = ({users, currentUser, addAllUser, setCurrentUser, addAloneUser, removeUser}: Params) => {
  const [state, setState] = useState(false)
  useEffect(() => {
    handle().catch(err => console.log(err))
    document.addEventListener('keyup', key => {
      if (key.code === 'Escape') {
        setCurrentUser(null)
      }
    })
  }, [])
  
  const handle = async (): Promise<void> => {
    const users = await remoteLoadUsers()
    addAllUser(users)
  }
  return (
    <div className={Styles.container}>
      <table className={Styles.tableList}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
        {users?.map((p, idx) => <tr key={uniqid()} onClick={() => setCurrentUser(p)}>
          <td>{p.firstName}</td>
          <td>{p.surname}</td>
          <td>{p.email}</td>
          <td>{p.createdAt}</td>
        </tr>)}
        </tbody>
        
      </table>
      {currentUser && <SavedDialog msg=''>
        <SaveUser onClick={() => setCurrentUser(null)}/>
      </SavedDialog>}
    </div>
  )
}

const dispatchToProps = (dispatch): any => ({
  addAllUser: (projects): ProjectModel[] => dispatch(usersActions.set_all_user(projects)),
  addAloneUser: (projects: ProjectModel) => dispatch(usersActions.addAloneUser(projects)),
  removeUser: (projects: string) => dispatch(usersActions.remove_user(projects)),
  setCurrentUser: (projects: ProjectModel) => dispatch(usersActions.setCurrentUser(projects))
})

export const ListUsers = connect(({users}: any) => ({ users: users.users, currentUser: users.currentUser}), dispatchToProps)(listUsers)
