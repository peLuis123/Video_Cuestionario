import React from "react";
import '../styles/item.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo } from '@fortawesome/free-solid-svg-icons'
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons'
function TodoItem(props) {
    return (
        <div className="Img">
            <li className="TodoItem">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" class ="imagen" src="https://static.vecteezy.com/system/resources/thumbnails/002/317/571/small/neon-with-yellow-question-mark-on-a-gray-brick-wall-with-spotlight-area-copy-space-3d-rendering-free-photo.jpg" />
                    <div className="Botones"><Button variant="danger" ><FontAwesomeIcon icon={faVideo} /></Button>
                        <Button variant="primary"  onClick={props.onComplete}><FontAwesomeIcon icon={faClipboardCheck} /></Button>
                    </div>
                    <Card.Body>
                        <Card.Text>
                            <p  className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}>{props.text}</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </li>
        </div>
    )
}

export { TodoItem };