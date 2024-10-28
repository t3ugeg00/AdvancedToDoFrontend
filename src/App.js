import './App.css';

import { useState } from 'react';

function App() {

  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  function inputChange(event) {
    setTask(event.target.value);
  }

  function keyPressed(event) {
    if (event.key == 'Enter') {
      event.preventDefault();

      let setter = [...tasks];
      setter.push(task);

      setTask('');

      setTasks([...setter]);
    }
  }

  function remover(taskName) {
    const setter = tasks.filter(element => element != taskName);

    setTasks([...setter]);
  }

  return (
    <div id="container">
      <h3>Todos</h3>
      <form>
        <input placeholder='Your task' onChange={inputChange} onKeyDown={keyPressed} value={task}/>
      </form>
      <ul>
        {tasks.map(element => <li>
          {element} <button className='delete-button' onClick={() => {remover(element)}}>Delete</button>
        </li>)}
      </ul>
    </div>
  );
}

export default App;
