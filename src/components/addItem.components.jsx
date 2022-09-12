import React from "react";
import '../styles/addItem.css'
function AddItem() {
    const OnclickButton=(msg)=>{
        alert(msg)
    }
    return (
        <button className="CreateTodoButton"
            onClick={()=> OnclickButton('aqui se deberia de devolver un modal') }
        >+</button>

    );
}
export { AddItem };
