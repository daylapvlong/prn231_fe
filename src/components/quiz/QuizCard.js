import React, { useState } from "react";
import "./Flashcard.css"; // Import minimal custom CSS for 3D flip

const Flashcard = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="w-96 h-72 perspective-1000 cursor-pointer"
      onClick={handleClick}
    >
      <div
        className={`relative w-full h-full transition-transform duration-600 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        <div className="absolute w-full h-full backface-hidden bg-white flex items-center justify-center p-10 rounded-lg shadow-2xl">
          <p className="text-3xl text-center">{question}</p>
        </div>
        <div className="absolute w-full h-full backface-hidden bg-white flex items-center justify-center p-10 rounded-lg shadow-md rotate-y-180">
          <p className="text-3xl text-center">{answer}</p>
        </div>
      </div>
    </div>
  );
};

const FlashcardDeck = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < cards.length - 1 ? prev + 1 : prev));
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <Flashcard {...cards[currentIndex]} />
      <div className="flex items-center space-x-4">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            currentIndex === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <span className="text-lg">
          Card {currentIndex + 1} of {cards.length}
        </span>

        <button
          onClick={handleNext}
          disabled={currentIndex === cards.length - 1}
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            currentIndex === cards.length - 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FlashcardDeck;
