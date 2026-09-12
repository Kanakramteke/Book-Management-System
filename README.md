# 📚 BookShelf — Book Management System

A full-stack **Book Management System** that allows users to securely manage their personal book collection. Users can create an account, log in, add books, view book details, update existing books, delete books, and view useful statistics through an interactive dashboard.

The application is built using the **MERN stack** with JWT authentication and is fully deployed online.


---

## 🚀 Live Demo

🌐 **Live Application:** https://book-management-system-tau-one.vercel.app/login

---

## ✨ Features

### 🔐 Authentication

* User registration
* User login
* Secure password hashing using `bcryptjs`
* JWT-based authentication
* Protected routes
* User session management using `localStorage`

### 📚 Book Management

Users can:

* ➕ Add new books
* 📖 View all books
* 🔍 View individual book details
* ✏️ Edit existing books
* 🗑️ Delete books

Each book contains information such as:

* Title
* Author
* Category
* Price
* Published Year

### 📊 Dashboard

The dashboard provides an overview of the user's book collection, including:

* Total number of books
* Total categories
* Recently added books
* Latest published year
* Category distribution visualization

### 🎨 User Interface

* Modern and responsive design
* Sidebar navigation
* Dashboard layout
* Interactive category chart
* Form validation
* Loading states
* Error handling
* Light and dark theme support

---

## 🛠️ Tech Stack

### Frontend

* React
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)

### Deployment

* Frontend deployed on Vercel
* Backend deployed on Render
* Database hosted on MongoDB Atlas
* Version control using Git and GitHub

---

## 📂 Project Structure

```text
Book-Management-System/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── bookController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Book.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── bookRoutes.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── AddBook.jsx
│   │   │   ├── BookDetails.jsx
│   │   │   ├── Books.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Settings.jsx
│   │   │
│   │   ├── services/
│   │   │   └── bookService.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## 🔑 Environment Variables

### Backend

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Frontend

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_URL=your_backend_url
```

Example:

```env
VITE_API_URL=https://your-backend.onrender.com
```

> Do not add `/api` at the end of the backend URL.

---

## 💻 Running the Project Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Kanakramteke/Book-Management-System.git
```

Move into the project:

```bash
cd Book-Management-System
```

---

### 2️⃣ Run the Backend

```bash
cd backend
npm install
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

---

### 3️⃣ Run the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite will provide the local development URL.


## 🔒 Authentication Flow

```text
User
  │
  ▼
Register / Login
  │
  ▼
Backend Authentication
  │
  ▼
JWT Token Generated
  │
  ▼
Token Stored in LocalStorage
  │
  ▼
Access Protected Routes
  │
  ▼
Manage Personal Book Collection
```

---

## 📊 Dashboard Overview

The dashboard dynamically fetches data from the backend and displays:

* 📚 Total Books
* 🗂️ Total Categories
* 🕒 Recently Added Books
* 📅 Latest Published Book Year
* 🥧 Category Distribution Chart

---

## 🌐 Deployment

The project is deployed using:

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas

Live application:

🌐 https://book-management-system-tau-one.vercel.app/login

---

## 🎯 Key Learnings

Through this project, I gained hands-on experience with:

* Building a full-stack MERN application
* Designing RESTful APIs
* Implementing CRUD operations
* JWT authentication and protected routes
* Password hashing using bcrypt
* MongoDB database integration
* React routing and state management
* API integration using Axios and Fetch
* Environment variables
* Deploying frontend and backend applications
* Connecting a deployed application to a cloud database
* Using Git and GitHub for version control

---

## 🔮 Future Improvements

* Password reset functionality
* Search and filter books
* Book sorting
* Pagination
* User profile management
* Email verification
* Book cover image uploads
* Improved analytics and charts
* Enhanced mobile responsiveness

---

## 👩‍💻 Author

**Kanak Ramteke**


