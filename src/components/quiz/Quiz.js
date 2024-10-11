import React, { useState, useEffect } from "react";
import questions from "./QuestionBank";

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // Function to shuffle an array
  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  // Function to shuffle the questions and their answer options
  function shuffleQuestions(questions) {
    // Shuffle the answerOptions for each question
    const shuffledQuestions = questions.map((question) => {
      return {
        ...question,
        answerOptions: shuffleArray([...question.answerOptions]), // Copy answerOptions array
      };
    });

    // Shuffle the order of the questions
    return shuffleArray(shuffledQuestions); // Return a new shuffled array
  }

  // Initialize shuffled questions when the component loads
  useEffect(() => {
    setShuffledQuestions(shuffleQuestions(questions));
  }, []);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < shuffledQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
    setShuffledQuestions(shuffleQuestions(questions)); // Shuffle the questions and update the state
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md">
        {showScore ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
            <p className="text-xl mb-4">
              You scored {score} out of {questions.length}
            </p>
            <button
              onClick={restartQuiz}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">
                Question {currentQuestion + 1}/{questions.length}
              </h2>
              <div className="mt-2 h-2 w-full bg-gray-200 rounded-full">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{
                    width: `${
                      ((currentQuestion + 1) / questions.length) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <h3 className="text-lg font-medium mb-4">
              {questions[currentQuestion].questionText}
            </h3>
            <div className="space-y-2">
              {questions[currentQuestion].answerOptions.map(
                (answerOption, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleAnswerOptionClick(answerOption.isCorrect)
                    }
                    className="w-full p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300"
                  >
                    {answerOption.answerText}
                  </button>
                )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
