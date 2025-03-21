import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query User {
    user {
        _id: ID
        username
        email
        bookCount
        password
        savedBooks {
            bookId
            title
            authors
            description
            image
            link
        }
    }
}
`;

export const QUERY_BOOK = gql`
query Book {
    book{
        bookId
        title
        authors
        description
        image
        link
    }
}
`;

export const QUERY_ME = gql`
query me {
    me {
        _id
        username
        email
        bookCount
        password
        savedBooks {
            bookId
            title
            authors
            description
            image
            link
        }
    }
}
`