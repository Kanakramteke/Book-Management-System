const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true
        },

        author: {
            type: String,
            required: [true, "Author is required"],
            trim: true
        },

        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0.01, "Price must be greater than 0"]
        },

        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true
        },

        publishedYear: {
            type: Number,
            required: [true, "Published year is required"],
            min: [1000, "Published year must be at least 1000"],
            max: [
                new Date().getFullYear(),
                "Published year cannot be in the future"
            ]
        },

        // User who owns this book
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;