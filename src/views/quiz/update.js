"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import QuizImportModal from "../../components/quiz/QuizImportModal";

export default function UpdateQuestions() {
  const [questions, setQuestions] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get("courseId");

  useEffect(() => {
    fetchQuestions();
  }, [courseId]);

  const fetchQuestions = async () => {
    if (courseId) {
      try {
        const response = await axios.get(
          `http://localhost:5038/api/Question/GetQuestionByCourse`,
          {
            params: {
              courseID: courseId,
            },
          }
        );
        const data = response.data;

        const transformedData = data.map((q) => ({
          ...q,
          type:
            q.options.filter((o) => o.isCorrect).length > 1
              ? "multiple"
              : "one",
          options: q.options.map((o) => ({ ...o, isCorrect: o.isCorrect })),
        }));

        setQuestions(transformedData);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setNotification({
          type: "error",
          message: "Failed to fetch questions. Please try again.",
        });
      }
    }
  };

  const handleQuestionTextChange = (id, value) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, questionText: value } : q))
    );
  };

  const handleTypeChange = (id, type) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === id) {
          const updatedOptions = q.options.map((o) => ({
            ...o,
            isCorrect: type === "one" ? false : o.isCorrect,
          }));
          if (type === "one") {
            const trueIndex = updatedOptions.findIndex((o) => o.isCorrect);
            if (trueIndex !== -1) {
              updatedOptions[trueIndex].isCorrect = true;
            }
          }
          return { ...q, type, options: updatedOptions };
        }
        return q;
      })
    );
  };

  const handleOptionChange = (questionId, optionId, value) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            options: q.options.map((o) =>
              o.id === optionId ? { ...o, optionText: value } : o
            ),
          };
        }
        return q;
      })
    );
  };

  const toggleCorrectAnswer = (questionId, optionId) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          if (q.type === "one") {
            return {
              ...q,
              options: q.options.map((o) => ({
                ...o,
                isCorrect: o.id === optionId,
              })),
            };
          } else {
            return {
              ...q,
              options: q.options.map((o) =>
                o.id === optionId ? { ...o, isCorrect: !o.isCorrect } : o
              ),
            };
          }
        }
        return q;
      })
    );
  };

  const addOption = (questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => {
        if (q.id === questionId && q.options.length < 5) {
          return {
            ...q,
            options: [
              ...q.options,
              { id: q.options.length + 1, optionText: "", isCorrect: false },
            ],
          };
        }
        return q;
      })
    );
  };

  const deleteOption = (questionId, optionId) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            options: q.options.filter((o) => o.id !== optionId),
          };
        }
        return q;
      })
    );
  };

  const deleteQuestion = async (questionId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5038/api/Question/DeleteQuestion?questionId=${questionId}`
      );

      fetchQuestions();

      setNotification({
        type: "success",
        message: "Question deleted successfully!",
      });
    } catch (error) {
      console.error("Error delete questions:", error);
      setNotification({
        type: "error",
        message: "Failed to delete questions. Please try again.",
      });
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedQuestions = questions.map((q) => ({
        id: q.id,
        questionText: q.questionText,
        options: q.options.map((o) => ({
          id: o.id,
          optionText: o.optionText,
          isCorrect: o.isCorrect,
        })),
      }));

      const updatePromises = updatedQuestions.map((question) =>
        axios.post("http://localhost:5038/api/question/update", question, {
          params: {
            id: question.id,
          },
        })
      );

      await Promise.all(updatePromises);

      setNotification({
        type: "success",
        message: "Questions updated successfully!",
      });
    } catch (error) {
      setNotification({
        type: "error",
        message: "Failed to update questions. Please try again.",
      });
    }
  };

  const addNewQuestion = async () => {
    try {
      const newQuestion = {
        questionText: "New question text",
        options: [
          { optionText: "Option 1", isCorrect: true },
          { optionText: "Option 2", isCorrect: false },
        ],
      };

      // Make API request to create a new question
      const response = await axios.post(
        `http://localhost:5038/api/Question/CreateQuestion?courseId=${courseId}`,
        newQuestion
      );

      // Check if response status is 200 (OK)
      if (response.status === 200) {
        // Since response.data is null, simulate adding a new question locally
        const createdQuestion = {
          questionText: newQuestion.questionText,
          options: newQuestion.options,
          type: "one", // Default type as single correct answer
        };

        setQuestions((prevQuestions) => [
          ...prevQuestions,
          createdQuestion, // Add the new question to the state
        ]);

        setNotification({
          type: "success",
          message: "New question added successfully!",
        });

        window.location.reload();
      } else {
        throw new Error("Failed to create new question.");
      }
    } catch (error) {
      console.error("Error adding new question:", error);
      setNotification({
        type: "error",
        message: "Failed to add new question. Please try again.",
      });
    }
  };

  const handleImportQuiz = () => {
    setSelectedCourseId(courseId);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {notification && (
        <div
          className={`mb-4 p-4 rounded-md ${
            notification.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Update Questions</h1>
        <button
          onClick={() => handleImportQuiz()}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
        >
          Import Questions
        </button>
      </div>

      {questions.map((question) => (
        <div
          key={question.id}
          className="mb-8 p-6 bg-white shadow-lg rounded-lg"
        >
          <div className="mb-6">
            <label
              htmlFor={`questionText-${question.id}`}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Question Text
            </label>
            <textarea
              id={`questionText-${question.id}`}
              value={question.questionText}
              onChange={(e) =>
                handleQuestionTextChange(question.id, e.target.value)
              }
              rows={3}
              className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your question here..."
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor={`questionType-${question.id}`}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Question Type
            </label>
            <select
              id={`questionType-${question.id}`}
              value={question.type}
              onChange={(e) => handleTypeChange(question.id, e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="one">Single Correct Answer</option>
              <option value="multiple">Multiple Correct Answers</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Options
            </label>
            {question.options.map((option, index) => (
              <div key={option.id} className="flex items-center mb-2">
                <button
                  type="button"
                  onClick={() => toggleCorrectAnswer(question.id, option.id)}
                  className={`mr-2 px-3 py-1 text-sm font-medium rounded-md ${
                    option.isCorrect
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {option.isCorrect ? "Correct" : "Incorrect"}
                </button>
                <input
                  type="text"
                  value={option.optionText}
                  onChange={(e) =>
                    handleOptionChange(question.id, option.id, e.target.value)
                  }
                  className="flex-grow mt-1 block w-full sm:text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={`Enter option ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => deleteOption(question.id, option.id)}
                  className="ml-2 p-1 rounded-full text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <div>
            <button
              type="button"
              onClick={() => addOption(question.id)}
              disabled={question.options.length >= 5}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5 mr-2" /> Add Option
            </button>
            <button
              type="button"
              onClick={() => deleteQuestion(question.id)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5 mr-2" /> Delete Question
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addNewQuestion}
        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Plus className="w-5 h-5 mr-2" /> Add New Question
      </button>

      <button
        type="button"
        onClick={handleUpdate}
        className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Save
      </button>

      <QuizImportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        courseId={selectedCourseId}
      />
    </div>
  );
}
