import React, { useEffect, useState} from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

import useHttp from './components/hooks/use-http';

const DATABASE_URL = 'https://react-http-d1368-default-rtdb.europe-west1.firebasedatabase.app/tasks.json';

/*const requestConfig = {
  url: DATABASE_URL,
  method: '',
  header
};*/

function App() {
  
  const [tasks, setTasks] = useState([]);
  
  const {isLoading, error, sendRequest:fetchTasks } = useHttp();

  useEffect(() => {
    const transformData =  (taskObjectData)=>{
      const loadedTasks = [];
        for (const taskKey in taskObjectData){
          loadedTasks.push({ id: taskKey, text: taskObjectData[taskKey].text });
        }
        setTasks(loadedTasks);
    };

    fetchTasks({url:DATABASE_URL}, transformData);

  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} dbURL={DATABASE_URL}/>
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
