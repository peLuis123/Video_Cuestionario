import '../App.css';
import React from 'react';
import { Question } from '../components/Question.components';
import { TodoItem } from '../components/Item.components';
import { AddItem } from '../components/addItem.components.jsx';

const defaultQuestion = [
  { text: "Cual es tu Videojuego Favorito", completed: false },
  { text: "Cual es tu comida Favorita", completed: false },
  { text: "Cual es tu Pelicula Favorita", completed: false },
  { text: "Cual es tu Pelicula Favorita", completed: false },
];

function Questions(props) {
  const [questions, setQuestions] = React.useState(defaultQuestion);

  const completeQuestion = (text) => {
    const questionIndex = questions.findIndex((question) => question.text === text);
    const newQuestions = [...questions];
    newQuestions[questionIndex].completed = true;
    setQuestions(newQuestions);
    alert('La pregunta: "' + newQuestions[questionIndex].text + '" fue guardada con éxito');
  };

  const addNewQuestion = (newQuestionText) => {
    const newQuestion = { text: newQuestionText, completed: false };
    setQuestions([...questions, newQuestion]);
    alert('La pregunta: "' + newQuestionText + '" fue agregada con éxito');
  };

  return (
    <React.Fragment>
      <h1>Video Cuestionario</h1>
      <Question className="images">
        {questions.map((question) => (
          <TodoItem
            completed={question.completed}
            key={question.text}
            text={question.text}
            onComplete={() => completeQuestion(question.text)}
          />
        ))}
      </Question>
      <AddItem onAddQuestion={addNewQuestion} />
    </React.Fragment>
  );
}

export default Questions;
