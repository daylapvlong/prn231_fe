import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlashcardDeck from "../../../components/quiz/QuizCard";
import axios from "axios";

const QuizDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get("courseId");

  const [flashcards, setFlashcards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (courseId) {
        try {
          setIsLoading(true);
          const response = await axios.get(
            "http://localhost:5037/api/Question/GetQuestionByCourse",
            {
              params: {
                courseID: courseId,
              },
            }
          );

          const formattedFlashcards = response.data.map((item) => {
            // Find the correct answer from the options array where isCorrect is true
            const correctAnswer = item.options.find(
              (option) => option.isCorrect
            )?.optionText;

            return {
              question: item.questionText,
              answer: correctAnswer || "No correct answer found", // Fallback if no correct answer exists
            };
          });

          setFlashcards(formattedFlashcards);
        } catch (error) {
          console.error("Error fetching questions:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchQuestions();
  }, [courseId]);

  return (
    <>
      <div className="z-10">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <p>Loading questions...</p>
          </div>
        ) : flashcards.length === 0 ? (
          <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <p>No questions available for this course.</p>
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <FlashcardDeck cards={flashcards} />
          </div>
        )}
      </div>
    </>
  );
};

export default QuizDetail;
