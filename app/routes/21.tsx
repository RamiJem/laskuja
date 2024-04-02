import { useEffect, useState } from 'react';

function SequenceQuestion() {
  const [userAnswer, setUserAnswer] = useState('');
  const [buttonColor, setButtonColor] = useState('');

  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [sequenceType, setSequenceType] = useState('');
  const [sequence, setSequence] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');

  // Generate a new sequence question
  const generateQuestion = () => {
    const isArithmetic = Math.random() > 0.5;
    setSequenceType(isArithmetic ? 'aritmeettinen' : 'geometrinen');
    let firstTerm = Math.floor(Math.random() * 20) + 1;
    let commonDifferenceOrRatio = Math.floor(Math.random() * 10) + 1;
    let newSequence = [firstTerm];

    for (let i = 1; i < 3; i++) {
      newSequence.push(
        isArithmetic
          ? newSequence[i - 1] + commonDifferenceOrRatio
          : newSequence[i - 1] * commonDifferenceOrRatio
      );
    }

    setSequence(newSequence);
    setCorrectAnswer(isArithmetic ? commonDifferenceOrRatio.toString() : commonDifferenceOrRatio.toString());

  };

  // Handle answer submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const answerIsCorrect = userAnswer.trim() === correctAnswer.trim();
    
    if (answerIsCorrect) {
        setCorrectAnswers(correctAnswers+1)
        setButtonColor('bg-green-500/50'); // Correct answer
         generateQuestion(); 
        setUserAnswer("");
        if (correctAnswers === 25) {
            localStorage.setItem('laskut-task-21', 'True');
          }
        
    } else {
      setButtonColor('bg-red-500/50'); // Incorrect answer
      setCorrectAnswers(Math.max(0, correctAnswers-1))
      setUserAnswer("")
    }
    setTimeout(() => {
        setButtonColor('');
  }, 500);
  };

  // Initialize a question on component mount
  useEffect(() => {
    generateQuestion();
  }, []);

  return (<>
    <div className={`sticky-top ${correctAnswers >= 25 ? 'bg-green-200' : 'bg-gray-300/40'}`}>
        Oikein: {correctAnswers}/25
      </div>
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="text-2xl mb-4">
        {sequenceType === 'aritmeettinen'
          ? 'Mikä on aritmeettisen lukujonon erotusluku?'
          : 'Mikä on geometrisen lukujonon suhdeluku?'}
      </h2>
      <p className="text-2xl"> {sequence.join(', ')}</p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className={`text-l p-2 border-2 'border-gray-200'} rounded focus:border-gray-400`}
          style={{ margin: '10px 0', width: '80%' }}
        />
        <button type="submit" className={`mt-4 px-4 py-2 ${buttonColor}`}>
          Tarkista
        </button>
      </form>
    </div>
    </>
  );
}

export default SequenceQuestion;