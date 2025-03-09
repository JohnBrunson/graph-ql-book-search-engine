
const typeDefs = `
type User {
_id: ID
username: String
email: String
bookCount: Number
password: String
savedBooks: [Book]!

}
type Book {
bookId: String!
title: String!
authors: [String]!
description: String!
image: String
link: String
}

type Auth {
token: String!
user: User!
}

type Query {
getUser (id:ID!): User
me: User
}

type Mutation {
  createUser(username: String!, email: String!, password: String!): User
  loginUser(username: String!, password: String!): String
  saveBook(userId: ID!, book: BookInput!): User
  removeBook(userId: ID!, bookId: String!): User
}

input BookInput {
  bookId: String!
  title: String!
  authors: [String!]!
  description: String!
  image: String
  link: String
`