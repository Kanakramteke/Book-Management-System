
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/books`;

// Get authentication token
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        Authorization: `Bearer ${token}`
    };
};


// ==========================================
// READ - Get all books
// ==========================================
export const getBooks = async () => {
    const response = await axios.get(
        API_URL,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};


// ==========================================
// CREATE - Add a new book
// ==========================================
export const createBook = async (bookData) => {
    const response = await axios.post(
        API_URL,
        bookData,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};


// ==========================================
// READ ONE - Get book by ID
// ==========================================
export const getBookById = async (id) => {
    const response = await axios.get(
        `${API_URL}/${id}`,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};


// ==========================================
// UPDATE - Update an existing book
// ==========================================
export const updateBook = async (id, bookData) => {
    const response = await axios.put(
        `${API_URL}/${id}`,
        bookData,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};


// ==========================================
// DELETE - Delete an existing book
// ==========================================
export const deleteBook = async (id) => {
    const response = await axios.delete(
        `${API_URL}/${id}`,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};
