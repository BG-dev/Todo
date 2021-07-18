import React from 'react';
import AddTaskForm from './AddTaskForm';
import Task from './Task';

import './Tasks.scss';

function Tasks({list, onAddTask, withoutEmpty, onRemoveTask, onCompleteTask}){

    return(
        <div className="tasks">
            <h2 style={{color: list.color.hex}} className="tasks__title">
                {list.name}
            </h2>
            <div className="tasks__items">
                {!withoutEmpty && !list.tasks.length && <h2 style={{color: list.color.hex}} >Задачи отсутствуют</h2>}
                { 
                list.tasks.map(task => (
                    <Task key={task.id} list={list} {...task} onRemove={onRemoveTask} onComplete={onCompleteTask} completed={task.completed}/>
                ))}
                <AddTaskForm key={list.id} list={list} onAddTask={onAddTask}/>
            </div>
        </div>
    )
}

export default Tasks;