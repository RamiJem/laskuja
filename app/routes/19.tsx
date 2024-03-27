import { useState, useEffect } from 'react';

export default function PageEighteen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [buttonColor, setButtonColor] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    generateQuestion();
    const timeoutId = setTimeout(() => setButtonColor(''), 500);
    return () => clearTimeout(timeoutId);
  }, [currentQuestion]);

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateQuestion = () => {
    // Randomly choose the type of question
    const questionType = Math.random() < 0.5 ? 'addition' : 'subtraction';
  
    let num1, num2, num3, finalResult, newQuestion;
  
    if (questionType === 'addition') {
      // Generate the numbers for the addition operation
      num1 = getRandomInt(-7, 7);
      num2 = getRandomInt(-7, 7);
      num3 = getRandomInt(1, 20); // Small number for addition
      finalResult = num1 * num2 + num3;
      // Construct the addition question
      newQuestion = `Lisää lukujen ${num1} ja ${num2} tuloon luku ${num3}.`;
    } else {
      // Generate the numbers for the subtraction operation
      num1 = getRandomInt(-10, 10);
      num2 = getRandomInt(-10, 10);
      num3 = getRandomInt(1, 10); // Small number for subtraction
      finalResult = num1 * num2 - num3;
      // Construct the subtraction question
      newQuestion = `Vähennä lukujen ${num1} ja ${num2} tulosta luku ${num3}.`;
    }
  
    setQuestion(newQuestion);
    setAnswer(String(finalResult));
  };
  const handleAnswer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userAnswer.trim() === answer.trim()) {
      setButtonColor('bg-green-500/50'); // Correct answer
      setCorrectAnswers(correctAnswers + 1);
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer(''); // Reset input field
      generateQuestion(); // Generate a new question
    } else {
      setButtonColor('bg-red-500/50'); // Incorrect answer
      // Do not advance to the next question
      setTimeout(() => setButtonColor(''), 500);
    }
  };

  return (
    <>
      <div className={`sticky-top ${correctAnswers >= 20 ? 'bg-green-200' : 'bg-gray-300/40'}`}>
        Oikein: {correctAnswers}/20
      </div>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-5xl mb-4">{question}</h1>
        <form onSubmit={handleAnswer} className="flex flex-col items-center">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="text-l p-2 border-2 border-gray-200 rounded focus:border-gray-400"
            placeholder="= "
          />
          <button type="submit" className={`mt-4 px-4 py-2 ${buttonColor}`}>Palauta</button>
        </form>
      </div>
    </>
  );
}