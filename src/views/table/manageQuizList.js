import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader, AlertCircle } from "lucide-react";
import { Image } from "react-bootstrap";

export default function QuizManagement() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = getUserId();
    if (userId) {
      setUserId(userId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchQuizzes();
    }
  }, [userId]);

  const getUserId = () => {
    // Retrieve the user data from localStorage
    const userDataString = localStorage.getItem("user");

    // If no user data is stored, return null or handle it appropriately
    if (!userDataString) {
      return null;
    }

    // Parse the JSON string to get the user data object
    const userData = JSON.parse(userDataString);

    // Clean up the user data by trimming whitespace and handling null values
    return userData.id;
  };

  const fetchQuizzes = async () => {
    try {
      const url = `http://localhost:5038/api/Course/GetMyManageCourse?userId=${userId}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch quizzes");
      }
      const data = await response.json();
      setQuizzes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizDetail = (id) => {
    navigate(`/quiz-detail?courseId=${id}`);
  };

  const handleUserDetail = (id) => {
    navigate(`/user-manage?courseId=${id}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-500">
        <AlertCircle className="w-12 h-12 mb-4" />
        <p className="text-xl font-semibold">Error: {error}</p>
        <button
          onClick={fetchQuizzes}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between">
        <h1 className="text-3xl font-bold mb-6">My Quizzes</h1>
        <button
          onClick={() => navigate("/create")} // Replace with your route
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
        >
          Create New Quiz
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative h-48">
              <img
                src={
                  `data:image/png;base64,${quiz.image?.trim()}` ||
                  "default-image.png"
                }
                alt={quiz.courseName}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{quiz.courseName}</h2>
              <p className="text-gray-600 mb-2">
                Category: {quiz.categoryName.trim()}
              </p>
              <p className="text-gray-600 mb-2">
                Created: {formatDate(quiz.createdAt)}
              </p>
              <p className="text-gray-600 mb-2">
                Total Joined: {quiz.totalJoined}
              </p>
              <p className="text-gray-600 mb-4">
                Price: {formatPrice(quiz.price)}
              </p>
              <div className="flex justify-between items-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    quiz.publish
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {quiz.publish ? "Published" : "Draft"}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUserDetail(quiz.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                  >
                    Manage Users
                  </button>
                  <button
                    onClick={() => handleQuizDetail(quiz.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
