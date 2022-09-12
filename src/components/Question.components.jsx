import React from "react";
import '../styles/Question.css'


// import card from '../img/image'
function Question(props) {
    return (
        <section className="images-grid">
            {props.children}
        </section>
    );
}
export { Question };


