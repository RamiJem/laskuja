import { useState, useEffect } from 'react';

export default function PageFive() {
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

  const generateQuestion = () => {
    // Generates numbers between -10 and 10
    const num1 = Math.floor(Math.random() * 21) - 10;
    const num2 = Math.floor(Math.random() * 21) - 10;
    const num3 = Math.floor(Math.random() * 21) - 10;
  
    // Randomly choose between + and - for both operations
    const operators = ['+', '-'];
    const operator1 = operators[Math.floor(Math.random() * operators.length)];
    const operator2 = operators[Math.floor(Math.random() * operators.length)];
  
    // Format numbers to ensure negative numbers are properly enclosed in parentheses
    const formattedNum2 = num2 < 0 ? `(${num2})` : num2;
    const formattedNum3 = num3 < 0 ? `(${num3})` : num3;
  
    // Construct the question with formatted numbers
    const newQuestion = `${num1} ${operator1} ${formattedNum2} ${operator2} ${formattedNum3}`;
  
    // Calculate the answer
    let newAnswer;
    try {
      newAnswer = String(eval(newQuestion)); // Use eval to calculate the answer
    } catch (error) {
      console.error('Error generating answer', error);
      newAnswer = '0'; // Fallback answer in case of an error
    }
  
    setQuestion(newQuestion);
    setAnswer(newAnswer);
  };

  const handleAnswer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userAnswer === answer) {
      setButtonColor('bg-green-500/50'); // Correct answer
      const newCorrectAnswers = correctAnswers + 1;
      setCorrectAnswers(newCorrectAnswers);
      if (newCorrectAnswers === 20) {
        localStorage.setItem('laskut-task-5', 'True');
      }
    } else {
      setButtonColor('bg-red-500/50'); // Incorrect answer
      setCorrectAnswers(Math.max(0, correctAnswers - 4));
    }
    setCurrentQuestion(currentQuestion + 1);
    setUserAnswer(''); // Reset input field
  };

  return (
    <>
    <div className={`sticky-top ${correctAnswers >= 20 ? 'bg-green-200' : 'bg-gray-300/40'}`} >
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