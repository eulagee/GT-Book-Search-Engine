const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Query {
    #context functionality in placce and decode its data, we can use a query that will always find aand return user's data
    me: User
  }

  type User {
    _id: ID!
    username: String!
    password: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    _id : ID!
    bookId: String!
    authors: String!
    description: String!
    title: String!
    image: String!
    link: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(authors: String!, bookId: String!, description: String!, link: String!, image: String!, title: String!,): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;
