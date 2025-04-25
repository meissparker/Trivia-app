import React from 'react';



function Results({selectedAnswer, question, isVisible}) {

        if (!isVisible) return null;


        const handleReload = () => {
            window.location.reload();
        };
    




    return (
        <div className="page">
        <div>
            <h2>Results</h2>
                {question.map((q, index) => {
                    const userAnswer = selectedAnswer[index];
                    const isCorrect = userAnswer === q.correct_answer;

                    return (
                        <div className="box" key={index} style={{marginBottom: '20px'}}>
                            <p dangerouslySetInnerHTML={{__html: q.question}}/>

                            <p>
                                Your Answer: <span dangerouslySetInnerHTML={{__html: userAnswer || 'No answer selected'}} />
                            </p>
                            <p>
                                Correct Answer: <span dangerouslySetInnerHTML={{__html: q.correct_answer}}/>
                            </p>
                            <p style={{color: isCorrect ? 'green': 'red'}}>
                                {isCorrect ? 'Correct!' : 'Incorrect'}
                            </p>
                        </div>
                    );
                })}
            </div>

            <button onClick={handleReload}>
                Get another question
            </button>
            </div>

            );

}

export default Results