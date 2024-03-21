import { useState, useEffect } from 'react';

export default function PageSix() {
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
    const num = Math.floor(Math.random() * 81) - 40; // Generates a number between -40 and 40
    const questionTypes = ['vastaluku', 'itseisarvo'];
    const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];

    let newQuestion, newAnswer;
    if (questionType === 'vastaluku') {
      newQuestion = `Luvun ${num} vastaluku on:`;
      newAnswer = String(-num); // Change the sign for the opposite number
    } else { // questionType === 'itseisarvo'
      newQuestion = `Luvun ${num} itseisarvo on:`;
      newAnswer = String(Math.abs(num)); // Absolute value of the number
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
        localStorage.setItem('laskut-task-6', 'True');
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
      <h1 className="text-xl mb-4">{question}</h1>
      <form onSubmit={handleAnswer} className="flex flex-col items-center">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="text-s p-2 border-2 border-gray-200 rounded focus:border-gray-400"
          placeholder="Vastaus"
        />
        <button type="submit" className={`mt-4 px-4 py-2 ${buttonColor}`}>Palauta</button>
      </form>
    </div>
    </>
  );
}