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
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalQuizzes: 0,
    purchasedQuizzes: 0,
    totalRevenue: 0,
    userPerMonth: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility

  useEffect(() => {
    // Fetch bills from the API
    fetch("http://localhost:5038/api/Bill/GetAllBill")
      .then((response) => response.json())
      .then((data) => {
        // Limit to the first 5 bills
        setBills(data.slice(0, 5));
      })
      .catch((error) => console.error("Error fetching bills:", error));
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const statsResponse = await fetch(
        "http://localhost:5038/api/Dashboard/Summary"
      );

      if (!statsResponse.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const statsData = await statsResponse.json();
      setStats(statsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: stats.userPerMonth.map(
      (item) => `${item.year}-${item.month.toString().padStart(2, "0")}`
    ),
    datasets: [
      {
        label: "Number of Registrations",
        data: stats.userPerMonth.map((item) => item.numberOfRegister),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "User Registrations per Month",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Registrations",
        },
      },
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
    },
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

  const handleModalOpen = (bill) => {
    setSelectedBill(bill);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBill(null);
  };

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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
          <h2 className="text-xl font-semibold">User Registrations</h2>
          <div className="h-96 flex-1">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
          <h2 className="text-xl font-semibold">Recent Activities</h2>
          <div className="h-96 flex-1 overflow-y-auto">
            {bills.length > 0 ? (
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 text-left">Bill ID</th>
                    <th className="py-2 px-4 text-left">Total Payment</th>
                    <th className="py-2 px-4 text-left">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {bills.map((bill) => (
                    <tr key={bill.id} className="border-b">
                      <td className="py-2 px-4">{bill.id}</td>
                      <td className="py-2 px-4">${bill.totalPayment}</td>
                      <td className="py-2 px-4">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleModalOpen(bill)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No recent activities to display.</p>
            )}
          </div>

          {/* Modal for Bill Details */}
          {isModalOpen && selectedBill && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold mb-4">
                  Bill Details - ID: {selectedBill.id}
                </h2>
                <p>
                  <strong>Total Payment:</strong>{" "}
                  {selectedBill.totalPayment.toLocaleString()} VND
                </p>
                <h3 className="mt-4 text-xl font-semibold">Course Details:</h3>
                <table className="min-w-full table-auto mt-2">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 text-left">Course Name</th>
                      <th className="py-2 px-4 text-left">Price (VND)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedBill.billDetail.map((detail, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-4">{detail.courseName}</td>
                        <td className="py-2 px-4">
                          {detail.price.toLocaleString()} VND
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 flex justify-end">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    onClick={handleModalClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
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
