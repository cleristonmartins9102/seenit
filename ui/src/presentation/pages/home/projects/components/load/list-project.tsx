import React, { useEffect, useState } from 'react'
import { remoteLoadProjects } from '@/data/load-projects/remote-load-projects'
import Styles from './list-projects.scss'
import uniqid from 'uniqid'
import { connect } from 'react-redux'
import { projectActions } from '@/store/actions/project/project-actions'
import { ProjectModel } from '@/domain/projects/load'
import { SavedDialog } from "@/presentation/component/dialog/saved/saved"
import { SaveProject } from '../save/save-project'

export type Params = {
  addAllProjects?: (project: ProjectModel[]) => any
  addAloneProject?: (project: ProjectModel) => any
  removeProject?: (project: string) => any
  setCurrentProject?: (project: ProjectModel) => any
  projects?: ProjectModel[]
  currentProject?: ProjectModel
}

const listProjects: React.FC<Params> = ({projects, currentProject, addAllProjects, setCurrentProject, addAloneProject, removeProject}: Params) => {
  const [state, setState] = useState(false)
  useEffect(() => {
    handle().catch(err => console.log(err))
    document.addEventListener('keyup', key => {
      if (key.code === 'Escape') {
        setCurrentProject(null)
      }
    })
  }, [])
  
  const handle = async (): Promise<void> => {
    const projects = await remoteLoadProjects()
    addAllProjects(projects)
  }
  return (
    <div className={Styles.container}>
      <table>
        <thead>
          <th>Name</th>
          <th>Description</th>
          <th>Created By</th>
          <th>Created At</th>
        </thead>
        <tbody>
        {projects?.map((p, idx) => <tr key={uniqid()} onClick={() => setCurrentProject(p)}>
          <td>{p.name}</td>
          <td>{p.description}</td>
          <td>{p.createdBy?.firstName}</td>
          <td>{p.createdAt}</td>
        </tr>)}
        </tbody>
       
      </table>
      {currentProject && <SavedDialog msg=''>
        <SaveProject onClick={() => setCurrentProject(null)}/>
      </SavedDialog>}
    </div>
  )
}

const dispatchToProps = (dispatch): any => ({
  addAllProjects: (projects): ProjectModel[] => dispatch(projectActions.set_all_projects(projects)),
  addAloneProject: (projects: ProjectModel) => dispatch(projectActions.addAloneProject(projects)),
  removeProject: (projects: string) => dispatch(projectActions.remove_project(projects)),
  setCurrentProject: (projects: ProjectModel) => dispatch(projectActions.setCurrentProject(projects))
})

export const ListProjects = connect(({projects}: any) => ({ projects: projects.projects, currentProject: projects.currentProject}), dispatchToProps)(listProjects)
