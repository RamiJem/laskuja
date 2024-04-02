import { useState, useEffect } from 'react';

export default function PageThree() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [buttonColor, setButtonColor] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [currentOperation, setCurrentOperation] = useState({ op: '', method: (a: number, b: number) => 0, word: '' }); // Add this line
  const [questionDetails, setQuestionDetails] = useState({  op: '', num1: 0, num2: 0 });


  useEffect(() => {
    generateQuestion();
    const timeoutId = setTimeout(() => setButtonColor(''), 500);
    return () => clearTimeout(timeoutId);
  }, [currentQuestion]);

  const generateQuestion = () => {
    // Adjust the range for addition and subtraction to allow larger numbers
    const addSubtractNum1 = Math.floor(Math.random() * 51)-50; // 0 to 100
    const addSubtractNum2 = Math.floor(Math.random() * 11); // 0 to 100
    // Keep the range for multiplication and division smaller and manageable
    const mulDivNum1 = Math.floor(Math.random() * 16) - 8; // -10 to 10
    let mulDivNum2 = Math.floor(Math.random() * 21) - 10; // -10 to 10
    mulDivNum2 = mulDivNum2 === 0 ? 1 : mulDivNum2; // Avoid division by zero

    const operations = [
      { op: '+', method: (a, b) => a + b, word: 'summa', nums: [addSubtractNum1, addSubtractNum2] },
      { op: '-', method: (a, b) => a - b, word: 'erotus', nums: [addSubtractNum1, addSubtractNum2] },
      { op: '*', method: (a, b) => a * b, word: 'tulo', nums: [mulDivNum1, mulDivNum2] },
      // Ensure division results in a whole number
      { op: '/', method: (a, b) => a / b, word: 'osamäärä', nums: [mulDivNum1 * mulDivNum2, mulDivNum2] }
    ];

    
    const operation = operations[Math.floor(Math.random() * operations.length)];
    setCurrentOperation(operation);
    const [num1, num2] = operation.nums;
    const newQuestion = `lukujen ${num1} ja ${num2} ${operation.word}`;
    let newAnswer = String(operation.method(num1, num2));
    let opp = operation.op;
    if (operation.op === "*"){
       opp = "·"
    } else if (operation.op === "/") {
        opp = ":"
    }
    setQuestionDetails({ op: opp, num1: num1, num2: num2 });

    setQuestion(newQuestion);
    setAnswer(newAnswer);
  };

  const handleAnswer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // For division, compare integer answers to avoid floating point issues
    const isCorrect = currentOperation.op === '/'
      ? parseInt(userAnswer) === parseInt(answer)
      : userAnswer.trim() === answer.trim();

    if (isCorrect) {
      setButtonColor('bg-green-500/50'); // Correct answer
      const newCorrectAnswers = correctAnswers + 1;
      if (newCorrectAnswers === 30) {
        localStorage.setItem('laskut-task-16', 'True');
      }
      setCorrectAnswers(newCorrectAnswers);
      
    } else {
        //  · 
      setButtonColor('bg-red-500/50'); // Incorrect answer
      setCorrectAnswers(Math.max(0,correctAnswers - 1));
      if(questionDetails.num2 < 0) {
       
         setUserAnswer(questionDetails.num1 + questionDetails.op + "(" + questionDetails.num2 + ")");

        // setUserAnswer(questionDetails.num1 + questionDetails.op + "(" + questionDetails.num2 + ")");
      } else {
        setUserAnswer(questionDetails.num1 + questionDetails.op + questionDetails.num2);
        
      }
      setTimeout(() => {
        setButtonColor('');
      }, 500);
      // Do not advance to the next question
      return;
    }
    setCurrentQuestion(currentQuestion + 1);
    setUserAnswer(''); // Reset input field
  };

  return (
    <>
      <div className={`sticky-top ${correctAnswers >= 30 ? 'bg-green-200' : 'bg-gray-300/40'}`}>
        Oikein: {correctAnswers}/30
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