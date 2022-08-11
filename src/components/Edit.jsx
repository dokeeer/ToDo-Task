import React from 'react';
import './Edit.css'

const Edit = (props) => {
    const {title, description, state, id} = {...props.current}
    return (
        <div className='edit' key={id}>
            {Object.keys(props.current).length !== 0
            ?
            <div>
            <input
                defaultValue={title}
                type='text'
                className='top--bar'
                maxLength='54'
                onChange={(e) => props.changeText(e,id,'title')}
            />
            <textarea
                style={{resize:'none'}}
                onChange={(event) => props.changeText(event,id,'description')}
                defaultValue={description}
                className='edit--edit'>
            </textarea>
            <div className='edit--statechooser'>
                <div className='state--prompt'>Set state</div>
                <button
                    className='statebutton waiting'
                    onClick={() => props.changeState('waiting')}
                >
                    Waiting</button>
                <button
                    className='statebutton active'
                    onClick={() => props.changeState('active')}
                >
                    Active</button>
                <button
                    className='statebutton done'
                    onClick={() => props.changeState('done')}
                >
                    Done</button>
            </div>
            </div>
                :<div className='notfound'>There are no any ToDos like this</div>}
        </div>
    );
};

export default Edit;