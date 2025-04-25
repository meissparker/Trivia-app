import React, {useState, useEffect} from 'react';



function Question({question, setSelectedAnswer, onSubmit}) {

  

  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [selections, setSelections] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const shuffled = question.map((q) => ({
      ...q,
      allAnswers: shuffleArray([...q.incorrect_answers, q.correct_answer])
    }))
    setShuffledQuestions(shuffled)
  }, [question]);

  const handleChange = (questionIndex, answer) => {
    setSelections((prev) => ({
      ...prev, 
      [questionIndex]: answer
    }));
    setError('')
  };

  const handleSubmit = (e) => {
        e.preventDefault();

        const allAnswered = question.every((_, index) => selections[index]);
        if (!allAnswered) {
          setError('Please choose an answer')
          return;
        }

        setSelectedAnswer(selections)
        onSubmit();
  };

  

  



  
  return (
    <div className="page">
        <h1>Trivia Question</h1>
          <form onSubmit={handleSubmit}>
            {shuffledQuestions.map((q, index) => (
              <div key={index} style={{ marginBottom: '20px'}}>
                <p dangerouslySetInnerHTML={{__html: q.question}}/>
                
                {q.allAnswers.map((answer, i) => (
                  <div className="box" key={i}>
                    <label>
                      <input 
                      type="radio"
                      name={`question-${index}`}
                      value={answer}
                      checked={answer === selections[index]} 
                      onChange={() => handleChange(index, answer)}
                      />
                      <span dangerouslySetInnerHTML={{__html: answer}}/>
                    </label>
                  </div>
                ))}

              </div>
            ))}

            {error && <p className="box" style={{color: 'red'}}>{error}</p>}
          <button type="submit">Submit Answer</button>
        </form>

        
         
    </div>
  );
}
export default Question;