import { gql } from 'apollo-server-express'

export const createProjectQuery = gql`
  extend type Query {
    createProject (name: String, description: String): ProjectModel!
  }

  type ProjectModel {
    id: Int
    name: String
    description: String
    createdBy: String
    updateAt: String
    createdAt: String
  }
`

export const loadProjectQuery = gql`
  extend type Query  {
    loadProjects: [ProjectModel!]!
  }

  type ProjectModel {
    id: Int
    name: String
    description: String
    createdBy: String
    updateAt: String
    createdAt: String
  }
`

export const updateProjectQuery = gql`
  extend type Query {
    updateProject (id: ID!, name: String, description: String): Boolean!
  }
`

export const deleteProjectQuery = gql`
  extend type Query { 
    deleteProject (id: ID!): Boolean!
  }
`
