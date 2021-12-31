import { bookService } from '../apps/book/services/book.service.js';

import { BookFilter } from '../apps/book/cmps/BookFilter.jsx';
import { BookList } from '../apps/book/cmps/BookList.jsx';
import { BookAdd } from '../apps/book/cmps/BookAdd.jsx';

export class BookApp extends React.Component {
  state = {
    books: [],
    filterBy: null,
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    const { filterBy } = this.state;
    bookService.query(filterBy).then((books) => {
      this.setState({ books });
    });
  };

  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, this.loadBooks);
  };

  render() {
    const { books } = this.state;

    if(!books) return <React.Fragment></React.Fragment>

    return (
      <section className="book-app">
        <BookFilter onSetFilter={this.onSetFilter} />
        <BookAdd loadBooks={this.loadBooks}/>
        <BookList books={books} />
      </section>
    );
  }
}
