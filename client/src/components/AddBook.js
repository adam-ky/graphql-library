import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_BOOK, GET_AUTHORS } from '../queries/queries';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');
  const getAuthorsRes = useQuery(GET_AUTHORS);
  const [addBook] = useMutation(ADD_BOOK, {
    variables: {
      title,
      genre,
      authorId
    },
    refetchQueries: ['GetBooks', 'GetBook']
  });

  const getAuthorsSelect = () => {
    const { data, loading } = getAuthorsRes;
    if (loading) {
      return <div>Retrieving author list...</div>;
    }

    return (
      <div className="field">
        <label htmlFor="author">Author:</label>
        <select name="author" onChange={e => setAuthorId(e.target.value)}>
          <option value="" disabled selected hidden>
            Select an author
          </option>
          {data.authors.map(author => {
            return (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  };

  const submitForm = e => {
    e.preventDefault();
    addBook();
  };

  return (
    <form noValidate onSubmit={submitForm}>
      <div className="field">
        <label htmlFor="title">Title:</label>
        <input
          name="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <br />
      </div>
      <div className="field">
        <label htmlFor="genre">Genre:</label>
        <input
          name="genre"
          type="text"
          value={genre}
          onChange={e => setGenre(e.target.value)}
        />
        <br />
      </div>
      {getAuthorsSelect()}
      <button>+</button>
    </form>
  );
};

export default AddBook;
