import BookCard from "./BookCard";
import "./BookList.css";

function BookList({ books, onEdit, onDelete }) {
    return (
        <div className="book-list-grid">

            {books.map((book) => (
                <BookCard
                    key={book._id}
                    book={book}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}

        </div>
    );
}

export default BookList;