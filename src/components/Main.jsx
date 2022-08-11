import React from "react";
import './Main.css';
import Sidebar from "./Sidebar";
import randomKeyGenerator from "../randomkey";
import Edit from "./Edit";

function Main() {

    //States for making resizable ToDo list

    const [listWidth, setListWidth] = React.useState(265)
    const [prevEnd, setPrevEnd] = React.useState(0)

    //State for finding function realisation

    const [findCrit, setFindCrit] = React.useState('')

    //State for creating New ToDo with custom title

    const [newTodoName, setNewTodoName] = React.useState('New ToDo')

    //Code below sets items to localStorage if they don't exist
    //so there are less possible bugs

    if (localStorage.getItem('todoList') === null)
        localStorage.setItem('todoList', JSON.stringify([]))

    if (localStorage.getItem('currentTodo') === null || JSON.parse(localStorage.getItem('todoList')) === [])
        localStorage.setItem('currentTodo', JSON.stringify({}))

    //States for list of existing ToDos, for current ToDo
    //and ToDos that user wants to find

    const [todoList, setTodoList] = React.useState(
        (JSON.parse(localStorage.getItem('todoList')))
    )

    const [currentTodo, setCurrentTodo] = React.useState(
        (JSON.parse(localStorage.getItem('currentTodo')))
    )

    const [findTodoList, setFindTodoList] = React.useState(todoList)

    //Hook below puts list of Todos to local storage
    //every time list changes

    React.useEffect(() => {
        if (todoList.length > 0)
            {
                localStorage.setItem('todoList', JSON.stringify(todoList))
            }
        else
        {
            localStorage.setItem('todoList', JSON.stringify([]))
        }
    }, [todoList])


    //Handler for changing state of a name of a future ToDo

    function handleNewTodoNameChange(e) {
        setNewTodoName(e.target.value)
    }

    //Form submit handler for creating new ToDo

    function newTodo(e) {
        setTodoList(prev=>{
            return [...prev,
                {
                    title: newTodoName,
                    description: `It is my ${prev.length+1} ToDo`,
                    id: randomKeyGenerator(),
                    stateTodo: 'waiting',
                }]
        })
        setNewTodoName('New ToDo')
        e.preventDefault()
    }

    //Handler for deleting existing ToDo

    function deleteTodo(id) {
        setTodoList(prev => {
            return prev.filter(item => {
                return item.id !== id
            })
        })
    }

    //Hook below sets first item in list of ToDos
    //if current ToDo was deleted and list is not empty

    React.useEffect(()=>{
        if (todoList.length > 0) if (todoList.filter((item)=>{
            return item.id === currentTodo.id
        }).length === 0) setCurrentTodo(todoList[0])
    }, [todoList])

    //Function that finds ToDo that was chosen as current
    //using id (randomly generated key) of chosen ToDo

    function findCurrent(gotId) {
        return todoList.filter(todo=>{
            return (todo.id === gotId)
        })[0]
    }

    //Handler for setting current Todo and putting it into local storage

    function setCurrent(id) {
        setCurrentTodo(findCurrent(id))
        localStorage.setItem('currentTodo', JSON.stringify(findCurrent(id)))
    }

    //Handler of clicking on the resizing bar to find out
    //where did resizing start

    function takeX(e) {
        setPrevEnd(e.clientX)
    }

    //Handler of dragging resizing bar to resize block
    //with list of ToDos

    function handleDrag(e) {
        if (e.clientX !== prevEnd //condition for verification that cursor moves
            && e.clientX !== 0
            && prevEnd !== 0) {
            setListWidth(prev => {
                if (prev + (e.clientX-prevEnd) <= 242) //min width of block
                    return 241
                if (prev + (e.clientX-prevEnd) >= 620) //max width of block
                    return 619
                return (prev + (e.clientX-prevEnd)*2)
            })
        }
        takeX(e) //setting new previous X cord
    }

    //Handlers for changing properties of current ToDo

    function handleChange(event, id, property) {
        setTodoList(prev=>{
            return prev.map(todo=>{ //Finding what ToDo is being changed
                return {
                    ...todo,
                    [property]: todo.id === currentTodo.id? event.target.value : todo[property]
                }
            })
        })
        setCurrentTodo(prev=>{
            return {
                ...prev,
                [property]: event.target.value
            }
        })
    }

    function changeState(state) {
        setTodoList(prev=>{
            return prev.map(todo=>{ //Finding what ToDo is being changed
                return {
                    ...todo,
                    stateTodo: todo.id === currentTodo.id? state : todo.stateTodo
                }
            })
        })
        setCurrentTodo(prev=>{
            return {
                ...prev,
                stateTodo: state
            }
        })
    }

    //Hook for putting changed currentTodo into local storage

    function handleFind(e) {
        setFindCrit(e.target.value.toLowerCase())
        setFindTodoList(todoList.filter(todo => {
            return (todo.title.toLowerCase().includes(e.target.value.toLowerCase()))
        }))
        localStorage.setItem('findTodo', JSON.stringify(findTodoList))
    }

    React.useEffect(()=>{
        setFindTodoList(todoList.filter(todo => {
            return (todo.title.toLowerCase().includes(findCrit))
        }))
        localStorage.setItem('currentTodo', JSON.stringify(currentTodo))
    }, [todoList])

    //Hook created to prevent choosing ToDo that is not in list of
    //found ToDos

    React.useEffect(()=>{
        if (findTodoList.length === 0) setCurrentTodo({})
        else setCurrentTodo(findTodoList[0])
    },[findCrit])

    //Hook created to prevent choosing undefined ToDo as current

    React.useEffect(()=>{
        if (findTodoList.length === 0) setCurrentTodo({})
    }, [findTodoList])

    return (
        <div className='main'>
            {
            todoList.length !== 0                       //Conditional rendering depending on existing ToDos in list
            ? <div className='todo--holder' >
                  <div
                       className='todo--sidebar'
                       style={{width:`${listWidth}px`}}
                  >
                  <Sidebar
                       valueOfInput={newTodoName}
                       handleNameChange={handleNewTodoNameChange}
                       delete={deleteTodo}              //
                       todos={findTodoList}                 //
                       click={newTodo}                  //Sidebar component with props
                       currentTodo={currentTodo}        //
                       setCurrent={setCurrent}
                       findTodos={handleFind}//
                  />
                  </div>
                  <div
                       className='border'
                       onDragCapture={takeX}
                       draggable
                       onDrag={handleDrag}
                  />
                  <div className='todo--edit'>
                        <Edit
                            current={currentTodo}       //Edit component with props
                            changeText={handleChange}
                            changeState={changeState}//
                        />
                  </div>
                  </div>
                : <div className='greetings'>
                  <div className='prompt'>
                        You don't have any ToDos yet
                  </div>
                        <button
                            onClick={newTodo}             //Rendering of greetings page if there are no existing ToDos
                            className='greetings--button' //
                        >
                            Create new
                        </button>
                  </div>
            }
        </div>
    );

}

export default Main;
