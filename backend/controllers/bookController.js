const Book = require("../models/bookModel");


// ==========================================
// CREATE
// POST /api/books
// ==========================================
const createBook = async (req, res) => {
    try {
        const book = await Book.create({
            ...req.body,
            user: req.user
        });

        res.status(201).json(book);

    } catch (error) {
        console.error("CREATE BOOK ERROR:", error);

        // Mongoose validation error
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Validation failed",
                errors: Object.values(error.errors).map(
                    (err) => err.message
                )
            });
        }

        res.status(500).json({
            message: "Failed to create book"
        });
    }
};


// ==========================================
// READ ALL
// GET /api/books
// ==========================================
const getBooks = async (req, res) => {
    try {
        const books = await Book.find({
            user: req.user
        });

        res.status(200).json(books);

    } catch (error) {
        console.error("GET BOOKS ERROR:", error);

        res.status(500).json({
            message: "Failed to fetch books"
        });
    }
};


// ==========================================
// READ ONE
// GET /api/books/:id
// ==========================================
const getBookById = async (req, res) => {
    try {
        const book = await Book.findOne({
            _id: req.params.id,
            user: req.user
        });

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json(book);

    } catch (error) {
        console.error("GET BOOK ERROR:", error);

        // Invalid MongoDB ObjectId
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid book ID"
            });
        }

        res.status(500).json({
            message: "Failed to fetch book"
        });
    }
};


// ==========================================
// UPDATE
// PUT /api/books/:id
// ==========================================
const updateBook = async (req, res) => {
    try {
        const book = await Book.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user
            },
            {
                $set: req.body
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json(book);

    } catch (error) {
        console.error("UPDATE BOOK ERROR:", error);

        // Invalid MongoDB ObjectId
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid book ID"
            });
        }

        // Mongoose validation error
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Validation failed",
                errors: Object.values(error.errors).map(
                    (err) => err.message
                )
            });
        }

        res.status(500).json({
            message: "Failed to update book"
        });
    }
};


// ==========================================
// DELETE
// DELETE /api/books/:id
// ==========================================
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findOneAndDelete({
            _id: req.params.id,
            user: req.user
        });

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book deleted successfully"
        });

    } catch (error) {
        console.error("DELETE BOOK ERROR:", error);

        // Invalid MongoDB ObjectId
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid book ID"
            });
        }

        res.status(500).json({
            message: "Failed to delete book"
        });
    }
};


// ==========================================
// DASHBOARD STATISTICS
// GET /api/books/stats
// ==========================================
const getBookStats = async (req, res) => {
    try {
        const books = await Book.find({
            user: req.user
        });

        // Total number of books
        const totalBooks = books.length;


        // Total unique categories
        const categories = [
            ...new Set(
                books.map((book) => book.category)
            )
        ];

        const totalCategories = categories.length;


        // Books added in the last 7 days
        const sevenDaysAgo = new Date();

        sevenDaysAgo.setDate(
            sevenDaysAgo.getDate() - 7
        );

        const recentlyAddedBooks = books.filter(
            (book) =>
                book.createdAt >= sevenDaysAgo
        ).length;


        // Latest published year
        const latestPublishedYear =
            books.length > 0
                ? Math.max(
                    ...books.map(
                        (book) => book.publishedYear
                    )
                )
                : null;


        res.status(200).json({
            totalBooks,
            totalCategories,
            recentlyAddedBooks,
            latestPublishedYear
        });

    } catch (error) {
        console.error(
            "GET BOOK STATS ERROR:",
            error
        );

        res.status(500).json({
            message: "Failed to fetch book statistics"
        });
    }
};


// ==========================================
// CATEGORY STATISTICS
// GET /api/books/category-stats
// ==========================================
const getCategoryStats = async (req, res) => {
    try {
        const books = await Book.find({
            user: req.user
        });

        const categoryCounts = {};


        // Count books in each category
        books.forEach((book) => {
            const category = book.category;

            if (categoryCounts[category]) {
                categoryCounts[category]++;
            } else {
                categoryCounts[category] = 1;
            }
        });


        // Convert object into array
        const categoryStats = Object.entries(
            categoryCounts
        ).map(([category, count]) => ({
            category,
            count
        }));


        res.status(200).json(categoryStats);

    } catch (error) {
        console.error(
            "GET CATEGORY STATS ERROR:",
            error
        );

        res.status(500).json({
            message: "Failed to fetch category statistics"
        });
    }
};


// ==========================================
// EXPORTS
// ==========================================
module.exports = {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
    getBookStats,
    getCategoryStats
};