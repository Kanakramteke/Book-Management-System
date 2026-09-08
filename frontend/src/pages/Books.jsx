
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
    BookOpen,
    Plus,
    Search
} from "lucide-react";

import {
    getBooks,
    deleteBook
} from "../services/bookService";

import BookList from "../components/BookList";
import BookForm from "../components/BookForm";

import "./Books.css";

function Books() {
    const location = useLocation();

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editingBook, setEditingBook] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await getBooks();

                setBooks(data);
            } catch (err) {
                console.error(
                    "Failed to fetch books:",
                    err
                );

                if (err.response?.data?.message) {
                    setError(
                        err.response.data.message
                    );
                } else {
                    setError("Failed to fetch books");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    /*
     * Handle navigation state coming from:
     *
     * 1. Sidebar → Add Book
     *    state: { openAddBook: true }
     *
     * 2. Book Details → Edit Book
     *    state: { bookToEdit: book }
     */
    useEffect(() => {
        if (location.state?.bookToEdit) {
            const book = location.state.bookToEdit;

            setEditingBook(book);
            setSearchTerm("");
            setError("");

            setTimeout(() => {
                document
                    .getElementById("book-form-section")
                    ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
            }, 100);

            return;
        }

        if (location.state?.openAddBook) {
            setEditingBook(null);
            setSearchTerm("");
            setError("");

            setTimeout(() => {
                document
                    .getElementById("book-form-section")
                    ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
            }, 100);
        }
    }, [location.state]);


    const handleBookCreated = (newBook) => {
        setBooks((previousBooks) => [
            ...previousBooks,
            newBook
        ]);
    };


    const handleEdit = (book) => {
        setEditingBook(book);
        setSearchTerm("");
        setError("");

        setTimeout(() => {
            document
                .getElementById("book-form-section")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
        }, 100);
    };


    const handleBookUpdated = (updatedBook) => {
        setBooks((previousBooks) =>
            previousBooks.map((book) =>
                book._id === updatedBook._id
                    ? updatedBook
                    : book
            )
        );

        setEditingBook(null);
    };


    const handleCancelEdit = () => {
        setEditingBook(null);
        setError("");
    };


    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this book?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");

            await deleteBook(id);

            setBooks((previousBooks) =>
                previousBooks.filter(
                    (book) => book._id !== id
                )
            );
        } catch (err) {
            console.error(
                "Failed to delete book:",
                err
            );

            if (err.response?.data?.message) {
                setError(
                    err.response.data.message
                );
            } else {
                setError("Failed to delete book");
            }
        }
    };


    const handleAddBookClick = () => {
        setEditingBook(null);
        setSearchTerm("");
        setError("");

        setTimeout(() => {
            document
                .getElementById("book-form-section")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
        }, 100);
    };


    const filteredBooks = books.filter((book) => {
        const search = searchTerm
            .trim()
            .toLowerCase();

        if (!search) {
            return true;
        }

        return (
            book.title
                ?.toLowerCase()
                .includes(search) ||
            book.author
                ?.toLowerCase()
                .includes(search) ||
            book.category
                ?.toLowerCase()
                .includes(search)
        );
    });


    /*
     * Search mode starts as soon as the user types
     * anything into the search box.
     */
    const isSearching =
        searchTerm.trim().length > 0;


    if (loading) {
        return (
            <div className="books-loading">
                Loading books...
            </div>
        );
    }


    return (
        <div className="books-page">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="books-page-header">

                <div className="books-page-heading">

                    <h1>Books</h1>

                    <p>
                        Manage your book collection
                    </p>

                </div>


                {!isSearching && (
                    <button
                        className="add-book-btn"
                        onClick={handleAddBookClick}
                    >
                        <Plus size={18} />
                        Add Book
                    </button>
                )}

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
                <div className="books-error">
                    {error}
                </div>
            )}


            {/* =================================================
                SEARCH
            ================================================= */}

            <div className="books-toolbar">

                <div className="search-box">

                    <Search size={18} />

                    <input
                        type="text"
                        placeholder="Search books, authors or categories..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                    />

                </div>


                <div className="books-count">

                    {isSearching
                        ? `${filteredBooks.length} ${
                              filteredBooks.length === 1
                                  ? "book"
                                  : "books"
                          } found`
                        : `${books.length} ${
                              books.length === 1
                                  ? "book"
                                  : "books"
                          }`}

                </div>

            </div>


            {/* =================================================
                ADD / EDIT FORM
                HIDDEN COMPLETELY WHILE SEARCHING
            ================================================= */}

            {!isSearching && (
                <div
                    id="book-form-section"
                    className="book-form-card"
                >

                    <div className="form-card-header">

                        <div className="form-card-title">

                            <BookOpen size={20} />

                            <div className="form-card-heading">

                                <h2>
                                    {editingBook
                                        ? "Edit Book"
                                        : "Add New Book"}
                                </h2>

                                <p>
                                    {editingBook
                                        ? "Update the details of your book."
                                        : "Enter the details below to add a book to your collection."}
                                </p>

                            </div>

                        </div>

                    </div>


                    <BookForm
                        bookToEdit={editingBook}
                        onBookCreated={
                            handleBookCreated
                        }
                        onBookUpdated={
                            handleBookUpdated
                        }
                        onCancelEdit={
                            handleCancelEdit
                        }
                    />

                </div>
            )}


            {/* =================================================
                BOOKS / SEARCH RESULTS
            ================================================= */}

            <div
                className={`books-list-card ${
                    isSearching
                        ? "search-results-card"
                        : ""
                }`}
            >

                <div className="books-list-header">

                    <div>

                        <h2>
                            {isSearching
                                ? "Search Results"
                                : "Your Books"}
                        </h2>

                        <p>
                            {isSearching
                                ? `Results for "${searchTerm.trim()}"`
                                : "All books in your collection"}
                        </p>

                    </div>

                    <BookOpen size={22} />

                </div>


                {filteredBooks.length === 0 ? (

                    <div className="books-empty">

                        <BookOpen size={45} />

                        <h3>
                            {isSearching
                                ? "No books found"
                                : books.length === 0
                                ? "No books yet"
                                : "No books found"}
                        </h3>

                        <p>
                            {isSearching
                                ? "Try searching with a different title, author or category."
                                : books.length === 0
                                ? "Add your first book to start building your collection."
                                : "Try searching with a different title, author or category."}
                        </p>

                    </div>

                ) : (

                    <BookList
                        books={filteredBooks}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                )}

            </div>

        </div>
    );
}

export default Books;
