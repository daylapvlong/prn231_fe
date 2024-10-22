import React, { useState, useEffect, useMemo } from "react";
import axios from "axios"; // Import Axios

export default function BrowseCourses() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch courses based on the search term
  const fetchCoursesByName = async (name) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:5037/api/Course/GetCourseByNameBrowse?name=${encodeURIComponent(
          name
        )}`
      );
      setCourses(response.data); // Assuming the response is a JSON array
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch all courses when the component mounts
  useEffect(() => {
    const fetchAllCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "http://localhost:5037/api/Course/GetAllCourseBrowse"
        );
        setCourses(response.data); // Assuming the response is a JSON array
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCourses();
  }, []);

  const categories = useMemo(() => {
    const allCategories = courses
      .map((course) => course.categoryName?.trim())
      .filter(Boolean); // Use optional chaining and filter out undefined
    return ["All", ...new Set(allCategories)];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter(
      (course) =>
        (selectedCategory === "All" ||
          course.categoryName?.trim() === selectedCategory) &&
        (course.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.image?.toLowerCase().includes(searchTerm.toLowerCase())) // Use optional chaining
    );
  }, [searchTerm, selectedCategory, courses]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Browse Courses
      </h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            } transition duration-300 ease-in-out`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            <div className="p-6 flex-grow">
              <img
                src={course.image?.trim() || "default-image.png"}
                alt={course.courseName}
                className="mb-4"
              />{" "}
              {/* Default image if null */}
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {course.courseName || "No Title Available."}{" "}
                {/* Fallback title */}
              </h2>
              <p className="text-gray-600 mb-4">
                {course.description || "No description available."}
              </p>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                {course.categoryName?.trim() || "Uncategorized"}{" "}
                {/* Fallback category */}
              </span>
            </div>
            <div className="px-6 pb-4">
              <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                onClick={() =>
                  console.log(`Starting course: ${course.courseName}`)
                }
              >
                Start Course
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <p className="text-center text-gray-600 mt-6">
          No courses found. Try adjusting your search or category filter.
        </p>
      )}
    </div>
  );
}
