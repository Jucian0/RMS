

import "./styles.css";
import React, { useState } from "react";
import { useRMS } from "./rms/hooks";
import { store as storeContext } from "./usingRMS/store";

const TodoList = () => {

  const [inputText, setInputText] = useState('')

  const [state, mutation] = useRMS(
    storeContext,
    state => state.todos.todos 
  )

  const handleSubmit = (e) => {

    mutation({
      type: 'ADD_TODO',
      payload: { text: inputText, complete: false, id: Math.random() }
    })

    e.preventDefault();

    setInputText('');
  };

  const toggleTodo = (id) => mutation({
    type: 'TOGGLE_TODO',
    payload: id
  })

  const removeTodo = (id) => mutation({ type: 'REMOVE_TODO', payload: id })

  return (
    <section>
      <h2>RMS -> Reactive Management State</h2>
      <form onSubmit={handleSubmit}>
        <input value={inputText} onChange={(e) => setInputText(e.target.value)} />
        <button type="button" onClick={handleSubmit}>Novo</button>
        <button type="button" >Async Promise</button>
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


