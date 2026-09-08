import { useNavigate } from "react-router-dom";
import { Eye, Edit, Trash2 } from "lucide-react";

import "./BookCard.css";

function BookCard({ book, onEdit, onDelete }) {
    const navigate = useNavigate();

    return (
        <div className="book-card">

            <div className="book-card-content">

                <h3>{book.title}</h3>

                <p className="book-card-author">
                    Author: <span>{book.author}</span>
                </p>

            </div>

            <div className="book-card-actions">

                <button
                    className="view-details-btn"
                    onClick={() =>
                        navigate(`/books/${book._id}`)
                    }
                >
                    <Eye size={15} />
                    View Details
                </button>

                <button
                    className="edit-btn"
                    onClick={() => onEdit(book)}
                >
                    <Edit size={15} />
                    Edit
                </button>

                <button
                    className="delete-btn"
                    onClick={() => onDelete(book._id)}
                >
                    <Trash2 size={15} />
                    Delete
                </button>

            </div>

        </div>
    );
}

export default BookCard;