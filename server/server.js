import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import { schema } from './schema/schema.js';
import cors from 'cors';

const PORT = 4000;

const app = express();

app.use(cors());

// Connect to database
mongoose.connect(
  'mongodb+srv://adam-ky:qwerty123@cluster0.mfakozh.mongodb.net/?retryWrites=true&w=majority'
);
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.listen(PORT, () => console.log(`GraphQL server listening at port ${PORT}`));
