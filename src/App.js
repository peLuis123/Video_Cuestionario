import './App.css';
import React from 'react'
import { Question } from './components/Question.components'
import { TodoItem } from './components/Item.components'
import { AddItem } from './components/addItem.components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';

const defaultQuestion = [
  { text: "Cual es tu Videojuego Favorito", completed: false },
  { text: "Cual es tu comida Favorita", completed: true },
  { text: "Cual es tu Pelicula Favorita", completed: false },
  { text: "Cual es tu Pelicula Favorita", completed: false },
  { text: "Cual es tu Pelicula Favorita", completed: false },
  { text: "Cual es tu Pelicula Favorita", completed: false },
  { text: "Cual es tu Pelicula Favorita", completed: false },
  { text: "Cual es tu Pelicula Favorita", completed: false },
  { text: "Cual es tu Pelicula Favorita", completed: false },
  { text: "Cual es tu Pelicula Favorita", completed: false },
  { text: "Cual es tu Pelicula Favorita", completed: false },
  { text: "Cual es tu Pelicula Favorita", completed: false },
  { text: "Cual es tu Pelicula Favorita", completed: false },
]
function App(props) {
  const [questions, setQuestion] = React.useState(defaultQuestion)

 
  const completeQuestion = (text) => {
    const questionIndex = questions.findIndex(question => question.text === text);
    const newQuestion = [...questions];
    questions[questionIndex].completed = true;
    setQuestion(newQuestion);
    alert('La pregunta: "' +  questions[questionIndex].text +'" fue guardada con exito');
  };

  return (
    <React.Fragment>
      <div id="wrapper">
        <p id="title" contenteditable="true" spellcheck="false"><span>Video Cuestionario</span></p>
        <p id="slogan"><span>Cuando complete una pregunta por favor marcar el boton de tarea completada<FontAwesomeIcon icon={faClipboardCheck} /></span> </p>
      </div>
     
      <Question className="images">
        {questions.map(question => (
          <TodoItem
            completed={question.completed}
            key={question.text}
            text={question.text}
            onComplete={() => completeQuestion(question.text)}
            />
        ))}
      </Question>
      <AddItem/>
    </React.Fragment>
  );
}

export default App;

