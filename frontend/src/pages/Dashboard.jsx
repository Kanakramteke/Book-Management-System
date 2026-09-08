
import { useEffect, useState } from "react";
import {
    BookOpen,
    Layers,
    Clock,
    Calendar,
    PieChart
} from "lucide-react";

import {
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

import "./Dashboard.css";

function Dashboard() {

    const [stats, setStats] = useState({
        totalBooks: 0,
        totalCategories: 0,
        recentlyAddedBooks: 0,
        latestPublishedYear: null
    });

    const [categoryStats, setCategoryStats] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // ==========================================
    // CATEGORY COLORS
    // ==========================================

    const CATEGORY_COLORS = [
        "#7C3AED", // Purple
        "#EC4899", // Pink
        "#3B82F6", // Blue
        "#10B981", // Green
        "#F59E0B", // Amber
        "#EF4444", // Red
        "#06B6D4", // Cyan
        "#8B5CF6", // Violet
        "#F97316", // Orange
        "#14B8A6"  // Teal
    ];


    // ==========================================
    // FETCH DASHBOARD DATA
    // ==========================================

    useEffect(() => {

        const fetchDashboardData = async () => {

            try {

                const token = localStorage.getItem("token");

                if (!token) {
                    setError("Please login again.");
                    return;
                }


                // Fetch dashboard statistics
                const statsResponse = await fetch(
                    "http://localhost:5000/api/books/stats",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );


                if (!statsResponse.ok) {
                    throw new Error(
                        "Failed to fetch dashboard statistics"
                    );
                }


                const statsData =
                    await statsResponse.json();


                // Fetch category statistics
                const categoryResponse = await fetch(
                    "http://localhost:5000/api/books/category-stats",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );


                if (!categoryResponse.ok) {
                    throw new Error(
                        "Failed to fetch category statistics"
                    );
                }


                const categoryData =
                    await categoryResponse.json();


                setStats(statsData);

                setCategoryStats(categoryData);


            } catch (error) {

                console.error(
                    "DASHBOARD ERROR:",
                    error
                );

                setError(error.message);

            } finally {

                setLoading(false);

            }
        };


        fetchDashboardData();

    }, []);


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (
            <div className="dashboard-loading">
                Loading dashboard...
            </div>
        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {

        return (
            <div className="dashboard-error">
                {error}
            </div>
        );

    }


    return (

        <div className="dashboard">

            {/* ======================================
                HEADER
            ====================================== */}

            <div className="dashboard-header">

                <div>

                    <h1>
                        Dashboard
                    </h1>

                    <p>
                        Here's an overview of your
                        book collection.
                    </p>

                </div>

            </div>


            {/* ======================================
                STAT CARDS
            ====================================== */}

            <div className="stats-grid">


                {/* TOTAL BOOKS */}

                <div className="stat-card">

                    <div className="stat-icon">
                        <BookOpen size={24} />
                    </div>

                    <div>

                        <p className="stat-label">
                            Total Books
                        </p>

                        <h2>
                            {stats.totalBooks}
                        </h2>

                    </div>

                </div>


                {/* TOTAL CATEGORIES */}

                <div className="stat-card">

                    <div className="stat-icon">
                        <Layers size={24} />
                    </div>

                    <div>

                        <p className="stat-label">
                            Total Categories
                        </p>

                        <h2>
                            {stats.totalCategories}
                        </h2>

                    </div>

                </div>


                {/* RECENTLY ADDED */}

                <div className="stat-card">

                    <div className="stat-icon">
                        <Clock size={24} />
                    </div>

                    <div>

                        <p className="stat-label">
                            Recently Added
                        </p>

                        <h2>
                            {stats.recentlyAddedBooks}
                        </h2>

                        <span className="stat-subtitle">
                            Last 7 days
                        </span>

                    </div>

                </div>


                {/* LATEST PUBLISHED */}

                <div className="stat-card">

                    <div className="stat-icon">
                        <Calendar size={24} />
                    </div>

                    <div>

                        <p className="stat-label">
                            Latest Published
                        </p>

                        <h2>
                            {stats.latestPublishedYear || "—"}
                        </h2>

                    </div>

                </div>


            </div>


            {/* ======================================
                CATEGORY CHART
            ====================================== */}

            <div className="dashboard-section">

                <div className="section-header">

                    <div>

                        <h2>
                            Category Distribution
                        </h2>

                        <p>
                            Books grouped by category
                        </p>

                    </div>

                    <PieChart size={22} />

                </div>


                {categoryStats.length === 0 ? (

                    <div className="empty-chart">

                        <BookOpen size={40} />

                        <p>
                            No books available yet.
                        </p>

                    </div>

                ) : (

                    <div className="chart-container">

                        <ResponsiveContainer
                            width="100%"
                            height={350}
                        >

                            <RechartsPieChart>

                                <Pie
                                    data={categoryStats}
                                    dataKey="count"
                                    nameKey="category"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={120}
                                    label
                                >

                                    {categoryStats.map(
                                        (entry, index) => (

                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    CATEGORY_COLORS[
                                                        index %
                                                        CATEGORY_COLORS.length
                                                    ]
                                                }
                                            />

                                        )
                                    )}

                                </Pie>


                                <Tooltip />


                                <Legend />

                            </RechartsPieChart>

                        </ResponsiveContainer>

                    </div>

                )}

            </div>

        </div>

    );
}

export default Dashboard;
