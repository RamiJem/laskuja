import { useState, useEffect } from 'react';

export default function PageFourteen() {
  const [sequence, setSequence] = useState([]);
  const [nextElement, setNextElement] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [buttonColor, setButtonColor] = useState('');

  useEffect(() => {
    generateSequence();
  }, []);
  const [arithmetic, setArithmetic] = useState(false)
  const generateSequence = () => {
    const sequenceType = Math.random() < 0.5 ? 'arithmetic' : 'geometric';
    if(sequenceType=="arithmetic") {
        setArithmetic(true)
    } else {
        setArithmetic(false)
    }
    // Adjust the starting number range based on the sequence type
    const start = sequenceType === 'arithmetic' ? Math.floor(Math.random() * 10) + 1 : Math.floor(Math.random() * 5) + 1; // Smaller start for geometric
    const common = Math.floor(Math.random() * 5) + 1; // Common difference or ratio from 1 to 5
    let generatedSequence = [start];
  
    for (let i = 1; i < 3; i++) { // Now loops only twice to generate a total of three elements
      generatedSequence.push(sequenceType === 'arithmetic' ? generatedSequence[i - 1] + common : generatedSequence[i - 1] * common);
    }
  
    // Calculate the next element based on the sequence type, which is the fourth element
    const next = sequenceType === 'arithmetic' ? generatedSequence[2] + common : generatedSequence[2] * common;
    setNextElement(next.toString());
  
    setSequence(generatedSequence);
  };
  const [timeoutId, setTimeoutId] = useState(null);

  const handleAnswer = (event) => {
    event.preventDefault();

    if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
    if (userAnswer === nextElement) {
        setButtonColor('bg-green-500/50'); // Correct answer
        setCorrectAnswers(correctAnswers + 1);
        if (correctAnswers === 20) {
            localStorage.setItem('laskut-task-14', 'True');
          }
    } else {
        setButtonColor('bg-red-500/50'); // Incorrect answer
        setCorrectAnswers(Math.max(0, correctAnswers - 4));
    }

    const newTimeoutId = setTimeout(() => setButtonColor(''), 500);
    setTimeoutId(newTimeoutId);

    setUserAnswer(''); // Reset input field
    generateSequence(); // Generate a new sequence
  };

  return (
    <>
    <div className={`sticky-top ${correctAnswers >= 20 ? 'bg-green-200' : 'bg-gray-300/40'}`} >
        Oikein: {correctAnswers}/20
      </div>
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-xl mb-4">Mikä on { arithmetic ? "aritmeettisen " : "geometrisen "}lukujonon seuraava jäsen?</h1>
      <p className="text-2xl">{sequence.join(', ')}</p>
      <form onSubmit={handleAnswer} className="flex flex-col items-center mt-4">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="text-center p-2 border-2 border-gray-200 rounded focus:border-gray-400"
          placeholder="Seuraava jäsen"
        />
        <button type="submit" className={`mt-4 px-4 py-2 ${buttonColor}`}>
          Palauta
        </button>
      </form>
    </div>
    </>
  );
}