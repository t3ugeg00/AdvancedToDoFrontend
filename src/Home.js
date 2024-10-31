import './Home.css';

import Row from './Row';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from './context/useUser';

const URL = process.env.REACT_APP_API_URL;

function Home() {

  const { user } = useUser();
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(URL)
    .then(response => {
      setTasks(response.data);
    }).catch(error => {
      alert(error.response.data.error ? error.response.data.error : error);
    })
  },[]);

  function inputChange(event) {
    setTask(event.target.value);
  }

  function keyPressed(event) {
    if (event.key == 'Enter') {
      event.preventDefault();

      const headers = {headers: {Authorization: user.token}};

      axios.post(URL + 'create',{
        description: task
      }, headers)
      .then(response => {
        setTasks([...tasks, {id: response.data.id, description: response.data.description}]);
        setTask('');
      }).catch(error => {
        alert(error.response.data.error ? error.response.data.error : error);
      })
    }
  }

  function remover(id) {
    const headers = {headers: {Authorization: user.token}};

    axios.delete(`${URL}delete/${id}`, headers)
    .then(response => {
      setTasks(
        tasks.filter(element => element.id != id)
      )
    }).catch(error => {
      alert(error.response.data.error ? error.response.data.error : error);
    })
  }

  return (
    <div id="container">
      <h3>Todos</h3>
      <form>
        <input placeholder='Your task' onChange={inputChange} onKeyDown={keyPressed} value={task}/>
      </form>
      <ul>
        {tasks.map(element =>
          <Row key={element.id} element={element} remover={remover}/>
        )}
      </ul>
    </div>
  );
}

export default Home;
