
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";

import BookForm from "./BookForm";

import "./AddBook.css";

function AddBook() {
    const navigate = useNavigate();

    const handleBookCreated = () => {
        navigate("/books");
    };

    const handleBookUpdated = () => {
        navigate("/books");
    };

    const handleCancel = () => {
        navigate("/books");
    };

    return (
        <div className="add-book-page">
            <button
                className="add-book-back"
                onClick={() => navigate("/books")}
            >
                <ArrowLeft size={18} />
                Back to Books
            </button>

            <div className="add-book-header">
                <div>
                    <p className="add-book-label">
                        LIBRARY
                    </p>

                    <h1>Add New Book</h1>

                    <p>
                        Add a new book to your personal collection.
                    </p>
                </div>

                <div className="add-book-icon">
                    <BookOpen size={30} />
                </div>
            </div>

            <div className="add-book-card">
                <BookForm
                    bookToEdit={null}
                    onBookCreated={handleBookCreated}
                    onBookUpdated={handleBookUpdated}
                    onCancelEdit={handleCancel}
                />
            </div>
        </div>
    );
}

export default AddBook;
