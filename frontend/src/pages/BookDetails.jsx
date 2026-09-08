import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    BookOpen,
    Calendar,
    Tag,
    User,
    IndianRupee,
    Pencil,
    Trash2
} from "lucide-react";

import {
    getBookById,
    deleteBook
} from "../services/bookService";

import "./BookDetails.css";

function BookDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getBookById(id);

                setBook(data);

            } catch (err) {
                console.error(
                    "Failed to fetch book:",
                    err
                );

                if (err.response?.data?.message) {
                    setError(
                        err.response.data.message
                    );
                } else {
                    setError(
                        "Failed to fetch book"
                    );
                }

            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this book?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteBook(id);

            navigate("/books");

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
                setError(
                    "Failed to delete book"
                );
            }
        }
    };

    const handleEdit = () => {
        navigate("/books", {
            state: {
                bookToEdit: book
            }
        });
    };

    if (loading) {
        return (
            <div className="book-details-loading">
                Loading book details...
            </div>
        );
    }

    if (error) {
        return (
            <div className="book-details-page">

                <button
                    className="back-button"
                    onClick={() =>
                        navigate("/books")
                    }
                >
                    <ArrowLeft size={18} />
                    Back to Books
                </button>

                <div className="book-details-error">
                    {error}
                </div>

            </div>
        );
    }

    if (!book) {
        return (
            <div className="book-details-page">

                <button
                    className="back-button"
                    onClick={() =>
                        navigate("/books")
                    }
                >
                    <ArrowLeft size={18} />
                    Back to Books
                </button>

                <div className="book-details-error">
                    Book not found
                </div>

            </div>
        );
    }

    return (
        <div className="book-details-page">

            {/* Back */}
            <button
                className="back-button"
                onClick={() =>
                    navigate("/books")
                }
            >
                <ArrowLeft size={18} />
                Back to Books
            </button>

            {/* Header */}
            <div className="book-details-header">

                <div>

                    <p className="details-label">
                        BOOK DETAILS
                    </p>

                    <h1>
                        {book.title}
                    </h1>

                    <p className="details-author">
                        by {book.author}
                    </p>

                </div>

                <div className="details-header-icon">
                    <BookOpen size={32} />
                </div>

            </div>

            {/* Error */}
            {error && (
                <div className="book-details-error">
                    {error}
                </div>
            )}

            {/* Main Card */}
            <div className="book-details-card">

                {/* Category */}
                <div className="detail-item">

                    <div className="detail-icon">
                        <Tag size={20} />
                    </div>

                    <div>
                        <span>
                            Category
                        </span>

                        <strong>
                            {book.category}
                        </strong>
                    </div>

                </div>

                {/* Author */}
                <div className="detail-item">

                    <div className="detail-icon">
                        <User size={20} />
                    </div>

                    <div>
                        <span>
                            Author
                        </span>

                        <strong>
                            {book.author}
                        </strong>
                    </div>

                </div>

                {/* Price */}
                <div className="detail-item">

                    <div className="detail-icon">
                        <IndianRupee size={20} />
                    </div>

                    <div>
                        <span>
                            Price
                        </span>

                        <strong>
                            ₹{book.price}
                        </strong>
                    </div>

                </div>

                {/* Published Year */}
                <div className="detail-item">

                    <div className="detail-icon">
                        <Calendar size={20} />
                    </div>

                    <div>
                        <span>
                            Published Year
                        </span>

                        <strong>
                            {book.publishedYear}
                        </strong>
                    </div>

                </div>

            </div>

            {/* Metadata */}
            <div className="book-metadata">

                <div>

                    <span>
                        Added to library
                    </span>

                    <strong>
                        {book.createdAt
                            ? new Date(
                                book.createdAt
                            ).toLocaleDateString(
                                "en-IN",
                                {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric"
                                }
                            )
                            : "—"}
                    </strong>

                </div>

                <div>

                    <span>
                        Last updated
                    </span>

                    <strong>
                        {book.updatedAt
                            ? new Date(
                                book.updatedAt
                            ).toLocaleDateString(
                                "en-IN",
                                {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric"
                                }
                            )
                            : "—"}
                    </strong>

                </div>

            </div>

            {/* Actions */}
            <div className="book-details-actions">

                <button
                    className="edit-details-btn"
                    onClick={handleEdit}
                >
                    <Pencil size={17} />
                    Edit Book
                </button>

                <button
                    className="delete-details-btn"
                    onClick={handleDelete}
                >
                    <Trash2 size={17} />
                    Delete Book
                </button>

            </div>

        </div>
    );
}

export default BookDetails;