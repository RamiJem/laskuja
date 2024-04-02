import { useState, useEffect } from 'react';

export default function PageTwentyTwo() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operation, setOperation] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [buttonColor, setButtonColor] = useState('');
  const [question, setQuestion] = useState('');

  useEffect(() => {
    generateQuestion();
  }, []);

  const operations = {
    '-': 'erotus',
    '+': 'summa',
    '*': 'tulo',
    '/': 'osamäärä',
  };

  const generateQuestion = () => {
    const operationKeys = Object.keys(operations);
    const selectedOperation = operationKeys[Math.floor(Math.random() * operationKeys.length)];
    let firstNumber = Math.floor(Math.random() * 10) + 1;
    let secondNumber = Math.floor(Math.random() * 10) + 1;

    if (selectedOperation === '/') {
      // Ensure division results in an integer
      firstNumber = secondNumber * (Math.floor(Math.random() * 10) + 1);
    }

    setNum1(firstNumber);
    setNum2(secondNumber);
    setOperation(selectedOperation);
    setQuestion(`Mikä on lukujen ${firstNumber} ja ${secondNumber} ${operations[selectedOperation]}?`);
    setUserAnswer('');

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let correctAnswer;
    switch (operation) {
      case '+':
        correctAnswer = num1 + num2;
        break;
      case '-':
        correctAnswer = num1 - num2;
        break;
      case '*':
        correctAnswer = num1 * num2;
        break;
      case '/':
        correctAnswer = num1 / num2;
        break;
      default:
        correctAnswer = null;
    }

    if (parseInt(userAnswer) === correctAnswer) {
        if (correctAnswers + 1 === 20) {
            localStorage.setItem('laskut-task-22', 'True');
        }
        setCorrectAnswers(correctAnswers + 1);
        setButtonColor('bg-green-500/50'); // Correct answer
      generateQuestion();
    } else {
      setButtonColor('bg-red-500/50'); // Incorrect answer
    }


    setTimeout(() => {
      setButtonColor('');
    }, 500);
  };

  return (
    <>
      <div className={`sticky-top ${correctAnswers >= 20 ? 'bg-green-200' : 'bg-gray-300/40'}`}>
        Oikein: {correctAnswers}/20
      </div>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-xl mb-4">{question}</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center mt-4">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="text-center p-2 border-2 border-gray-200 rounded focus:border-gray-400"
            placeholder="Vastaus"
          />
          <button type="submit" className={`mt-4 px-4 py-2 ${buttonColor}`}>
            Tarkista
          </button>
        </form>
      </div>
    </>
  );
}