import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_BOOKS } from '../queries/queries';
import BookDetails from './BookDetails';

const BookList = () => {
  const [selected, setSelected] = useState(null);
  const { data, loading } = useQuery(GET_BOOKS);

  const displayBooks = () => {
    if (loading) {
      return <div>Loading Books...</div>;
    }

    return (
      <ul id="book-list">
        {data.books.map(book => {
          return (
            <li key={book.id} onClick={() => setSelected(book.id)}>
              {book.title}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div>
      {displayBooks()}
      <BookDetails selected={selected} />
    </div>
  );
};

export default BookList;
