import React, { useState, useEffect } from "react";
import {
  Users,
  BookOpen,
  Award,
  DollarSign,
  BarChart2,
  PieChart,
  List,
  Settings,
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalQuizzes: 0,
    purchasedQuizzes: 0,
    totalRevenue: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoints
      const statsResponse = await fetch(
        "http://localhost:5038/api/Dashboard/Summary"
      );
      // const activitiesResponse = await fetch('http://localhost:5038/api/Admin/GetRecentActivities');

      if (!statsResponse.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const statsData = await statsResponse.json();
      // const activitiesData = await activitiesResponse.json();

      setStats(statsData);
      // setRecentActivities(activitiesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Users />}
          title="Total Users"
          value={stats.totalUsers}
        />
        <StatCard
          icon={<BookOpen />}
          title="Total Quizzes"
          value={stats.totalQuizzes}
        />
        <StatCard
          icon={<Award />}
          title="Total Purchased Quizzes"
          value={stats.purchasedQuizzes}
        />
        <StatCard
          icon={<DollarSign />}
          title="Total Revenue"
          value={new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(stats.totalRevenue)}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickActionButton
            icon={<Users />}
            label="Manage Users"
            onClick={() => {
              /* Handle click */
            }}
          />
          <QuickActionButton
            icon={<BookOpen />}
            label="Create Quiz"
            onClick={() => {
              /* Handle click */
            }}
          />
          <QuickActionButton
            icon={<BarChart2 />}
            label="View Reports"
            onClick={() => {
              /* Handle click */
            }}
          />
          <QuickActionButton
            icon={<Settings />}
            label="Settings"
            onClick={() => {
              /* Handle click */
            }}
          />
        </div>
      </div>

      {/* Recent Activities and Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <ul className="space-y-4">
            {/* {recentActivities.map((activity, index) => (
              <li key={index} className="flex items-center space-x-3">
                <span className="text-blue-500">
                  <List />
                </span>
                <span>{activity}</span>
              </li>
            ))} */}
          </ul>
        </div>

        {/* Charts */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
          <div className="space-y-4">
            <div className="h-48 bg-gray-200 rounded flex items-center justify-center">
              <BarChart2 className="w-12 h-12 text-gray-400" />
              <span className="ml-2 text-gray-500">Bar Chart Placeholder</span>
            </div>
            <div className="h-48 bg-gray-200 rounded flex items-center justify-center">
              <PieChart className="w-12 h-12 text-gray-400" />
              <span className="ml-2 text-gray-500">Pie Chart Placeholder</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
      <div className="mr-4 text-blue-500">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function QuickActionButton({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-300"
    >
      <span className="text-blue-500 mb-2">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
