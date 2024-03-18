import { useState, useEffect } from 'react';

export default function PageThree() {
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
    const num1 = Math.floor(Math.random() * 21) - 10; // Generates a number between -10 and 10
    const result = Math.floor(Math.random() * 21) - 10; // Generates a number between -10 and 10
    const newQuestion = `${num1} + x = ${result}`;
    const newAnswer = String(result - num1); // Solve for x
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
        localStorage.setItem('laskut-task-3', 'True');
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
          placeholder="x = "
        />
        <button type="submit" className={`mt-4 px-4 py-2 ${buttonColor}`}>Palauta</button>
      </form>

      <p className="absolute top-0 left-0 m-4">Oikein: {correctAnswers}/20</p>
    </div>
  );
}