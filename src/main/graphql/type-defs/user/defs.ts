/* eslint-disable @typescript-eslint/ban-types */
import { gql } from 'apollo-server-express'

export const createUserQuery = gql`
  extend type Query {
    create (firstName: String, surname: String, email: String, avatarUrl: String, permissions: [String] ): UserModel!
  }

  type UserModel {
    id: Int
    firstName: String
    surname: String
    email: String
    avatarUrl: String
    updateAt: String
    createdAt: String
  }
`

export const updateUserQuery = gql`
  extend type Query {
    update (id: ID!, firstName: String, surname: String, email: String, avatarUrl: String, permissions: [String] ): Boolean!
  }
`

export const loadUserQuery = gql`
  extend type Query {
    load: [UserModel!]!
  }

  type UserModel {
    id: Int
    firstName: String
    surname: String
    email: String
    avatarUrl: String
    updateAt: String
    createdAt: String
  }
`
export const deleteUserQuery = gql`
  extend type Query {
    delete (id: ID!): Boolean!
  }
`
