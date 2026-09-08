const express = require("express");

const router = express.Router();

const {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
    getBookStats,
    getCategoryStats
} = require("../controllers/bookController");

const protect = require("../middleware/authMiddleware");


// ==========================================
// CREATE BOOK
// ==========================================
router.post(
    "/",
    protect,
    createBook
);


// ==========================================
// GET ALL BOOKS
// ==========================================
router.get(
    "/",
    protect,
    getBooks
);


// ==========================================
// DASHBOARD STATISTICS
// IMPORTANT: These must come BEFORE /:id
// ==========================================
router.get(
    "/stats",
    protect,
    getBookStats
);


// ==========================================
// CATEGORY STATISTICS
// ==========================================
router.get(
    "/category-stats",
    protect,
    getCategoryStats
);


// ==========================================
// GET ONE BOOK
// ==========================================
router.get(
    "/:id",
    protect,
    getBookById
);


// ==========================================
// UPDATE BOOK
// ==========================================
router.put(
    "/:id",
    protect,
    updateBook
);


// ==========================================
// DELETE BOOK
// ==========================================
router.delete(
    "/:id",
    protect,
    deleteBook
);


module.exports = router;