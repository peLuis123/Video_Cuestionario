import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../styles/addItem.css";

function AddItem({ onAddQuestion }) {
  const [showModal, setShowModal] = useState(false);
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleAddQuestion = () => {
    if (inputText.trim() !== "") {
      onAddQuestion(inputText);
      setInputText("");
      setShowModal(false);
    }
  };

  const handleCloseModal = () => {
    setInputText("");
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <div className="addItemContainer">
      <button className="CreateTodoButton" onClick={handleShowModal}>
        +
      </button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nueva Pregunta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Escribe tu nueva pregunta:</p>
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Escribe aquí..."
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAddQuestion}>
            Agregar Pregunta
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export { AddItem };
