import { useState, useEffect } from 'react';

export default function PageTwo() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [buttonColor, setButtonColor] = useState(''); // Added for button color
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    generateQuestion();
    // Reset button color after 0.5 seconds, similar to PageOne
    const timeoutId = setTimeout(() => setButtonColor(''), 500);
    return () => clearTimeout(timeoutId);
  }, [currentQuestion, correctAnswers]); // Added correctAnswers as a dependency

  const generateQuestion = () => {
    const baseNumber = Math.floor(Math.random() * 201) - 100; // Generates a number between -100 and 100
    const increment = correctAnswers + 1; // Increment gets bigger with more correct answers
    const operators = ['+', '-'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    const newQuestion = `${baseNumber} ${operator} ${increment}`;
    let newAnswer;
    try {
      newAnswer = String(eval(newQuestion));
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
      setButtonColor('bg-green-500/50'); // Set button color to green if the answer is correct
      const newCorrectAnswers = correctAnswers + 1;
      setCorrectAnswers(newCorrectAnswers);
      if (newCorrectAnswers === 20) {
        localStorage.setItem('laskut-task-20', 'True');
      }
    } else {
      setButtonColor('bg-red-500/50'); // Set button color to red if the answer is incorrect
      setCorrectAnswers(Math.max(0, correctAnswers - 2)); // Reset correct answers if the answer is wrong
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