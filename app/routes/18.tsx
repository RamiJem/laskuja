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
    // Generate the numbers for the operation
    const num1 = getRandomInt(-10, 10); // For multiplication
    const num2 = getRandomInt(-10, 10); // For multiplication
    const num3 = getRandomInt(1, 50);   // To be added to the product

    // Calculate the product of the first two numbers
    const product = num1 * num2;
    // Add the third number to the product
    const finalResult = product + num3;

    // Construct the question
    const question = `Lisää lukujen ${num1} ja ${num2} tuloon luku ${num3}.`;

    setQuestion(question);
    setAnswer(String(finalResult));
  };

  const handleAnswer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userAnswer.trim() === answer.trim()) {
      setButtonColor('bg-green-500/50'); // Correct answer
      setCorrectAnswers(correctAnswers + 1);
      if (correctAnswers === 25) {
        localStorage.setItem('laskut-task-18', 'True');
      }
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer(''); // Reset input field
      generateQuestion(); // Generate a new question
    } else {
      setButtonColor('bg-red-500/50'); // Incorrect answer
      setTimeout(() => setButtonColor(''), 500); // Reset color after 0.5 seconds
      // Do not advance to the next question
    }
  };

  return (
    <>
      <div className={`sticky-top ${correctAnswers >= 25 ? 'bg-green-200' : 'bg-gray-300/40'}`}>
        Oikein: {correctAnswers}/25
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