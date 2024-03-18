import { useState, useEffect } from 'react';


export default function PageOne() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [userAnswer, setUserAnswer] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [buttonColor, setButtonColor] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => setButtonColor(''), 500); // Reset button color after 0.5 seconds
    return () => clearTimeout(timeoutId);
  }, [currentQuestion]);

  const questions = [
    { question: "+(+1)", answer: "1" },
    { question: "-(+2)", answer: "-2" },
    { question: "-(-3)", answer: "3" },
    { question: "-(+4)", answer: "-4" },
    { question: "+(-5)", answer: "-5" },
    { question: "+(+6)", answer: "6" },
    { question: "-(-7)", answer: "7" },
    { question: "-(+8)", answer: "-8" },
    { question: "+(-9)", answer: "-9" },
    { question: "+(+10)", answer: "10" },
    { question: "-(-11)", answer: "11" },
    { question: "-(+12)", answer: "-12" },
    { question: "+(-13)", answer: "-13" },
    { question: "+(+14)", answer: "14" },
    { question: "-(-15)", answer: "15" },
    { question: "-(+16)", answer: "-16" },
    { question: "+(-17)", answer: "-17" },
    { question: "+(+18)", answer: "18" },
    { question: "-(-19)", answer: "19" },
    { question: "-(+20)", answer: "-20" }
  ];

  const currentQuestionText = questions[currentQuestion - 1]?.question;
  const currentAnswer = questions[currentQuestion - 1]?.answer;
  const handleAnswer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userAnswer === currentAnswer) {
      setButtonColor('bg-green-500/50'); // Set button color to green if the answer is correct
      const newCorrectAnswers = correctAnswers + 1;
      setCorrectAnswers(newCorrectAnswers);
      if (newCorrectAnswers === questions.length) {
        localStorage.setItem('laskut-task-1', 'True');
      }
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setButtonColor('bg-red-500/50'); // Set button color to red if the answer is incorrect
      setCorrectAnswers(0); // Reset correct answers if the answer is wrong
      setCurrentQuestion(1);
    }
    setUserAnswer(''); // Reset input field
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-5xl mb-4"> {currentQuestionText}</h1>
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
