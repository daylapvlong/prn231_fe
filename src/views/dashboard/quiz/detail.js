import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlashcardDeck from "../../../components/quiz/QuizCard";
import { Users, Star, BookOpen, Play, RotateCcw, Settings } from "lucide-react";
import axios from "axios";

const QuizDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get("courseId");

  const [flashcards, setFlashcards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [courseName, setCourseName] = useState("");

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
    navigate(`/quiz?courseId=${courseId}`);
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

        const formattedFlashcards = response.data.map((item) => {
          const correctAnswer = item.options.find(
            (option) => option.isCorrect
          )?.optionText;

          return {
            question: item.questionText,
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
              { icon: BookOpen, text: "Thẻ ghi nhớ" },
              { icon: Play, text: "Take quiz" },
              { icon: RotateCcw, text: "Shuffle cards" },
              { icon: Settings, text: "Ghép thẻ" },
            ].map((item, index) => (
              <button
                key={index}
                className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center justify-center transition-colors hover:bg-blue-50"
                onClick={() => {
                  if (index === 1) {
                    handleStartQuiz();
                  }
                  if (index === 2) {
                    handleShuffle();
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
              <FlashcardDeck cards={flashcards} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QuizDetail;
