import React from 'react';
import './Sidebar.css'
import ToDoElem from "./ToDoElem";

const Sidebar = (props) => {

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
            <ToDoElem
                todos={props.todos}
                currentTodo={props.currentTodo}
                setCurrent={props.setCurrent}
                delete={props.delete}
            />
            </div>
        </div>
    );
};

export default Sidebar;