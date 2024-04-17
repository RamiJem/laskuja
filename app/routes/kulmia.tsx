import { useState, useEffect } from 'react';

// function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
//     var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
  
//     return {
//       x: centerX + (radius * Math.cos(angleInRadians)),
//       y: centerY + (radius * Math.sin(angleInRadians))
//     };
//   }
// function describeArc(x, y, radius, startAngle, endAngle){

//     const start = polarToCartesian(x, y, radius, startAngle);
//     const end = polarToCartesian(x, y, radius, endAngle);

//     const largeArcFlag = "0";

//     const d = [
//         "M", 0, 0, 
//         "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y
//     ].join(" ");

//     return d;       
//   }

  
export default function AngleQuestionPage() {
  const [userAnswer, setUserAnswer] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentAngle, setCurrentAngle] = useState(0);
    const [correctAngleName, setCorrectAngleName] = useState("")
  useEffect(() => {
    generateNewAngle();
  }, [correctAnswers]); // Regenerate angle when a correct answer is given

  const generateNewAngle = () => {
    const angle_names = ["terävä", "suora", "tylppä", "oiko"]
    const angles = {"terävä":  Math.floor(Math.random() * 90), "suora": 90, "tylppä": Math.floor(Math.random() * 75) + 93, "oiko": 180}; // Generate a random angle between 0 and 180 degrees
    const correct_name = angle_names[Math.floor(Math.random()*4)]
    console.log("name: ", correct_name)
    setCorrectAngleName(correct_name)
    const newAngle = angles[correct_name] // Generate a random angle between 0 and 180 degrees
    setCurrentAngle(newAngle);
  };

  const handleAnswer = (angleName: string) => {


    console.log("correctAngleName: ", correctAngleName)
    console.log("angleName ", angleName)
    if (angleName === correctAngleName) {
      setCorrectAnswers(Math.min(25, correctAnswers + 1));
      
      const button = document.getElementById(correctAngleName);
      if (button) {
        button.className = "ml-2 px-4 py-2 bg-green-500/50 text-black rounded";
        setTimeout(()=> {
            button.className = "ml-2 px-4 py-2 bg-white-500 text-black rounded";
        }, 500)
        
      }
      if (correctAnswers + 1 === 25) {
        localStorage.setItem('laskut-task-kulmia', 'true');
      }
     
    } else {
        const button = document.getElementById(angleName);
      if (button) {
        setCorrectAnswers(Math.max(0, correctAnswers-2))
        button.className = "ml-2 px-4 py-2 bg-red-500 text-black rounded";
        setTimeout(()=> {
            button.className = "ml-2 px-4 py-2 bg-white-500 text-black rounded";
        }, 500)
      }

    }
    
  };

  const drawAngle = (angle: number) => {
    const radians = (angle * Math.PI) / 180;
    const length = 100; // Length of the line
    const x2 = 50 + Math.cos(radians) * length; // Calculate x position of the end of the rotating line
    const y2 = 100 - Math.sin(radians) * length; // Calculate y position of the end of the rotating line




    return (
      <svg width="200" height="200">
        <line x1="50" y1="100" x2="150" y2="100" stroke="black" strokeWidth="1" /> {/* Horizontal line */}
        <line x1="50" y1="100" x2={x2} y2={y2} stroke="black" strokeWidth="1" /> {/* Rotating line */}
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
          {["terävä", "suora", "tylppä", "oiko"].map((angleName) => (
            <button
              key={angleName}
              onClick={() => {
                handleAnswer(angleName);
              }}
              id={angleName}
              className={`ml-2 px-4 py-2 text-black rounded`}
              style={{transition: 'background-color 0.5s ease'}}
            >
              {angleName}
            </button>
          ))}
        </div>

      </div>
    </>
  );
}