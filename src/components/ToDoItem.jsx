import { useState } from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function ToDoItem({ task, deleteTask, toggleCompleted, setUpdate }) {
    const [hovered, setHovered] = useState(false)
    const [editing, setEditing] = useState(false)
    const [editedText, setEditedText] = useState(task.text)

    const handleChange = () => {
        toggleCompleted(task.id)
    };

    const handleEditing = () => {
        setEditing(!editing)
    };

    const handleEditedTask = () => {
        if (editedText.trim() === '') {
            alert("Task cannot be empty. Please enter a task name.")
            return
        }
        setUpdate(editedText, task.id)
        setEditing(false)
    }

    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    const formattedDate = new Date(task.id).toLocaleString(undefined, options)

    return (
        <>
            <div 
                className={`todo-item ${task.completed ? 'completed' : ''} ps-3 pe-3 pt-2 pb-2 mb-1 border d-flex`} 
                onMouseEnter={() => setHovered(true)} 
                onMouseLeave={() => setHovered(false)}
            >
                {!editing && 
                    <div className="d-flex align-items-center">
                        <Form.Check 
                            type="checkbox"
                            checked={task.completed}
                            onChange={handleChange}
                            className="custom-checkbox me-3"
                        />
                        <div className="text-break me-4">
                            <p className={`task-name ${task.completed ? 'completed' : ''} fw-bold`}>{task.text}</p>
                            <p className={`task-name ${task.completed ? 'completed' : ''}`}>Created at {formattedDate}</p>
                        </div>
                    </div>
                }

                {(hovered && !editing) &&
                    <div className="ms-auto d-flex align-items-center" onClick={handleEditing}>
                        <div className="clickable me-2 d-flex justify-content-center align-items-center">
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </div>
                        <div className="clickable d-flex justify-content-center align-items-center" onClick={(e) => deleteTask(task.id, e)}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>
                    </div>
                }

                {editing && 
                    <div className="flex-fill">
                        <InputGroup className="w-100 input-task">
                            <FormControl
                                value={editedText}
                                onChange={(e) => setEditedText(e.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        handleEditedTask()
                                    }
                                }}
                            />
                            <Button className="input-task btn" onClick={handleEditedTask}>
                                <FontAwesomeIcon icon={faCheck} />
                            </Button>
                        </InputGroup>
                    </div>
                }
            </div>
        </>
    );
}

export default ToDoItem
