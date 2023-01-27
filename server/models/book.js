import mongoose from 'mongoose';

/**
 * For MongoDB, an id is automatically added
 * for new documents inserted into the database.
 * Avoid adding 'id' field when creating schema.
 */

const bookSchema = new mongoose.Schema({
    title: String,
    genre: String,
    authorId: String,
})

export const Book = mongoose.model('Book', bookSchema);
