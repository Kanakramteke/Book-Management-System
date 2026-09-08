import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import AddBook from "./pages/AddBook";
import Settings from "./pages/Settings";

import "./App.css";

function AppLayout({ children, theme, setTheme }) {
    return (
        <div className={`app-shell ${theme}-theme`}>

            <Sidebar />

            <div className="main-area">

                <Navbar />

                <main className="page-content">
                    {children}
                </main>

            </div>

        </div>
    );
}

function ProtectedLayout({ children, theme, setTheme }) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <AppLayout
            theme={theme}
            setTheme={setTheme}
        >
            {children}
        </AppLayout>
    );
}

function App() {

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        localStorage.setItem("theme", theme);

        document.documentElement.setAttribute(
            "data-theme",
            theme
        );
    }, [theme]);

    return (
        <BrowserRouter>
            <Routes>

                {/* Authentication pages */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* Dashboard */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedLayout
                            theme={theme}
                            setTheme={setTheme}
                        >
                            <Dashboard />
                        </ProtectedLayout>
                    }
                />

                {/* Books */}

                <Route
                    path="/books"
                    element={
                        <ProtectedLayout
                            theme={theme}
                            setTheme={setTheme}
                        >
                            <Books />
                        </ProtectedLayout>
                    }
                />

                {/* Book Details */}

                <Route
                    path="/books/:id"
                    element={
                        <ProtectedLayout
                            theme={theme}
                            setTheme={setTheme}
                        >
                            <BookDetails />
                        </ProtectedLayout>
                    }
                />

                {/* Add Book */}

                <Route
                    path="/add-book"
                    element={
                        <ProtectedLayout
                            theme={theme}
                            setTheme={setTheme}
                        >
                            <AddBook />
                        </ProtectedLayout>
                    }
                />

                {/* Settings */}

                <Route
                    path="/settings"
                    element={
                        <ProtectedLayout
                            theme={theme}
                            setTheme={setTheme}
                        >
                            <Settings
                                theme={theme}
                                setTheme={setTheme}
                            />
                        </ProtectedLayout>
                    }
                />

                {/* Default */}

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;