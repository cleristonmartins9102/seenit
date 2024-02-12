import React, { useState } from 'react'

import Styles from './home.scss'
import { storageLoadAccountFactory } from '@/main/factories/usercases/load-storage-account-factory'
import { ListProjects } from './projects/components/load/list-project'
import Cookies from 'js-cookie'
import { SavedDialog } from '@/presentation/component/dialog/saved/saved'
import { InputComponent } from '../../component/input/input-component'
import { SaveProject } from './projects/components/save/save-project'
import { ProjectPanel } from './projects/components/panel/project-panel'
import { UsersPanel } from './users/components/panel/users-panel'

export const Home: React.FC = () => {
  const storage = storageLoadAccountFactory()
  const account = storage.load() as any
  const [state, setState] = useState({aba: 'project'})
  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <div className={Styles.logo}>
          <h1>Seenit</h1>
        </div>
        <div className={Styles.avatar}>
          <span>{account.firstName}</span>
          <img src={!account ? 'https://avatars.hubspot.net/default-100' : account.avatarUrl} alt="" />
        </div>
      </div>
      <div className={Styles.body}>
        <div className={Styles.sideBar}>
          <ul>
            <li onClick={() => setState({aba: 'project'})}>Projects</li>
            <li onClick={() => setState({aba: 'users'})}>Users</li>
          </ul>
        </div>
        {state.aba === 'users' && <UsersPanel />}
        {state.aba === 'project' && <ProjectPanel />}
      </div>
    </div>
  )
}
