import { useState, useEffect } from 'react';

export default function PageEight() {
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
    const num1 = Math.floor(Math.random() * 11) - 5; // Generates a number between -5 and 5 for simplicity
    const num2 = Math.floor(Math.random() * 11) - 5; // Generates a number between -5 and 5 for simplicity
    const operators = ['-', '+']; // Include both subtraction and addition
    const operator = operators[Math.floor(Math.random() * operators.length)];
  
    // Decide randomly whether to enclose the entire expression or just the second number in absolute value
    const useAbsoluteFor = Math.random() > 0.5 ? 'all' : 'second';
  
    let formattedNum2 = `${num2}`;
    // If the second number is negative and follows a subtraction operator, enclose it in parentheses
    if (num2 < 0 && useAbsoluteFor==="all") {
      formattedNum2 = `(${num2})`;
    }
  
    let formattedExpression;
    if (useAbsoluteFor === 'all') {
      // Enclose the entire expression in absolute value
      formattedExpression = `|${num1} ${operator} ${formattedNum2}|`;
    } else {
      // Only the second number (or its absolute value) is part of the expression
      formattedExpression = useAbsoluteFor === 'second' ? `${num1} ${operator} |${formattedNum2}|` : `${num1} ${operator} ${formattedNum2}`;
    }
  
    const newQuestion = formattedExpression;
  
    // Calculate the answer
    let newAnswer;
    try {
      // Replace the absolute value notation with Math.abs for evaluation
      const expressionForEval = newQuestion.replace(/\|([^\|]+)\|/g, 'Math.abs($1)');
      newAnswer = String(eval(expressionForEval)); // Use eval to calculate the answer
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
        localStorage.setItem('laskut-task-8', 'True');
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