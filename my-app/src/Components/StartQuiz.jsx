import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundMusic from '../assets/bg.mp3'; 

const StartQuiz = () => {
  const navigate = useNavigate();

  const nextPage = () => {
    navigate('/quiz');
  };

  // Create an audio object and set it to loop
  const music = new Audio(backgroundMusic);
  music.loop = true;
  music.play();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-500"> {/* Blue background */}
      <div className="bg-white p-10 rounded-lg shadow-md text-center rotate-6"> {/* White card with padding and shadow */}
        <div className="flex items-center justify-center mb-4"> {/* Container for the question mark and icon */}
          <span className="text-4xl text-gray-600 mr-2">?</span> {/* Question mark */}
          <div className="rounded-full w-full h-12 flex flex-col items-center justify-center"> {/* Gray circle */}
            <span className='text-6xl font-bold text-blue-600'>QUIZ</span>
          </div>
        </div>
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-3 px-8 rounded-lg" 
          onClick={nextPage}
        >
          START
        </button>
      </div>
    </div>
  );
};

export default StartQuiz;
