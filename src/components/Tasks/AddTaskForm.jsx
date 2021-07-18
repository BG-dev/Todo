import axios from 'axios';
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
        const obj = {
            "listId": list.id,
            "text": inputValue,
            "completed": false,
          };

        axios
          .post('http://localhost:3001/tasks', obj)
          .then(({data}) => {
            onAddTask(list.id, data);
            toggleVisibleForm();
          });
    }

    return(
        <div className="tasks__form">
            {!visibleForm ? <div className="tasks__form-new" onClick={() => toggleVisibleForm()}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Новая задача</span>
            </div> :
            <div className="tasks__form-add">
                <input
                    className="field" 
                    type="text" 
                    placeholder="Текст задачи"
                    onChange={e => {
                        setInputValue(e.target.value);
                    }}
                />
                <button className="button" onClick={() => addTask()} >Добавить задачу</button>
                <button className="button button-grey" onClick={() => toggleVisibleForm()}>Отмена</button>
            </div>
            } 
        </div>
    )
}

export default AddTaskForm;