import React from 'react';
import './Sidebar.css'
import bin from '../images/delete.svg'

const Sidebar = (props) => {

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
        <div className='todos--holder'>
            <div className='newtodo'>
                <form onSubmit={props.click}>
                <input                                  //
                    type='text'                         //Form for creating new ToDo with name from input
                    value={props.valueOfInput}          //
                    className='newtodo--input'          //
                    maxLength='17'
                    onChange={props.handleNameChange}
                />
                <input type='submit' className='newtodo--button' value='+'/>
                </form>
                </div>
            <div className='find--prompt'>Find</div>
            <input
                className='find--todo'
                type='text'
                onChange={props.findTodos}
            />
            <div className='todo--list'>
            {ToDos}
            </div>
        </div>
    );
};

export default Sidebar;