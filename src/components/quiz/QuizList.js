import React from "react";
import PropTypes from "prop-types"; // Import PropTypes for validation
import "./Flashcard.css"; // Import minimal custom CSS for 3D flip

const Flashcard = ({ card }) => (
  <div className="w-[50rem] perspective-1000 cursor-pointer p-6 bg-white">
    <div className="flex flex-row h-full">
      <div className="flex-1 overflow-auto pr-4">
        <p className="text-2xl text-center mb-6">{card.question}</p>
        <ul className="text-xl text-left space-y-4 mb-6">
          {card.options.map((choice, index) => (
            <li key={index} className="flex gap-2">
              <span className="font-bold">{choice.label}.</span>
              <span>{choice.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-px h-full bg-gray-300 mx-4"></div>
      <div className="flex-1 flex items-center justify-center pl-4">
        <p className="text-2xl text-center">{card.answer}</p>
      </div>
    </div>
  </div>
);

const FlashcardList = ({ cards }) => {
  // Check if cards is defined and is an array
  if (!cards || !Array.isArray(cards)) {
    return <p>No flashcard data available.</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap justify-center my-4">
        <h1 className="text-2xl">Flashcard in this set ({cards.length})</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-2 bg-slate-100">
        {cards.map((card, index) => (
          <Flashcard key={index} card={card} />
        ))}
      </div>
    </div>
  );
};

export default FlashcardList;
