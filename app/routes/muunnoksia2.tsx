import { useState, useEffect } from 'react';

export default function UnitConversionPage() {
  const [userAnswer, setUserAnswer] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [buttonColor, setButtonColor] = useState('');
  const [questionPart1, setQuestionPart1] = useState('');
  const [questionPart2, setQuestionPart2] = useState('');
  const [answer, setAnswer] = useState('');

  const prefixes = [
    { prefix: 'k', scale: 1000 },
    { prefix: 'h', scale: 100 },
    { prefix: 'da', scale: 10 },
    { prefix: '', scale: 1 },
    { prefix: 'd', scale: 0.1 },
    { prefix: 'c', scale: 0.01 },
    { prefix: 'm', scale: 0.001 }
  ];

  const units = ['m', 'l', 'g'];

  useEffect(() => {
    generateQuestion();
  }, [correctAnswers]); // Regenerate question when a correct answer is given

  const generateQuestion = () => {
    const selectedUnit = units[Math.floor(Math.random() * units.length)];
    const selectedPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const baseValue = Math.floor(Math.random() * 900 + 100); // Random base value between 100 and 999
    const hideFrom = Math.random() > 0.5; // Randomly decide which part of the conversion to hide

    if (hideFrom) {
      setQuestionPart1(`${baseValue} ${selectedPrefix.prefix}${selectedUnit} = `);
      setQuestionPart2(`${selectedUnit}`);
      setAnswer((baseValue * selectedPrefix.scale).toString());
    } else {
      setQuestionPart1('');
      setQuestionPart2(`${selectedPrefix.prefix}${selectedUnit} = ${baseValue} ${selectedUnit}`);
      setAnswer((baseValue / selectedPrefix.scale).toString());
    }
  };

  const handleAnswer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formattedUserAnswer = userAnswer.replace(',', '.');

    if (formattedUserAnswer.trim() === answer.trim()) {
      setButtonColor('bg-green-500/50'); // Correct answer
      if (correctAnswers + 1 === 20) {
          localStorage.setItem('laskut-task-muunnoksia2', 'True');
        }
        setCorrectAnswers(correctAnswers + 1);
    } else {
      setButtonColor('bg-red-500/50'); // Incorrect answer
    }
    setUserAnswer(''); // Reset input field for the next question
    setTimeout(() => setButtonColor(''), 500); // Reset button color after 0.5 seconds
  };

  return (
    <>
      <div className={`sticky-top ${correctAnswers >= 20 ? 'bg-green-200' : 'bg-gray-300/40'}`}>
        Oikein: {correctAnswers}/20
      </div>
      <div className="flex flex-col justify-center items-center h-screen">

        <form onSubmit={handleAnswer} className="flex flex-col items-center">
          <div className="text-2xl">
            {questionPart1}
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="text-l p-2 border-2 border-gray-200 rounded focus:border-gray-400 inline-block w-32 text-center"
              placeholder=""
            />
            {questionPart2}
          </div>
          <button type="submit" className={`mt-4 px-4 py-2 ${buttonColor}`}>Tarkista</button>
        </form>
      </div>
    </>
  );
}