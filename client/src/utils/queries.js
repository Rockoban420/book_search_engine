import { gql } from '@apollo/client';

export const USER = gql`
query Query($userID: ID!) {
    user(userID: $userID) {
      _id
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
      username
    }
  }  
`;

export const USER_ME = gql`
query Query {
    me {
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