import { useState, useEffect } from 'react';

export default function UnitConversionPage() {
  const [userAnswer, setUserAnswer] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [buttonColor, setButtonColor] = useState('');
  const [questionPart1, setQuestionPart1] = useState('');
  const [questionPart2, setQuestionPart2] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    generateQuestion();
  }, [correctAnswers]); // Regenerate question when a correct answer is given

  const generateQuestion = () => {
    const conversionFactors = [
      { unitFrom: 'm', unitTo: 'km', factor: 1000 },
      { unitFrom: 'cm', unitTo: 'm', factor: 100 },
      { unitFrom: 'ml', unitTo: 'l', factor: 1000 },
      { unitFrom: 'g', unitTo: 'kg', factor: 1000 },
      // Add more conversion factors as needed
    ];
    const selectedConversion = conversionFactors[Math.floor(Math.random() * conversionFactors.length)];
    const hideFrom = Math.random() > 0.5; // Randomly decide which part of the conversion to hide

    const baseValue = Math.floor(Math.random() * 9 + 1) * selectedConversion.factor; // Ensure it's a multiple of the conversion factor

    if (hideFrom) {
      setQuestionPart1(`${baseValue} ${selectedConversion.unitFrom} = `);
      setQuestionPart2(` ${selectedConversion.unitTo}`);
      setAnswer((baseValue / selectedConversion.factor).toString());
    } else {
      setQuestionPart1(``);
      setQuestionPart2(` ${selectedConversion.unitFrom} = ${baseValue / selectedConversion.factor} ${selectedConversion.unitTo}`);
      setAnswer((baseValue).toString());
    }
  };

  const handleAnswer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userAnswer.trim() === answer.trim()) {
      setButtonColor('bg-green-500/50'); // Correct answer
      setCorrectAnswers(correctAnswers + 1);
      if (correctAnswers + 1 === 20) {
        localStorage.setItem('laskut-task-muunnoksia', 'True');
    }
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