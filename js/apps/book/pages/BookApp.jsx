import { bookService } from '../services/book.service.js';

import { BookFilter } from '../cmps/BookFilter.jsx';
import { BookList } from '../cmps/BookList.jsx';
import { BookAdd } from '../cmps/BookAdd.jsx';

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
    console.log('books' , books);

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
