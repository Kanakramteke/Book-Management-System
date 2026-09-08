
import { useEffect, useState } from "react";
import {
    BookOpen,
    User,
    Tag,
    IndianRupee,
    Calendar,
    Save,
    X
} from "lucide-react";

import {
    createBook,
    updateBook
} from "../services/bookService";

import "./BookForm.css";

function BookForm({
    bookToEdit,
    onBookCreated,
    onBookUpdated,
    onCancelEdit
}) {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        category: "",
        price: "",
        publishedYear: ""
    });

    const [error, setError] = useState("");

    const isEditing = Boolean(bookToEdit);

    useEffect(() => {
        if (bookToEdit) {
            setFormData({
                title: bookToEdit.title,
                author: bookToEdit.author,
                category: bookToEdit.category,
                price: bookToEdit.price,
                publishedYear: bookToEdit.publishedYear
            });
        } else {
            setFormData({
                title: "",
                author: "",
                category: "",
                price: "",
                publishedYear: ""
            });
        }

        setError("");
    }, [bookToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));

        setError("");
    };

    const resetForm = () => {
        setFormData({
            title: "",
            author: "",
            category: "",
            price: "",
            publishedYear: ""
        });

        setError("");
    };

    const validateForm = () => {
        if (!formData.title.trim()) {
            return "Title is required";
        }

        if (!formData.author.trim()) {
            return "Author is required";
        }

        if (!formData.category.trim()) {
            return "Category is required";
        }

        if (Number(formData.price) <= 0) {
            return "Price must be greater than 0";
        }

        const currentYear = new Date().getFullYear();

        if (
            Number(formData.publishedYear) < 1000 ||
            Number(formData.publishedYear) > currentYear
        ) {
            return `Published year must be between 1000 and ${currentYear}`;
        }

        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateForm();

        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setError("");

            const bookData = {
                ...formData,
                price: Number(formData.price),
                publishedYear: Number(formData.publishedYear)
            };

            if (isEditing) {
                const updatedBook = await updateBook(
                    bookToEdit._id,
                    bookData
                );

                onBookUpdated(updatedBook);
            } else {
                const newBook = await createBook(bookData);

                onBookCreated(newBook);

                resetForm();
            }
        } catch (err) {
            console.error(
                "Failed to save book:",
                err
            );

            if (err.response?.data?.errors) {
                setError(
                    err.response.data.errors.join(", ")
                );
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Failed to save book");
            }
        }
    };

    const handleCancel = () => {
        resetForm();
        onCancelEdit();
    };

    return (
        <div className="book-form-wrapper">
            <div className="book-form-intro">
                <div className="book-form-intro-icon">
                    <BookOpen size={21} />
                </div>

                <div>
                    <h3>
                        {isEditing
                            ? "Update your book"
                            : "Add a new book"}
                    </h3>

                    <p>
                        {isEditing
                            ? "Make changes to the details of this book."
                            : "Enter the details below to add a book to your collection."}
                    </p>
                </div>
            </div>

            {error && (
                <div className="book-form-error">
                    {error}
                </div>
            )}

            <form
                className="book-form"
                onSubmit={handleSubmit}
            >
                <div className="form-grid">
                    <div className="form-field form-field-full">
                        <label htmlFor="title">
                            Title
                        </label>

                        <div className="input-wrapper">
                            <BookOpen size={17} />

                            <input
                                id="title"
                                type="text"
                                name="title"
                                placeholder="Enter book title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="author">
                            Author
                        </label>

                        <div className="input-wrapper">
                            <User size={17} />

                            <input
                                id="author"
                                type="text"
                                name="author"
                                placeholder="Enter author name"
                                value={formData.author}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="category">
                            Category
                        </label>

                        <div className="input-wrapper">
                            <Tag size={17} />

                            <input
                                id="category"
                                type="text"
                                name="category"
                                placeholder="e.g. Fiction"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="price">
                            Price
                        </label>

                        <div className="input-wrapper">
                            <IndianRupee size={17} />

                            <input
                                id="price"
                                type="number"
                                name="price"
                                placeholder="Enter price"
                                min="0.01"
                                step="0.01"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="publishedYear">
                            Published Year
                        </label>

                        <div className="input-wrapper">
                            <Calendar size={17} />

                            <input
                                id="publishedYear"
                                type="number"
                                name="publishedYear"
                                placeholder="e.g. 2024"
                                min="1000"
                                max={new Date().getFullYear()}
                                value={formData.publishedYear}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    {isEditing && (
                        <button
                            type="button"
                            className="cancel-book-btn"
                            onClick={handleCancel}
                        >
                            <X size={17} />
                            Cancel
                        </button>
                    )}

                    <button
                        type="submit"
                        className="save-book-btn"
                    >
                        <Save size={17} />

                        {isEditing
                            ? "Update Book"
                            : "Add Book"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default BookForm;
