import { SavedDialog } from '@/presentation/component/dialog/saved/saved'
import React, { useState } from 'react'
import Styles from './users-panel.scss'
import { ListUsers } from '../load/list-users'
import { SaveUser } from '../save/save-user'

export const UsersPanel: React.FC = () => {
  const [state, setState] = useState({ dialogActivated: false })
  return (
    <div className={Styles.list}>
      <div className={Styles.listHeader}>
        <button disabled onClick={() => setState(prev => ({ ...prev, dialogActivated: true }))}>Create</button>
      </div>
      {state.dialogActivated && <SavedDialog msg=''>
        <SaveUser onClick={() => setState(prev => ({ ...prev, dialogActivated: false }))}/>
      </SavedDialog>}
      <ListUsers />
    </div>
  )
}
