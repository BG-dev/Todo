import React,{useState} from 'react';

import './Tasks.scss';

function AddTaskForm({list, onAddTask}){

    const [visibleForm, setVisibleForm] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const toggleVisibleForm = function(){
        setVisibleForm(!visibleForm);
        setInputValue('');
    }

    const addTask = function(){
        if(inputValue.trim() === ''){
            alert('Enter the task text!');
            return;
        }

        onAddTask(list.id, inputValue);
        toggleVisibleForm();
    }

    return(
        <div className="tasks__form">
            {!visibleForm ? <div className="tasks__form-new" onClick={() => toggleVisibleForm()}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Add a Task</span>
            </div> :
            <div className="tasks__form-add">
                <form>
                    <input
                        className="field" 
                        type="text" 
                        placeholder="Add a Task"
                        onChange={e => {
                            setInputValue(e.target.value);
                        }}
                    />
                    <button className="button" onClick={() => addTask()}>Add a Task</button>
                    <button className="button button-grey" onClick={() => toggleVisibleForm()}>Cancel</button>
                </form>
            </div>
            } 
        </div>
    )
}

export default AddTaskForm;