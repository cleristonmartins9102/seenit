import { SavedDialog } from '@/presentation/component/dialog/saved/saved'
import React, { useState } from 'react'
import { SaveProject } from '../save/save-project'
import { ListProjects } from '../load/list-project'
import Styles from './project-panel.scss'

export const ProjectPanel: React.FC = () => {
  const [state, setState] = useState({ dialogActivated: false })
  return (
    <div className={Styles.list}>
      <div className={Styles.listHeader}>
        <button onClick={() => setState(prev => ({ ...prev, dialogActivated: true }))}>Create</button>
      </div>
      {state.dialogActivated && <SavedDialog msg=''>
        <SaveProject onClick={() => setState(prev => ({ ...prev, dialogActivated: false }))}/>
      </SavedDialog>}
      <ListProjects />
    </div>
  )
}
