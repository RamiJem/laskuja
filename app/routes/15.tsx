import { useState, useEffect } from 'react';

export default function PageThree() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [intermediateUserAnswer, setIntermediateUserAnswer] = useState('');
  const [finalUserAnswer, setFinalUserAnswer] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [buttonColor, setButtonColor] = useState('');
  const [question, setQuestion] = useState('');
  const [intermediateAnswer, setIntermediateAnswer] = useState('');
  const [finalAnswer, setFinalAnswer] = useState('');

  useEffect(() => {
    generateQuestion();
    const timeoutId = setTimeout(() => setButtonColor(''), 500);
    return () => clearTimeout(timeoutId);
  }, [currentQuestion]);

  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 20) - 10;
    const num2 = Math.floor(Math.random() * 20) - 10;
    const operators = ['+', '-'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    const formattedNum2 = num2 >= 0 ? `+${num2}` : `${num2}`; // Keep this for displaying in the question
    const newQuestion = `${num1} ${operator} (${formattedNum2})`;
    let newIntermediateAnswer, newFinalAnswer;
    try {
      // Correctly handle the simplification of the expression inside the parentheses
      // If the operator is '-', invert the sign of num2 for the intermediate answer
      newIntermediateAnswer = operator === '-' ? (num2 >= 0 ? `-${num2}` : `+${Math.abs(num2)}`) : formattedNum2;
      // Final answer after the entire operation
      newFinalAnswer = String(eval(`${num1} ${operator} ${num2}`)); // Use num2 directly for final calculation
    } catch (error) {
      console.error('Error generating answer', error);
      newIntermediateAnswer = '0';
      newFinalAnswer = '0'; // Fallback answers in case of an error
    }
    setQuestion(newQuestion);
    setIntermediateAnswer(newIntermediateAnswer);
    setFinalAnswer(newFinalAnswer);
  };

  const handleAnswer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (intermediateUserAnswer.replace(/\s/g, "") === intermediateAnswer && finalUserAnswer === finalAnswer) {
      setButtonColor('bg-green-500/50'); // Correct answer
      const newCorrectAnswers = correctAnswers + 1;
      setCorrectAnswers(newCorrectAnswers);
      if (newCorrectAnswers === 20) {
        localStorage.setItem('laskut-task-15', 'True');
      }
    } else {
      setButtonColor('bg-red-500/50'); // Incorrect answer
      // Do not reset correct answers, but don't allow to proceed
      return; // Prevent moving to the next question
    }
    setCurrentQuestion(currentQuestion + 1);
    setIntermediateUserAnswer('');
    setFinalUserAnswer(''); // Reset input fields
  };
  const firstPart = question.split(" ")[0]
  return (
    <>
      <div className={`sticky-top ${correctAnswers >= 20 ? 'bg-green-200' : 'bg-gray-300/40'}`}>
        Oikein: {correctAnswers}/20
      </div>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-5xl mb-4">{question}</h1>
        <form onSubmit={handleAnswer} className="flex flex-col items-center">
          <label className="mb-2">
            {"= " + firstPart + " "}
            <input
              type="text"
              value={intermediateUserAnswer}
              onChange={(e) => setIntermediateUserAnswer(e.target.value)}
              className="text-l p-2 border-2 border-gray-200 rounded focus:border-gray-400"
              placeholder="Välivaihe"
            />
          </label>
          <label>
           {"= "}
            <input
              type="text"
              value={finalUserAnswer}
              onChange={(e) => setFinalUserAnswer(e.target.value)}
              className="text-l p-2 border-2 border-gray-200 rounded focus:border-gray-400 mt-2"
              placeholder="Vastaus"
            />
          </label>
          <button type="submit" className={`mt-4 px-4 py-2 ${buttonColor}`}>Palauta</button>
        </form>
</div>
</> )}