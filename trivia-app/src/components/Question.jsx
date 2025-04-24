import React, {useState, useEffect} from 'react';

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

function Question({question}) {

  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([])

  useEffect(() => {
    const shuffled = question.map((q) => ({
      ...q,
      allAnswers: shuffleArray([...q.incorrect_answers, q.correct_answer])
    }))
    setShuffledQuestions(shuffled)
  }, [question]);

  const handleChange = (questionIndex, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev, 
      [questionIndex]: answer
    }));
  };


  
  return (
    <div>
        <h1>Trivia Question</h1>
        
          {shuffledQuestions.map((q, index) => (
            <div key={index} style={{ marginBottom: '20px'}}>
              <p dangerouslySetInnerHTML={{__html: q.question}}/>
              
              {q.allAnswers.map((answer, i) => (
                <div key={i}>
                  <label>
                    <input 
                    type="radio"
                    name={`question-${index}`}
                    value={answer}
                    checked={selectedAnswers[index] === answer} 
                    onChange={() => handleChange(index, answer)}
                    />
                    <span dangerouslySetInnerHTML={{__html: answer}}/>
                  </label>
                </div>
              ))}

            </div>
          ))}
         
    </div>
  );
}
export default Question;