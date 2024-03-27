import { useState, useEffect } from 'react';

export default function PageFour() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [buttonColor, setButtonColor] = useState('');
  const [intermediateOperation, setIntermediateOperation] = useState('');
  const [finalOperation, setFinalOperation] = useState('');
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
    const basicOperations = [
      {
        op: '+',
        method: (a, b) => a + b,
        word: 'summasta',
      },
      {
        op: '-',
        method: (a, b) => a - b,
        word: 'erotuksesta',
      },
      // Include multiplication and division if needed
    ];

    const secondStepOperations = [
      {
        op: 'itseisarvo',
        method: (a) => Math.abs(a),
        word: 'itseisarvo',
      },
      {
        op: 'vastaluku',
        method: (a) => -a,
        word: 'vastaluku',
      },
    ];

    const basicOperation = basicOperations[Math.floor(Math.random() * basicOperations.length)];
    const num1 = getRandomInt(-10, 10);
    const num2 = getRandomInt(-10, 10);
    const intermediateResult = basicOperation.method(num1, num2);
    const intermediateQuestion = `lukujen ${num1} ja ${num2} ${basicOperation.word}`;

    const secondStepOperation = secondStepOperations[Math.floor(Math.random() * secondStepOperations.length)];
    const finalResult = secondStepOperation.method(intermediateResult);
    const finalQuestion = `${secondStepOperation.word} ${intermediateQuestion}`;

    setIntermediateOperation(intermediateQuestion);
    setFinalOperation(finalQuestion);
    setAnswer(String(finalResult));
  };

  const handleAnswer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userAnswer === answer) {
      setButtonColor('bg-green-500/50'); // Correct answer
      setCorrectAnswers(correctAnswers + 1);
      if (correctAnswers === 20) {
        localStorage.setItem('laskut-task-17', 'True');
      }
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer(''); // Reset input field
      generateQuestion(); // Generate a new question
    } else {
      setButtonColor('bg-red-500/50'); // Incorrect answer
      // Do not advance to the next question
    }
  };

  return (
    <>
      <div className={`sticky-top ${correctAnswers >= 20 ? 'bg-green-200' : 'bg-gray-300/40'}`}>
        Oikein: {correctAnswers}/20
      </div>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-5xl mb-4">{finalOperation}</h1>
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