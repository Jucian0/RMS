

import "./../styles.css";
import React from "react";
import { state as stateContext } from "../state/state";
import { useMutation } from "../rm";

const TodoList = () => {

  const state = useMutation(
    stateContext,
    state => state.todos
  )


  return (
    <section>
      <ul>
        {Array.isArray(state) && state.map((todo: any) => (
          <li key={todo.id}>
            {todo.complete ? <s>{todo.text}</s> : todo.text}
            <div>
              <button onClick={() => stateContext.mutations.toggleTodo(stateContext.state, todo.id)}>Toggle</button>
              <button onClick={() => stateContext.mutations.removeTodo(stateContext.state,todo.id)} >Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TodoList;


