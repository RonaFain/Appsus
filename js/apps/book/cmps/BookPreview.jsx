import { utilService } from '../services/util.service.js';

const { Link } = ReactRouterDOM;

export function BookPreview({ book }) {
  return (
    <Link to={`/bookapp/book/${book.id}`} className="book-preview">
      <article >
        <div className="image-container">
          <img src={book.thumbnail} />
        </div>
        <h4>{book.title.charAt(0).toUpperCase() + book.title.slice(1)}</h4>
        <h4>
          Price:{' '}
          {utilService.getCurrencySign(book.listPrice.currencyCode) + ' '}
          {book.listPrice.amount}
        </h4>
      </article>
    </Link>
  );
}
