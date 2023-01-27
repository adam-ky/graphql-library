import { useQuery } from '@apollo/client';
import { GET_BOOK } from '../queries/queries';

const BookDetails = props => {
  const { selected } = props;
  const { data, loading } = useQuery(GET_BOOK, {
    variables: { id: selected },
  });

  const displayBookDetails = () => {
    if (!data) {
      return <p>No book selected...</p>;
    }

    if (loading) {
      return <p>Loading book details...</p>;
    }

    const { title, genre, author } = data.book;
    const { name, books } = author;
    return (
      <div>
        <h2>{title}</h2>
        <p>{genre}</p>
        <p>{name}</p>
        <p>All books by this author:</p>
        <ul id="other-books">
          {books.map(book => {
            return <li key={book.id}>{book.title}</li>;
          })}
        </ul>
      </div>
    );
  };

  return <div id="book-details">{displayBookDetails()}</div>;
};

export default BookDetails;
