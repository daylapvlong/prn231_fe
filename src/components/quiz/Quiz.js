import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get("courseId");

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (courseId) {
        try {
          setIsLoading(true);
          const response = await axios.get(
            "http://localhost:5038/api/Question/GetQuestionByCourse",
            {
              params: {
                courseID: courseId,
              },
            }
          );
          setQuestions(response.data);
          setAnsweredQuestions(new Array(response.data.length).fill(false));
          setSelectedAnswers(new Array(response.data.length).fill(null));
        } catch (error) {
          console.error("Error fetching questions:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchQuestions();
  }, [courseId]);

  const handleSubmit = () => {
    setShowScore(true);
  };

  const handleAnswerOptionClick = (answerOption, index) => {
    setSelectedAnswers((prev) => {
      const newSelectedAnswers = [...prev];
      newSelectedAnswers[currentQuestion] = index;
      return newSelectedAnswers;
    });

    setAnsweredQuestions((prev) => {
      const newAnswered = [...prev];
      newAnswered[currentQuestion] = true;
      return newAnswered;
    });

    if (answerOption.isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      }
    }, 500);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
    setAnsweredQuestions(new Array(questions.length).fill(false));
    setSelectedAnswers(new Array(questions.length).fill(null));
  };

  const goToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const handleGoBack = () => {
    navigate("/home");
  };

  const allQuestionsAnswered = answeredQuestions.every(Boolean);
  const completedQuestionsCount = answeredQuestions.filter(Boolean).length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">No Questions Available</h2>
          <p className="text-gray-600 mb-6">
            There are currently no questions available for this course.
          </p>
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="h-[calc(100vh-100px)] w-full md:w-1/4 p-4 bg-white shadow-md">
        <h2 className="text-xl font-bold mb-4">All Questions</h2>
        <div className="overflow-y-auto p-2 mb-4">
          <div className="space-y-2">
            {questions.map((question, index) => (
              <button
                key={index}
                onClick={() => goToQuestion(index)}
                className={`w-full p-2 text-left rounded-lg transition duration-300 ${
                  answeredQuestions[index]
                    ? "bg-green-200 hover:bg-green-300"
                    : "bg-gray-200 hover:bg-gray-300"
                } ${currentQuestion === index ? "ring-2 ring-blue-500" : ""}`}
              >
                Question {index + 1}
                {answeredQuestions[index] && (
                  <span className="ml-2 text-green-600">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!allQuestionsAnswered}
          className={`w-full py-2 px-4 rounded-lg transition duration-300 ${
            allQuestionsAnswered
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Submit Quiz
        </button>
      </div>

      {showScore ? (
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-center">
                Quiz Completed!
              </h2>
              <p className="text-xl mb-6 text-center">
                You scored {score} out of {questions.length}
              </p>
              <div className="space-y-6">
                {questions.map((question, questionIndex) => (
                  <div
                    key={questionIndex}
                    className="border-b pb-4 last:border-b-0"
                  >
                    <h3 className="text-lg font-medium mb-2">
                      Question {questionIndex + 1}: {question.questionText}
                    </h3>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => {
                        const isSelected =
                          selectedAnswers[questionIndex] === optionIndex;
                        const isCorrect = option.isCorrect;
                        const isWrongAnswer = isSelected && !isCorrect;

                        return (
                          <div
                            key={optionIndex}
                            className={`p-2 rounded-lg ${
                              isCorrect
                                ? "bg-green-100 border-green-500"
                                : isWrongAnswer
                                ? "bg-red-100 border-red-500"
                                : "bg-gray-100"
                            } ${isSelected || isCorrect ? "border-2" : ""}`}
                          >
                            <p className={isCorrect ? "font-semibold" : ""}>
                              {option.optionText}
                            </p>
                            {isCorrect && (
                              <span className="text-green-600 text-sm">
                                Correct Answer
                              </span>
                            )}
                            {isWrongAnswer && (
                              <span className="text-red-600 text-sm">
                                Your Answer (Incorrect)
                              </span>
                            )}
                            {isSelected && isCorrect && (
                              <span className="text-green-600 text-sm">
                                Your Answer (Correct)
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button
                  onClick={restartQuiz}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                >
                  Restart Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="h-[calc(100vh-100px)] flex-1 p-6 overflow-y-auto">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">
                  Question {currentQuestion + 1}/{questions.length}
                </h2>
                <div className="mt-2 h-2 w-full bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{
                      width: `${
                        (completedQuestionsCount / questions.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
              <h3 className="text-lg font-medium mb-4">
                {questions[currentQuestion]?.questionText}
              </h3>
              <div className="space-y-2">
                {questions[currentQuestion]?.options.map(
                  (answerOption, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleAnswerOptionClick(answerOption, index)
                      }
                      className={`w-full p-3 text-left rounded-lg transition duration-300 ${
                        selectedAnswers[currentQuestion] === index
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {answerOption.optionText}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
