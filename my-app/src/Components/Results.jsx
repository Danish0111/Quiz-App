import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import win from '../assets/win.gif';
import lose from '../assets/lose.gif';
import tryAgain from '../assets/try_again.gif';
import won from '../assets/won.mp3';  
import over from '../assets/over.mp3';  

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const Answers = location.state && Array.isArray(location.state.correctAnswers)
    ? location.state.correctAnswers
    : [];
  
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    if (Answers.length >= 8) {
      setIsWin(true);
      const wonAudio = new Audio(won);  // Create the Audio object
      wonAudio.play();  // Play the audio
    } else {
      const overAudio = new Audio(over);  // Create the Audio object for loss
      overAudio.play();  // Play the audio
    }
  }, [Answers]); // Dependency on Answers so it checks when they change

  return (
    <div className="bg-blue-500 h-[100vh] p-5 flex justify-center items-center">
      <div className='flex flex-col items-center gap-20'>
        <p className='p-5 text-center bg-blue-700 rounded-lg text-white'>You got {Answers.length} correct answers!</p>
        {isWin && (
          <div className='bg-white p-5 text-center text-6xl font-bold text-blue-600 rounded-lg -rotate-6'>
            <div><img className='w-20' src={win} alt="" /></div>
            <span>YOU WIN!</span>
          </div>
        )}
        {!isWin && (
          <h1 className='bg-white p-5 text-center text-6xl font-bold text-blue-600 rounded-lg -rotate-6'>
            <span><img className='w-20' src={lose} alt="" /></span>
            <span>YOU LOSE!</span>
          </h1>
        )}
        <div onClick={() => {navigate('/')}} className="try_again bg-white flex justify-center items-center text-blue-500 text-xl font-bold text-center w-[50%] rounded-lg p-1">
          <span><img className='w-10' src={tryAgain} alt="" /></span>
          <span className='cursor-pointer' >Try Again</span>
        </div>
      </div>
    </div>
  );
};

export default Results;
