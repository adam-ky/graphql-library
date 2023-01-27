import { gql } from '@apollo/client';

/**
 * The authorId in query variable should match the
 * type defined in the GraphQL schema, i.e GraphQLID.
 */
export const ADD_BOOK = gql`
  mutation ($title: String!, $genre: String!, $authorId: ID!) {
    addBook(title: $title, genre: $genre, authorId: $authorId) {
      author {
        books {
          id
          title
          genre
        }
      }
    }
  }
`;

export const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      name
      age
      id
    }
  }
`;

export const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      title
      genre
      author {
        name
        books {
          title
        }
      }
    }
  }
`;

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      genre
    }
  }
`;
