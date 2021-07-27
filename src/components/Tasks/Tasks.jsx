import React from 'react';
import AddTaskForm from './AddTaskForm';
import Task from './Task';

import './Tasks.scss';

function Tasks({list, tasks, colors, onAddTask, withoutEmpty, onRemoveTask, onCompleteTask}){
    return(
        <div className="tasks">
            <h2 style={{color: colors && colors.filter(color => color.id === list.colorId)[0].hex}} className="tasks__title">
                {list.name}
            </h2>
            <div className="tasks__items">
                {!withoutEmpty && tasks && tasks.filter(task => task.listId === list.id).length === 0 && <h2 style={{color: colors && colors.filter(color => color.id === list.colorId)[0].hex}} >Задачи отсутствуют</h2>}
                { tasks && 
                tasks.filter(task => task.listId === list.id).map((task, index) => (
                    <Task key={task.id} list={list} index={index} id={task.id} text={task.text} onRemove={onRemoveTask} onComplete={onCompleteTask} completed={task.completed}/>
                ))}
                <AddTaskForm key={list.id} list={list} onAddTask={onAddTask}/>
            </div>
        </div>
    )
}

export default Tasks;