"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, ImageIcon, X } from "lucide-react";

const QuestionForm = ({ question, onUpdate, onDelete, error }) => {
  const addOption = () => {
    onUpdate({
      ...question,
      options: [...question.options, ""],
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...question.options];
    newOptions[index] = value;
    onUpdate({
      ...question,
      options: newOptions,
    });
  };

  const deleteOption = (index) => {
    const newOptions = question.options.filter((_, i) => i !== index);
    const newCorrectAnswers = question.correctAnswers
      .filter((i) => i !== index)
      .map((i) => (i > index ? i - 1 : i));
    onUpdate({
      ...question,
      options: newOptions,
      correctAnswers: newCorrectAnswers,
    });
  };

  const toggleCorrectAnswer = (index) => {
    let newCorrectAnswers;
    if (question.type === "one") {
      newCorrectAnswers = [index];
    } else {
      newCorrectAnswers = question.correctAnswers.includes(index)
        ? question.correctAnswers.filter((i) => i !== index)
        : [...question.correctAnswers, index];
    }
    onUpdate({
      ...question,
      correctAnswers: newCorrectAnswers,
    });
  };

  const handleTypeChange = (newType) => {
    let newCorrectAnswers = question.correctAnswers;
    if (newType === "one" && newCorrectAnswers.length > 1) {
      newCorrectAnswers = [newCorrectAnswers[0]];
    }
    onUpdate({
      ...question,
      type: newType,
      correctAnswers: newCorrectAnswers,
    });
  };

  return (
    <div className="mb-8 p-6 bg-white shadow-lg rounded-lg">
      <div className="mb-6">
        <label
          htmlFor={`questionTitle-${question.id}`}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Question Title
        </label>
        <div className="border rounded-md">
          <textarea
            id={`questionTitle-${question.id}`}
            value={question.title}
            onChange={(e) => onUpdate({ ...question, title: e.target.value })}
            rows={3}
            className="w-full p-2 border-none focus:ring-0"
            placeholder="Enter your question here..."
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Options
        </label>
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <button
              className={`px-2 py-1 text-sm font-medium rounded-md mr-2 ${
                question.correctAnswers.includes(index)
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => toggleCorrectAnswer(index)}
            >
              Option {index + 1}
            </button>
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className={`flex-grow p-2 border rounded-md ${
                question.correctAnswers.includes(index) ? "bg-green-100" : ""
              }`}
              placeholder={`Enter option ${index + 1}`}
            />
            <button
              onClick={() => deleteOption(index)}
              className="ml-2 text-red-600 hover:text-red-800"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor={`type-${question.id}`}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Type
          </label>
          <select
            id={`type-${question.id}`}
            value={question.type}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="multiple">Multiple</option>
            <option value="one">One</option>
          </select>
        </div>
        <div>
          <label
            htmlFor={`type-${question.id}`}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Add new option
          </label>
          {question.options.length < 5 && (
            <button
              onClick={addOption}
              className="w-full p-2 text-sm text-gray-600 border border-dashed rounded-md hover:bg-gray-50"
            >
              Add new option
            </button>
          )}
        </div>
      </div>

      <button
        onClick={onDelete}
        className="text-red-600 hover:text-red-800 flex items-center"
      >
        <Trash2 className="w-4 h-4 mr-1" /> Delete Question
      </button>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default function CreateCourses() {
  const [courseName, setCourseName] = useState("");
  const [courseImage, setCourseImage] = useState(null);
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "",
      explanation: "",
      options: ["", "", ""],
      correctAnswers: [],
      type: "multiple",
      domain: "option1",
    },
  ]);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // Fetch categories when the component is mounted
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:5037/api/Category/GetAllCategory"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data); // Set categories to the state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setCourseImage(file);
    }
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        setCourseImage(file);
      }
    },
    []
  );

  const removeImage = useCallback(() => {
    setCourseImage(null);
  }, []);

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      title: "",
      explanation: "",
      options: ["", "", ""],
      correctAnswers: [],
      type: "multiple",
      domain: "option1",
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (updatedQuestion) => {
    setQuestions(
      questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!courseName.trim()) {
      newErrors.courseName = "Course name is required";
    }

    if (!courseImage) {
      newErrors.courseImage = "Course image is required";
    }

    questions.forEach((question, index) => {
      if (!question.title.trim()) {
        newErrors[`question_${index}`] = "Question title is required";
      }

      if (question.options.filter((option) => option.trim()).length < 2) {
        newErrors[`question_${index}`] = "At least two options are required";
      }

      if (question.correctAnswers.length === 0) {
        newErrors[`question_${index}`] =
          "At least one correct answer is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    if (!validateForm()) {
      setNotification({
        type: "error",
        message: "Please check the form for errors and try again.",
      });
      return;
    }

    const courseData = {
      courseName: courseName,
      publish: true,
      totalJoined: 0,
      createdBy: 0,
      createdAt: new Date().toISOString(),
      image: courseImage ? await getBase64(courseImage) : "",
      category: selectedCategory,
    };

    const questionsData = questions.map((q) => ({
      questionText: q.title,
      options: q.options.map((optionText, index) => ({
        optionText,
        isTrue: q.correctAnswers.includes(index),
      })),
    }));

    const requestBody = {
      course: courseData,
      questions: questionsData,
    };

    try {
      const response = await fetch(
        "http://localhost:5037/api/Course/CreateCourse",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create course");
      }

      const result = await response.json();
      console.log("Course created successfully:", result);
      setNotification({
        type: "success",
        message: "Course created successfully!",
      });
      // You might want to reset the form or redirect the user here
    } catch (error) {
      console.error("Error creating course:", error);
      setNotification({
        type: "error",
        message: "Failed to create course. Please try again.",
      });
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Course Creator</h1>
        <div className="space-x-2">
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Create
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-1 gap-4">
        <div>
          <label
            htmlFor="courseName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Course Name
          </label>
          <input
            type="text"
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className={`w-full p-2 border rounded-md ${
              errors.courseName ? "border-red-500" : ""
            }`}
            placeholder="Enter course name"
          />
          {errors.courseName && (
            <p className="text-red-500 text-sm mt-1">{errors.courseName}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Course Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`w-full p-2 border rounded-md ${
              errors.category ? "border-red-500" : ""
            }`}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.categoryName.trim()}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="courseImage"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Course Image
          </label>
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer hover:border-gray-400 transition-colors relative ${
              errors.courseImage ? "border-red-500" : "border-gray-300"
            }`}
          >
            <input
              type="file"
              id="courseImage"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <label htmlFor="courseImage" className="cursor-pointer">
              {courseImage ? (
                <div className="flex items-center justify-center">
                  <img
                    src={URL.createObjectURL(courseImage)}
                    alt="Course preview"
                    className="max-h-32 max-w-full"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeImage();
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    aria-label="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    Drag and drop an image here, or click to select a file
                  </p>
                </div>
              )}
            </label>
          </div>
          {errors.courseImage && (
            <p className="text-red-500 text-sm mt-1">{errors.courseImage}</p>
          )}
        </div>
      </div>

      {questions.map((question, index) => (
        <QuestionForm
          key={question.id}
          question={question}
          onUpdate={updateQuestion}
          onDelete={() => deleteQuestion(question.id)}
          error={errors[`question_${index}`]}
        />
      ))}
      <button
        onClick={addQuestion}
        className="w-full p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center"
      >
        <Plus className="w-5 h-5 mr-2" /> Add New Question
      </button>
    </div>
  );
}
