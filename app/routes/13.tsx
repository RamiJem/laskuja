import { useState, useEffect } from 'react';

export default function PageThirteen() {
  const [sequence, setSequence] = useState([]);
  const [isGeometric, setIsGeometric] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    generateSequence();
  }, []);

  const generateSequence = () => {
    const start = Math.floor(Math.random() * 5) + 1; // Random start from 1 to 5
    const ratio = Math.floor(Math.random() * 3) + 1; // Random ratio from 1 to 5
    const randomSequence = [start, start * ratio, start * ratio * ratio];

    // Randomly decide to make it non-geometric by altering the second number
    if (Math.random() < 0.5) {
      randomSequence[1] += Math.floor(Math.random() * 3) + 1; // Alter the second term randomly
      setIsGeometric(false);
    } else {
      setIsGeometric(true);
    }

    setSequence(randomSequence);
  };

  const handleAnswer = (isYes) => {
    if (isYes === isGeometric) {

      if (correctAnswers + 1 === 20) {
        localStorage.setItem('laskut-task-13', 'True');
      }
      setCorrectAnswers(correctAnswers + 1);
      generateSequence();
    } else {
        setCorrectAnswers(Math.max(0, correctAnswers - 1));
    }
    
  };

  return (
    <>
      <div className={`sticky-top ${correctAnswers >= 20 ? 'bg-green-200' : 'bg-gray-300/40'}`} >
        Oikein: {correctAnswers}/20
      </div>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-xl mb-4">Onko kyseessä geometrinen lukujono?</h1>
        <p className="text-2xl">{sequence.join(', ')}</p>
        <div className="flex mt-4">
          <button
            onClick={() => handleAnswer(true)}
            className="bg-green-200 hover:bg-green-400 text-black font-bold py-2 px-4 rounded mr-2"
          >
            Kyllä
          </button>
          <button
            onClick={() => handleAnswer(false)}
            className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Ei
          </button>
        </div>
      </div>
    </>
  );
}