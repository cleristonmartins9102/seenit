import { gql } from 'apollo-server-express'

export const loadProjectsDef = gql`
  type Project {
    name: String
    description: String
    createdAt: String
    createdBy: String
  }

  type Query {
    projects: [Project]
  }
`
