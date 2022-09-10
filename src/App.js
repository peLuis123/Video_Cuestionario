import './App.css';
import React from 'react'
import { Question } from './components/Question.components'
import { TodoItem } from './components/Item.components'
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import {faRecordVinyl} from '@fortawesome/free-solid-svg-icons'
const question = [
  { text: "Cual es tu Videojuego Favorito", completed: false },
  { text: "Cual es tu comida Favorita", completed: false },
  { text: "Cual es tu Pelicula Favorita", completed: false },
]
function App(props) {
  return (
    <React.Fragment>
      <div id="wrapper">
        <p id="title" contenteditable="true" spellcheck="false"><span>Video Cuestionario</span></p>
        <p id="slogan"><span>Cuando complete una pregunta por favor marcar el boton de tarea completada</span> </p>
      </div>
     
      <Question className="images">
        {question.map(question => (
          <TodoItem
            completed={question.completed}
            key={question.text}
            text={question.text} />
        ))}
      </Question>
    </React.Fragment>
  );
}

export default App;

