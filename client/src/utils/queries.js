import { gql } from '@apollo/client';

export const USER = gql`
    query user($userID: ID!) {
        user(userID: $userID) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;