import React from 'react';
import bin from "../images/delete.svg";

const ToDoElem = (props) => {
    const ToDos = props.todos.map(todo=>{

        //Function to set styles to ToDo object if it is chosen as current ToDo

        function isCurrent(prop, id) {
            if (prop.currentTodo) return (prop.currentTodo.id === id? 'current' :'')
            else return ''
        }

        return <div className='todo--comp' key={todo.id}>
            <div
                className={`todo--object ${isCurrent(props, todo.id)} ${todo.stateTodo}`}
                onClick={() => props.setCurrent(todo.id)}
            >
                {todo.title}

            </div>
            <img
                src={bin}
                className={`todo--delete ${isCurrent(props, todo.id)} ${todo.stateTodo}`}
                onClick={() => props.delete(todo.id)}
            />

        </div>
    })
    return (
        <div>
            {ToDos}
        </div>
    );
};

export default ToDoElem;