import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../hooks/use-http';

const NewTask = (props) => {

  const {isLoading, error, sendRequest: sendTaskRequest}= useHttp();

  const enterTaskHandler = async (enteredTaskText) => {
     
    //hva skal vi gjøre med daten:
    const createTask = (taskData)=>{
      const generatedId = taskData.name; // firebase-specific => "name" contains generated id
      const newTask = {id: generatedId, text: enteredTaskText} /*forbinder key med det vi selv har skrevet*/
      props.onAddTask(newTask);
      console.log('sending request');
      console.log( taskData); //object
      console.log(taskData.name); //string
      
    };  

    sendTaskRequest({
      url: props.dbURL,
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: {text: enteredTaskText},
    }, createTask);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
