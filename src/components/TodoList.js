

import "./../styles.css";
import React, { useState } from "react";
import { useRMS } from "./../rms/hooks";
import { state as stateContext } from "./../usingRMS/state";

const TodoList = () => {


  const [state, { toggleTodo, removeTodo }] = useRMS(
    stateContext,
    state => state.todos
  )


  return (
    <section>
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


