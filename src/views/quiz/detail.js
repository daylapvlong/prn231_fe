import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlashcardDeck from "../../components/quiz/QuizCard";
import FlashcardList from "../../components/quiz/QuizList";
import { useAuth } from "../../components/auth/index";
import {
  Users,
  Star,
  Play,
  RotateCcw,
  Eye,
  EyeClosed,
  X,
  Pen,
} from "lucide-react";
import axios from "axios";

const QuizDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get("courseId");

  const [flashcards, setFlashcards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [hiddenChoices, setHiddenChoices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [quizTime, setQuizTime] = useState(30);
  const [questionCount, setQuestionCount] = useState(10);
  const [error, setError] = useState("");
  const { userRole } = useAuth();

  // Shuffle function using Fisher-Yates algorithm
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Function to handle shuffle button click
  const handleShuffle = () => {
    const shuffledFlashcards = shuffleArray([...flashcards]); // Make a copy of flashcards before shuffling
    setFlashcards(shuffledFlashcards);
  };
  const handleStartQuiz = () => {
    setShowModal(true);
    setQuestionCount(Math.min(10, flashcards.length)); // Set initial question count
    setError("");
  };

  const handleStartQuizSubmit = (e) => {
    e.preventDefault();
    if (questionCount > flashcards.length) {
      setError(`Maximum number of questions is ${flashcards.length}`);
      return;
    }
    setShowModal(false);
    navigate(
      `/quiz?courseId=${courseId}&time=${quizTime}&count=${questionCount}`
    );
  };

  const handleUpdateQuiz = () => {
    navigate(`/update?courseId=${courseId}`);
  };

  const toggleHideChoices = () => {
    setHiddenChoices(!hiddenChoices); // Toggle the hideAll state
  };

  useEffect(() => {
    const fetchQuestions = async (courseId) => {
      try {
        const response = await axios.get(
          "http://localhost:5038/api/Question/GetQuestionByCourse",
          {
            params: { courseID: courseId },
          }
        );

        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        const formattedFlashcards = response.data.map((item) => {
          const correctAnswer = item.options.find(
            (option) => option.isCorrect
          )?.optionText;

          const choices = item.options.map((option, index) => ({
            label: alphabet[index], // Assign labels like "A", "B", "C", etc.
            text: option.optionText, // Use the original option text
          }));
          return {
            question: item.questionText,
            options: choices,
            answer: correctAnswer || "No correct answer found", // Fallback if no correct answer exists
          };
        });

        // Shuffle the flashcards before setting the state
        const shuffledFlashcards = shuffleArray(formattedFlashcards);
        setFlashcards(shuffledFlashcards);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    const fetchCourse = async (courseId) => {
      try {
        const response = await axios.get(
          "http://localhost:5038/api/Course/GetCourseByID",
          {
            params: { id: courseId },
          }
        );
        setCourseName(response.data.courseName || "Unknown Course");
      } catch (error) {
        console.error("Error fetching course:", error); // Updated error message
      }
    };

    const fetchData = async () => {
      if (courseId) {
        setIsLoading(true);
        try {
          // Fetch questions and course data concurrently
          await Promise.all([fetchQuestions(courseId), fetchCourse(courseId)]);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false); // Set loading to false after both are completed
        }
      }
    };

    fetchData();
  }, [courseId]);

  return (
    <>
      <div className="z-10">
        <div className="min-h-screen py-6 px-60 bg-gray-100 text-gray-800">
          <header className="mb-6">
            <h1 className="text-3xl font-bold mb-2 text-blue-600">
              {courseName}
            </h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span>26 người học gần đây</span>
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 mr-2" />
                <span>Cho điểm đánh giá đầu tiên</span>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { icon: Play, text: "Take quiz" },
              { icon: RotateCcw, text: "Shuffle cards" },
              {
                icon: hiddenChoices ? Eye : EyeClosed,
                text: hiddenChoices ? "Show All Options" : "Hide All Options",
              },
              ...(userRole === "1" ? [{ icon: Pen, text: "Update" }] : []),
            ].map((item, index) => (
              <button
                key={index}
                className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center justify-center transition-colors hover:bg-blue-50"
                onClick={() => {
                  if (index === 0) {
                    handleStartQuiz();
                  }
                  if (index === 1) {
                    handleShuffle();
                  }
                  if (index === 2) {
                    toggleHideChoices();
                  }
                  if (index === 3) {
                    handleUpdateQuiz();
                  }
                }}
              >
                <item.icon className="w-8 h-8 mb-2 text-blue-500" />
                <span className="text-gray-700">{item.text}</span>
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center bg-gray-100">
              <p>Loading questions...</p>
            </div>
          ) : flashcards.length === 0 ? (
            <div className="flex justify-center items-center bg-gray-100">
              <p>No questions available for this course.</p>
            </div>
          ) : (
            <div className="flex justify-center items-center mt-4 bg-gray-100">
              <FlashcardDeck
                cards={flashcards}
                isOptionHidden={hiddenChoices}
              />
            </div>
          )}

          <div className="mt-8">
            <FlashcardList cards={flashcards}></FlashcardList>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Start Quiz</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleStartQuizSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="quizTime"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Quiz Time (minutes)
                </label>
                <input
                  type="number"
                  id="quizTime"
                  value={quizTime}
                  onChange={(e) => setQuizTime(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="questionCount"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Number of Questions (max: {flashcards.length})
                </label>
                <input
                  type="number"
                  id="questionCount"
                  value={questionCount}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setQuestionCount(value);
                    if (value > flashcards.length) {
                      setError(
                        `Maximum number of questions is ${flashcards.length}`
                      );
                    } else {
                      setError("");
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                  max={flashcards.length}
                  required
                />
              </div>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={!!error}
              >
                Start Quiz
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizDetail;
