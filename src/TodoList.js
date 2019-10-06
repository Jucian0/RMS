

import "./styles.css";
import React, { useState } from "react";
import { useRMS } from "./rms/hooks";
import { state as stateContext } from "./usingRMS/state";

const TodoList = () => {

  const [inputText, setInputText] = useState('')

  const [state, dispatch] = useRMS(
    stateContext,
    state => state.todos.todos 
  )

  const handleSubmit = (e) => {

    dispatch({
      type: 'ADD_TODO',
      payload: { text: inputText, complete: false, id: Math.random() }
    })

    e.preventDefault();

    setInputText('');
  };

  const toggleTodo = (id) => dispatch({
    type: 'TOGGLE_TODO',
    payload: id
  })

  const removeTodo = (id) => dispatch({ type: 'REMOVE_TODO', payload: id })
  const asyncTodo = (id) => dispatch({ type: 'ASYNC_TODO' })


  return (
    <section>
      <h2>RMS -> Reactive Management State</h2>
      <form onSubmit={handleSubmit}>
        <input value={inputText} onChange={(e) => setInputText(e.target.value)} />
        <button type="button" onClick={handleSubmit}>Novo</button>
        <button type="button" onClick={asyncTodo}>Async Promise</button>
        <button type="button" >RESET</button>
      </form>

      <ul>
        {state.map(todo => (
          <li key={todo.id}>
            {todo.complete ? <s>{todo.text}</s> : todo.text}
            <div>
              <button onClick={() => toggleTodo(todo.id)}>Toggle</button>
              <button onClick={() => removeTodo(todo.id)} >Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TodoList;


