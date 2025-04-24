
// src/App.jsx
import { useState } from 'react';
import Results from './components/Results'
import Question from './components/Question';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    difficulty: '',
  }); 
  const [question, setQuestion] = useState([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (event) => {
    const {name, value} = event.target;
  

  setFormData((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

  const validateForm = () => {
    const {name, difficulty, category} = formData;

    if (name.trim()==='' || difficulty.trim ==='' || category.trim==='') {
      setSuccess('');
      setError('Name, difficulty, and category are required.');
      return false;
    }
    setError('')
    return true
  };

  const getQuestion = async (event) => {
    event.preventDefault();

    if (!validateForm()){
      return;
    }

    const apiUrl = `https://opentdb.com/api.php?amount=1&category=${formData.category}&difficulty=${formData.difficulty}&type=multiple`;


    try {
      const response = await fetch(apiUrl);

     

      const data = await response.json();
      setQuestion(data.results);

      if (!response.ok){
        throw new Error('Failed to generate question');
      }

      console.log('Trivia Questions:', data.results);
    
  
      } catch (error) {
        console.error(error.message)
      }

  }

  return (
    
      <>
        <h1>Welcome to the Trivia Game!</h1>
          <form onSubmit={getQuestion}>
            <div>
              <label htmlFor="name">Name</label><br/>
              <input 
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange= {handleChange}
              placeholder= "Enter your first name"
              />
            </div>

            <div>
              <label htmlFor="category">Category</label><br/>
              <select id="category" name="category" value={formData.category} onChange={handleChange}>
                <option value="">--Please choose a category--</option>
                <option value="21">Sports</option>
                <option value="11">Entertainment: Film</option>
                <option value="9">General Knowledge</option>
                <option value="22">Geography</option>
              </select>
              {formData.category && <p>You selected: {formData.category}</p>}
            </div><br/>

            <div>
              <label htmlFor="difficulty">Difficulty</label><br/>
              <select id="difficulty" name="difficulty" value={formData.difficulty} onChange={handleChange}>
                <option value="">--Please choose a difficulty--</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              {formData.difficulty && <p>You selected: {formData.difficulty}</p>}
            </div><br/>
            
            <button type="submit">Get Question</button>
          </form>
          
          {question.length > 0 && <Question question={question} />}

        <Results/>

        
      </>
  );
}

export default App;
