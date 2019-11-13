

import "./../styles.css";
import React from "react";
import { state as stateContext, StateTodo, TodoType } from "../state/state";
import { useMutation } from "../rm";

const TodoList = () => {

  const [state, { toggleTodo, removeTodo }] = useMutation<StateTodo, Array<TodoType>>(
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


