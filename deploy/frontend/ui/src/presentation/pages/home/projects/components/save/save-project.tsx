import React, { useEffect, useState } from 'react'
import Styles from './save-project.scss'
import { InputComponent } from '@/presentation/component/upload'
import { FormCollection, FormField } from '@/data/uteis/form'
import { MinLengthValidator, RequiredFieldValidator } from '@/presentation/validators'
import { remoteSaveProject } from '../../../../../../data/load-projects/remote-save-project'
import { ProjectModel } from '@/domain/projects/load'
import { projectActions } from '@/store/actions/project/project-actions'
import { connect } from 'react-redux'
import { remoteUpdateProject } from '@/data/load-projects/remote-update-project'

const projectCollection = new FormCollection()
projectCollection.add('id', new FormField())
projectCollection.add('name', new FormField([new RequiredFieldValidator('name'), new MinLengthValidator('name', 2)]))
projectCollection.add('description', new FormField([new RequiredFieldValidator('description'), new MinLengthValidator('description', 2)]))


export type Params = {
  addAllProjects?: (project: ProjectModel[]) => any
  addAloneProject?: (project: ProjectModel) => any
  removeProject?: (project: string) => any
  setCurrentProject?: (project: ProjectModel) => any
  projects?: ProjectModel[]
  currentProject?: ProjectModel
}

export const saveProject: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({projects, currentProject, addAllProjects, setCurrentProject, addAloneProject, removeProject, ...params}: Params & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [state, setState] = useState({ allFieldsTouched: false, error: projectCollection.getError() })

  useEffect(() => {
    projectCollection.focusOut(() => setState(prev => ({
      ...prev,
      error: projectCollection.getError(),
      allFieldsTouched: projectCollection.checkAllTouched()
    })))

    if (currentProject) populate(currentProject)
  }, [])

  const populate = (data: ProjectModel): void => {
    projectCollection.getField('id').setValue(data?.id ?? null)
    projectCollection.getField('name').setValue(data.name)
    projectCollection.getField('description').setValue(data.description)
  }

  const handleRequest = async (e): Promise<void> => {
    if (!currentProject) {
      const data = projectCollection.getValue()
      if (data.id === '') {
        delete data.id
      }
      const resp = await remoteSaveProject(data)
      addAloneProject(resp)
    } else {
      await remoteUpdateProject(projectCollection.getValue())
    }
    params.onClick(e)
  }
  return (
    <div className={Styles.wrapName}>
      <InputComponent text='Name' fieldcontrol={projectCollection.getField('name')}/>
      <InputComponent text='Description' fieldcontrol={projectCollection.getField('description')}/>
      <button disabled={state.error} onClick={handleRequest}>{currentProject ? 'Update' : 'Create'}</button>
    </div>
  )
}

const dispatchToProps = (dispatch): any => ({
  addAllProjects: (projects): ProjectModel[] => dispatch(projectActions.set_all_projects(projects)),
  addAloneProject: (projects: ProjectModel) => dispatch(projectActions.addAloneProject(projects)),
  removeProject: (projects: string) => dispatch(projectActions.remove_project(projects)),
  setCurrentProject: (projects: ProjectModel) => dispatch(projectActions.setCurrentProject(projects))
})

export const SaveProject = connect(({projects}: any) => ({ projects: projects.projects, currentProject: projects.currentProject}), dispatchToProps)(saveProject)

