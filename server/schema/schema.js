import {
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql';
import { Author } from '../models/author.js';
import { Book } from '../models/book.js';

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => {
        return Book.find({ authorId: parent.id });
      }
    }
  })
});

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: async (parent, args) => {
        return await Author.findById(parent.authorId);
      }
    }
  })
});

const Query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (_, args) => {
        return Author.findById(args.id);
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: () => {
        return Author.find({});
      }
    },
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve: (_, args) => {
        return Book.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: () => {
        return Book.find({});
      }
    }
  })
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: (_, args) => {
        const { name, age } = args;
        const author = new Author({ name, age });
        return author.save();
      }
    }
  }),
  addBook: {
    type: BookType,
    args: {
      title: { type: new GraphQLNonNull(GraphQLString) },
      genre: { type: new GraphQLNonNull(GraphQLString) },
      authorId: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: (_, args) => {
      const { title, genre, authorId } = args;
      const book = new Book({ title, genre, authorId });
      return book.save();
    }
  }
});

export const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});
