import { useState, useEffect } from 'react';
import { Container, InputGroup, FormControl, Dropdown, DropdownButton, Stack, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEllipsis, faPlus } from '@fortawesome/free-solid-svg-icons';
import ToDoItem from '../components/ToDoItem';
import logo from '../assets/logo.png';

function ToDoPage() {
    const [tasks, setTasks] = useState(getInitialTasks())
    const [text, setText] = useState('')
    const [filter, setFilter] = useState('All')

    // console.log('Tasks: ', tasks)
    // console.log('Text: ', text)
    // console.log('Filter: ', filter)

    function getInitialTasks() {
        const temp = localStorage.getItem('tasks')
        const savedTasks = JSON.parse(temp)
        return savedTasks || []
    }

    useEffect(() => {
        const temp = JSON.stringify(tasks)
        localStorage.setItem('tasks', temp)
    }, [tasks])

    const addTask = () => {
        if (text.trim() === '') {
            alert("Task cannot be empty. Please enter a task name.")
            return
        }
        const newTask = {
            id: Date.now(),
            text: text,
            completed: false
        }
        setTasks([...tasks, newTask])
        setText('')
    }

    const deleteTask = (id, event) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            setTasks(tasks.filter(task => task.id !== id))
        } else {
            event.stopPropagation()
        }
    }

    const deleteAllTasks = () => {
        if (tasks.length > 0 && (window.confirm("Are you sure you want to delete all tasks?"))) {
            setTasks([])
        }
    }

    const markAllDone = () => {
        const updatedTasks = tasks.map(task => {
            return { ...task, completed: true }
        })

        setTasks(updatedTasks)
    } 

    const uncheckAll = () => {
        const updatedTasks = tasks.map(task => {
            return { ...task, completed: false }
        })

        setTasks(updatedTasks)
    } 

    const toggleCompleted = (id) => {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed }
            } else {
                return task
            }
        }))
    }

    const setUpdate = (updatedText, id) => {
        setTasks(tasks.map((task) => {
            if (task.id === id) {
                task.text = updatedText
            }
            
            return task
          }))
    }

    const filterTasks = (filter) => {
        setFilter(filter)
    }

    const filteredTasks = () => {
        switch (filter) {
            case 'Unchecked':
                return tasks.filter(task => !task.completed)
            case 'Completed':
                return tasks.filter(task => task.completed)
            default:
                return tasks
        }
    }

    const uncheckedTasks = filteredTasks().filter(task => !task.completed)
    const checkedTasks = filteredTasks().filter(task => task.completed)

    return (
        <Container fluid className="todo--container vh-100 ps-lg-5 pe-lg-5 overflow-auto">
            <Container className="todo--details ps-lg-5 pe-lg-5">
                <div className='banner border p-4 d-flex justify-content-start align-items-center'>
                    <img src={logo} alt="Logo" width={45} height={45} className='me-2'/>
                    <p className='fs-1 text-white text-logo'>LexMeet</p>
                </div>
                {/* To-do header */}
                <div className='pt-3 pb-3 ps-0 pl-0 border-bottom d-flex justify-content-center align-items-center'>
                    <div className="p-2">
                        <p className="fw-bold"><FontAwesomeIcon icon={faList} className="icons" />To-Do List App</p>
                    </div>
                    <div className='d-flex ms-auto justify-content-center align-items-center'>
                        <div className="d-flex justify-content-center align-items-center">
                            <p className="me-2">Filter:</p>
                            <DropdownButton 
                                className="me-3 custom-dropdown btn border-0 p-0" 
                                title={filter}
                                data-bs-theme="light"
                                variant="secondary"
                            >
                                <Dropdown.Item onClick={() => filterTasks('All')}>All ({tasks.length})</Dropdown.Item>
                                <Dropdown.Item onClick={() => filterTasks('Unchecked')}>Unchecked ({uncheckedTasks.length})</Dropdown.Item>
                                <Dropdown.Item onClick={() => filterTasks('Completed')}>Completed ({checkedTasks.length})</Dropdown.Item>
                            </DropdownButton>
                        </div>
                        
                        <DropdownButton
                            title={<FontAwesomeIcon icon={faEllipsis} />}
                            className="more-options-dropdown btn border-0 p-0"
                            data-bs-toggle="dropdown"
                        >
                            <Dropdown.Item onClick={deleteAllTasks}>
                                Delete all
                            </Dropdown.Item>
                            <Dropdown.Item onClick={markAllDone}>
                                Mark all completed
                            </Dropdown.Item>
                            <Dropdown.Item onClick={uncheckAll}>
                                Uncheck all
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>

                <InputGroup className="mt-3 mb-3 pb-3 border-bottom input-task">
                    <FormControl
                        placeholder="Enter new to-do..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                addTask()
                            }
                        }}
                    />
                    <Button className="input-task btn" onClick={() => addTask()}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                </InputGroup>

                {/* To-do items */}
                <Stack gap={2} className="pt-2">
                    {[...uncheckedTasks, ...checkedTasks].map(task => (
                        <ToDoItem
                            key={task.id}
                            task={task}
                            deleteTask={deleteTask}
                            toggleCompleted={toggleCompleted}
                            setUpdate={setUpdate}
                        />
                    ))}
                </Stack>
            </Container>
        </Container>
    );
}

export default ToDoPage
