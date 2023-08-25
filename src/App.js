import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AddTodo } from './components/AddTodo';
import { TodoLists } from './components/TodoLists';
import { Add } from './components/Add';
import './App.css'

const App = () => {
  return (
    <div className="container">
      {/* <h2>Todo Application</h2> */}
      <Add/>
      {/* <AddTodo /> */}
      {/* <TodoLists /> */}
    </div>
  );
}

export default App;