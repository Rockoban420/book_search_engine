const { gql } = require('@apollo/client');

export const LOGIN_USER = gql`
mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        password
        username
        savedBooks {
          _id
          authors
          bookId
          description
          link
          image
          title
        }
      }
    }
  }
  
`;

export const ADD_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        email
        password
        savedBooks {
          image
          _id
          authors
          bookId
          description
          link
          title
        }
        username
      }
    }
  }
  
`;

export const SAVE_BOOK = gql`
mutation Mutation($userID: ID!, $bookId: String!, $title: String!, $authors: [String], $description: String, $image: String, $link: String) {
    saveBook(userID: $userID, bookId: $bookId, title: $title, authors: $authors, description: $description, image: $image, link: $link) {
      _id
      username
      email
      password
      savedBooks {
        _id
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
  
`;

export const REMOVE_BOOK = gql`
mutation Mutation($userID: ID!, $bookId: String!) {
    removeBook(userID: $userID, bookId: $bookId) {
      _id
      email
      password
      savedBooks {
        _id
        authors
        bookId
        description
        image
        link
        title
      }
      username
    }
  }
  
`;