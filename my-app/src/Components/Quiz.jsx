import React, { useState, useEffect } from 'react';
import useFetchQuiz from '../hooks/useFetchQuiz';
import { useNavigate } from 'react-router-dom';
import brain from '../assets/brain.gif';
import correctSound from '../assets/correct.mp3';  // Correct answer sound
import wrongSound from '../assets/wrong.mp3';     // Wrong answer sound

const Quiz = () => {
    const { questions, loading, error } = useFetchQuiz();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false); // Track if answer is checked
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const navigate = useNavigate();

    const correctAudio = new Audio(correctSound); // Create audio object for correct sound
    const wrongAudio = new Audio(wrongSound);     // Create audio object for wrong sound

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const handleNext = () => {
        if (selectedAnswer) {
            const correctOption = questions[currentQuestion].options.find((option) => option.isCorrect);

            // Check if the selected answer is correct
            if (correctOption.text === selectedAnswer.text) {
                console.log("Correct Answer!");
                setCorrectAnswers((prevAnswers) => [...prevAnswers, selectedAnswer.text]);
                correctAudio.play(); // Play correct sound
            } else {
                console.log("Wrong Answer!");
                wrongAudio.play(); // Play wrong sound
            }

            // Mark the answer as checked
            setIsAnswerChecked(true);

            // Move to next question or navigate to results
            setTimeout(() => {
                if (currentQuestion + 1 === questions.length) {
                    console.log(correctAnswers);
                    navigate('/results', { state: { correctAnswers } });
                } else {
                    setCurrentQuestion(prev => prev + 1);
                    setSelectedAnswer(null); // Reset selection
                    setIsAnswerChecked(false); // Reset checked state
                }
            }, 1000); // Delay before moving to next question or navigating to results
        } else {
            console.log("Please select an answer before proceeding.");
        }
    };

    return (
        <div className="bg-blue-500 flex h-[100%] p-5 justify-center items-center">
            <div className="p-6 bg-white w-[50%] rounded-2xl flex flex-col items-center">
                <div className="gif w-28 bg-blue-500 bg-blend-multiply">
                    <img className='' src={brain} alt="brain" />
                </div>
                <h2 className="text-2xl text-center p-10 py-2 font-bold rounded-lg mb-4">
                    {questions[currentQuestion].questionText}
                </h2>
                <div className="grid gap-3">
                    {questions[currentQuestion].options.map((option, index) => (
                        <button
                            key={index}
                            className={`px-20 py-3 text-lg rounded-lg
                                ${isAnswerChecked && selectedAnswer === option && option.isCorrect ? "bg-green-500 text-white" : ""}
                                ${isAnswerChecked && selectedAnswer === option && !option.isCorrect ? "bg-red-500 text-white" : ""}
                                ${selectedAnswer === option && !isAnswerChecked ? "bg-blue-500 text-white" : "bg-gray-400"}
                            `}
                            onClick={() => setSelectedAnswer(option)}
                            disabled={isAnswerChecked} // Disable button after selection
                        >
                            {option.text}
                        </button>
                    ))}
                </div>
                <button
                    onClick={handleNext}
                    className="mt-4 px-6 py-2 w-[20%] font-bold bg-blue-500 text-white rounded-md"
                    disabled={!selectedAnswer} // Disable button if no answer selected
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Quiz;
