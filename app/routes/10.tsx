import { useState, useEffect } from 'react';

export default function PageTen() {
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
    let num2 = Math.floor(Math.random() * 10) + 1; // Generates a number between 1 and 10 for simplicity
    const factor = Math.floor(Math.random() * 11) - 5; // Generates a factor between -5 and 5
    let num1 = num2 * factor; // Ensures the division result is an integer
  
    // Randomly decide if num1 and num2 should be negative
    if (Math.random() < 0.5) {
      num1 = -num1;
    }
    if (Math.random() < 0.5) {
      num2 = -num2;
    }
  
    // Format the second number to ensure it's enclosed in parentheses if negative
    const formattedNum2 = num2 < 0 ? `(${num2})` : num2;
  
    // Construct the question with division using a division symbol (÷)
    const newQuestion = `${num1} : ${formattedNum2}`;
  
    // The answer is calculated by dividing num1 by num2, ensuring integer result
    // Since num1 is already a product of num2 and factor, the answer is simply the factor.
    // However, to ensure correctness in sign handling, we directly calculate it again.
    const newAnswer = String(Math.floor(num1 / num2));
  
    setQuestion(newQuestion);
    setAnswer(newAnswer);
  };
 

  const handleAnswer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Allow a small margin of error for floating point answers
    if (Math.abs(parseFloat(userAnswer) - parseFloat(answer)) < 0.01) {
      setButtonColor('bg-green-500/50'); // Correct answer
      const newCorrectAnswers = correctAnswers + 1;
      setCorrectAnswers(newCorrectAnswers);
      if (newCorrectAnswers === 20) {
        localStorage.setItem('laskut-task-10', 'True');
      }
    } else {
      setButtonColor('bg-red-500/50'); // Incorrect answer
      setCorrectAnswers(0);
    }
    setCurrentQuestion(currentQuestion + 1);
    setUserAnswer(''); // Reset input field
  };

  return (
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

      <p className="absolute top-0 left-0 m-4">Oikein: {correctAnswers}/20</p>
    </div>
  );
}