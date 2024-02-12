import { gql } from 'apollo-server-express'

export const loadUserDef = gql`
  type User {
    firstName: String
    surname: String
    email: String
    avatarUrl: String
    token: String
  }

  type Query {
    users: [User]
  }
`
