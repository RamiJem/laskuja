import { useState, useEffect } from 'react';

export default function PageEleven() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [buttonColor, setButtonColor] = useState('');

  useEffect(() => {
    generateQuestion();
  }, []);

  

  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 20 - 10) / 10; // Generates a decimal number between -1.0 and 1.9
    const num2 = Math.floor(Math.random() * 20 - 10) / 10; // Generates a decimal number between -1.0 and 1.9
    const operators = ['+', '-'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
  
    // Format numbers to use a comma as the decimal separator
    const formattedNum1 = num1.toString().replace('.', ',');
    let formattedNum2 = num2.toString().replace('.', ',');
  
    // Enclose the second number in parentheses if it's negative
    if (num2 < 0) {
      formattedNum2 = `(${formattedNum2})`;
    }
  
    const newQuestion = `${formattedNum1} ${operator} ${formattedNum2}`;
    setQuestion(newQuestion);
  
    // Perform the calculation directly instead of using eval
    let calculationAnswer;
    if (operator === '+') {
      calculationAnswer = num1 + num2;
    } else if (operator === '-') {
      calculationAnswer = num1 - num2;
    }
  
    // Format the answer to use a comma as the decimal separator
    const formattedAnswer = calculationAnswer.toString().replace('.', ',');
    setAnswer(formattedAnswer);
  };

  const [timeoutId, setTimeoutId] = useState(null);

const handleAnswer = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  // Clear any existing timeout to reset the button color
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  // Convert user answer back to dot format for comparison
  const userAnswerWithDot = userAnswer.replace(',', '.');
  if (parseFloat(userAnswerWithDot).toFixed(1) === parseFloat(answer.replace(',', '.')).toFixed(1)) {
    setButtonColor('bg-green-500/50'); // Correct answer
    setCorrectAnswers(correctAnswers + 1);
    if (correctAnswers === 20) {
        localStorage.setItem('laskut-task-11', 'True');
      }
  } else {
    setButtonColor('bg-red-500/50'); // Incorrect answer
    setCorrectAnswers(Math.max(0, correctAnswers - 4));
  }

  // Set a new timeout to reset the button color and store the timeout ID
  const newTimeoutId = setTimeout(() => setButtonColor(''), 500);
  setTimeoutId(newTimeoutId);

  setUserAnswer(''); // Reset input field
  generateQuestion(); // Generate a new question
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