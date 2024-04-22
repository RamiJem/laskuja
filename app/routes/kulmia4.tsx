import { useState, useEffect } from 'react';


const drawArc = (angle) => {
  const radians = (angle * Math.PI) / 180;
  const length = 100; // Length of the lines
  const radius = 30; // Smaller radius for the arc

  // Coordinates for the line ends
  const x1 = 50; // Start x of both lines
  const y1 = 100; // Start y of both lines
  const x2 = x1 + length; // End x of the base line
  const y2 = y1; // End y of the base line remains the same as the start
  const x3 = x1 + Math.cos(radians) * length; // End x of the rotating line
  const y3 = y1 - Math.sin(radians) * length; // End y of the rotating line

  // Start point of the arc on the base line
  const arcStartX = x1 + radius;
  const arcStartY = y1;

  // End point of the arc on the rotating line
  const arcEndX = x1 + Math.cos(radians) * radius;
  const arcEndY = y1 - Math.sin(radians) * radius;

  const sweepFlag = 0;

  // Define the path for the SVG arc
  const largeArc = angle > 180 ? 1 : 0;
  const d = [
    `M${arcStartX},${arcStartY}`, // Move to start point of the arc on the base line
    `A${radius},${radius} 0 ${largeArc} ${sweepFlag} ${arcEndX},${arcEndY}` // Arc to end point on the rotating line
  ].join(' ');

  return <path d={d} stroke="black" fill="none" strokeWidth="1" />;
};



export default function AngleQuestionPage() {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentAngle, setCurrentAngle] = useState(0);
  const [angleOptions, setAngleOptions] = useState<number[]>([]);

  useEffect(() => {
    generateNewAngle();
  }, [correctAnswers]); // Regenerate angle when a correct answer is given

  const generateNewAngle = () => {
    const correctAngle = Math.floor(Math.random() * 360); // Generate a random angle between 0 and 180 degrees
    setCurrentAngle(correctAngle);

    let options = new Set<number>();
    options.add(correctAngle);
    while (options.size < 4) {
      options.add(Math.floor(Math.random() * 360));
    }
    setAngleOptions(Array.from(options));
  };

  const handleAnswer = (selectedAngle: number) => {
    if (selectedAngle === currentAngle) {
      
      const button = document.getElementById(`angle-${selectedAngle}`);
      if (button) {
        button.className = "ml-2 px-4 py-2 bg-green-500/50 text-black rounded";
        setTimeout(()=> {
            button.className = "ml-2 px-4 py-2 bg-white-500 text-black rounded";
            setCorrectAnswers(Math.min(25, correctAnswers + 1)); 
        }, 200)
      }
      if (correctAnswers + 1 === 25) {
        localStorage.setItem('laskut-task-kulmia4', 'True');
      }
    } else {
        const button = document.getElementById(`angle-${selectedAngle}`);
        if (button) {
            setCorrectAnswers(Math.max(0, correctAnswers-2))
            button.className = "ml-2 px-4 py-2 bg-red-500/50 text-black rounded";
            setTimeout(()=> {
                button.className = "ml-2 px-4 py-2 bg-white-500 text-black rounded";
            }, 200)
        }
    }
  };

  const drawAngle = (angle: number) => {
    const radians = (angle * Math.PI) / 180;
    const length = 100; // Length of the line
    const x2 = 50 + Math.cos(radians) * length; // Calculate x position of the end of the rotating line
    const y2 = 100 - Math.sin(radians) * length; // Calculate y position of the end of the rotating line

    return (
      <svg width="200" height="200" >
        <g transform={`rotate(${Math.floor(Math.random() * 360)} 50 100)`}>
        <line x1="50" y1="100" x2="150" y2="100" stroke="black" strokeWidth="1" /> {/* Horizontal line */}
        <line x1="50" y1="100" x2={x2} y2={y2} stroke="black" strokeWidth="1" /> {/* Rotating line */}
        {drawArc(currentAngle)} {/* Call the new function to draw the arc */}
        </g>
      </svg>
      
    );
  };

  return (
    <>
    <div className={`sticky-top ${correctAnswers >= 25 ? 'bg-green-200' : 'bg-gray-300/40'}`}>
        Oikein: {correctAnswers}/25
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen">

        {drawAngle(currentAngle)}
        <div className="mt-4">
          {angleOptions.map((angle) => (
            <button
              key={angle}
              onClick={() => {
                handleAnswer(angle);
              }}
              id={`angle-${angle}`}
              className={`ml-2 px-4 py-2 text-black rounded`}
            
            >
              {angle}°
            </button>
          ))}
        </div>

      </div>
    </>
  );
}