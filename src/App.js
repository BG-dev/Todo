import React,{useState, useEffect} from 'react'
import List from './components/List/List';
import AddList from './components/AddList/AddList';
import Tasks from './components/Tasks/Tasks'; 
import axios from 'axios';
import { Route, useHistory, useLocation } from 'react-router-dom';

function App() {
  const [itemsList, setItemsList] = useState(null);
  const [colors, setColors] = useState(null);
  const [tasksList, setTasksList] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [currentId, setCurrentId] = useState(8);
  const [currentTaskId, setCurrentTaskId] = useState(20)
  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    axios
      .get('https://todo-app-eeef8-default-rtdb.europe-west1.firebasedatabase.app/lists.json')
      .then(({ data }) => {
        setItemsList(data);
      });
    axios
      .get('https://todo-app-eeef8-default-rtdb.europe-west1.firebasedatabase.app/colors.json')
      .then(({ data }) => {
        setColors(data);
      });
    axios
      .get('https://todo-app-eeef8-default-rtdb.europe-west1.firebasedatabase.app/tasks.json')
      .then(({ data }) => {
        setTasksList(data);
      });
  }, []);

  const onAddList = function(inputValue, selectedColor){
    const newItem = {
      name: inputValue,
      colorId: selectedColor,
      id: currentId
    }
    const lists = [...itemsList, newItem];
    setItemsList(lists);


    axios
      .patch('https://todo-app-eeef8-default-rtdb.europe-west1.firebasedatabase.app/.json', {
        lists
      })
      .then(() => {
        setCurrentId(currentId + 1);
      })
      .catch(() => {
        alert('Ошибка при добавлении списка!');
      })
  }

  const onAddTask = function(listId, inputValue){
    const newTask = {
      id: currentTaskId,
      text: inputValue,
      listId : listId,
      completed: false
    }
    const tasks = [...tasksList, newTask]
    setTasksList(tasks);

    axios
      .patch('https://todo-app-eeef8-default-rtdb.europe-west1.firebasedatabase.app/.json', {
        tasks
      })
      .then(() => {
        setCurrentTaskId(currentTaskId + 1);
      })
      .catch(() => {
        alert('Ошибка при добавлении задания!');
      })
  }

  const onRemoveList = function(id){
    const lists = itemsList.filter(list => list.id !== id);
    setItemsList(lists);
    axios
      .patch('https://todo-app-eeef8-default-rtdb.europe-west1.firebasedatabase.app/.json', {
        lists
    })
    .then(()=> {
      history.push(`/`);
    })
  }

    const onRemoveTask = function(taskId){
    const tasks = tasksList.filter(task =>(
      task.id !== taskId
    ))
    setTasksList(tasks);
    axios
      .patch('https://todo-app-eeef8-default-rtdb.europe-west1.firebasedatabase.app/.json', {
        tasks
      })
}

const onCompleteTask = (index, taskId, completed) => {
  const tasks = tasksList.map(task => {
        if (task.id === taskId) {
          task.completed = completed;
        }
        return task;
      });
  setTasksList(tasks);
  axios
    .patch('https://todo-app-eeef8-default-rtdb.europe-west1.firebasedatabase.app/.json', {
      tasks
    })
};

  useEffect(() => {
    const itemId = location.pathname.split('lists/')[1];
    if (itemsList) {
      const item = itemsList.find(item => item.id === Number(itemId));
      setActiveItem(item);
    }
  }, [itemsList, location.pathname]);

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List 
        onClickItem={list => {
          history.push(`/`);
        }}
        items={[{
          icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.96 8.10001H7.74001C7.24321 8.10001 7.20001 8.50231 7.20001 9.00001C7.20001 9.49771 7.24321 9.90001 7.74001 9.90001H12.96C13.4568 9.90001 13.5 9.49771 13.5 9.00001C13.5 8.50231 13.4568 8.10001 12.96 8.10001V8.10001ZM14.76 12.6H7.74001C7.24321 12.6 7.20001 13.0023 7.20001 13.5C7.20001 13.9977 7.24321 14.4 7.74001 14.4H14.76C15.2568 14.4 15.3 13.9977 15.3 13.5C15.3 13.0023 15.2568 12.6 14.76 12.6ZM7.74001 5.40001H14.76C15.2568 5.40001 15.3 4.99771 15.3 4.50001C15.3 4.00231 15.2568 3.60001 14.76 3.60001H7.74001C7.24321 3.60001 7.20001 4.00231 7.20001 4.50001C7.20001 4.99771 7.24321 5.40001 7.74001 5.40001ZM4.86001 8.10001H3.24001C2.74321 8.10001 2.70001 8.50231 2.70001 9.00001C2.70001 9.49771 2.74321 9.90001 3.24001 9.90001H4.86001C5.35681 9.90001 5.40001 9.49771 5.40001 9.00001C5.40001 8.50231 5.35681 8.10001 4.86001 8.10001ZM4.86001 12.6H3.24001C2.74321 12.6 2.70001 13.0023 2.70001 13.5C2.70001 13.9977 2.74321 14.4 3.24001 14.4H4.86001C5.35681 14.4 5.40001 13.9977 5.40001 13.5C5.40001 13.0023 5.35681 12.6 4.86001 12.6ZM4.86001 3.60001H3.24001C2.74321 3.60001 2.70001 4.00231 2.70001 4.50001C2.70001 4.99771 2.74321 5.40001 3.24001 5.40001H4.86001C5.35681 5.40001 5.40001 4.99771 5.40001 4.50001C5.40001 4.00231 5.35681 3.60001 4.86001 3.60001Z" fill="black"/>
          </svg>,
          name: 'All Tasks',
          active: location.pathname === '/'
        }]}/>
        {itemsList ? (
          <List
            items={itemsList}
            colors={colors}
            isRemovable
            onRemoveList={(id) => onRemoveList(id)}
            activeItem={activeItem}
            onClickItem={list => {
              history.push(`/lists/${list.id}`);
            }}
          />
        ) : (
          'Loading...'
        )}
        <AddList onAddList={onAddList} colors={colors} lists={itemsList} />
      </div>
      <div className="todo__tasks">

        <Route exact path="/">
          {itemsList && 
            itemsList.map(item => (
              <Tasks 
                key={item.id} 
                list={item} 
                colors={colors}
                tasks={tasksList}
                onAddTask={onAddTask} 
                withoutEmpty={true}
                onRemoveTask={onRemoveTask}
                onCompleteTask={onCompleteTask}
              />
          ))}
        </Route>
        <Route path="/lists/:id">
          {itemsList && activeItem && (
            <Tasks 
              list={activeItem} 
              tasks={tasksList}
              colors={colors}
              onAddTask={onAddTask}
              onRemoveTask={onRemoveTask}
              onCompleteTask={onCompleteTask}
            />
          )}
        </Route>
      </div>
    </div>
  );
}

export default App;
