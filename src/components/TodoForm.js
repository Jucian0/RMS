

import "./../styles.css";
import React, { useState } from "react";
import { useRMS, useSideEffect } from "../rms/hooks";
import { state as stateContext } from "../usingRMS/state";

const TodoForm = () => {

    const [inputText, setInputText] = useState('')

    const [{ addTodo, reset }] = useRMS(stateContext)
    const [{asyncTodo}] = useSideEffect(stateContext)

    const add = () => {
        addTodo({ text: inputText, complete: false, id: Math.random() })
        setInputText('')
    }

    return (
        <section>
            <h2>RMS -> Reactive Management State</h2>
            <form>
                <input value={inputText} onChange={(e) => setInputText(e.target.value)} />
                <button type="button" onClick={add}>Novo</button>
                <button type="button" onClick={asyncTodo}>Async Promise</button>
                <button type="button" onClick={reset}>RESET</button>
            </form>
        </section>
    );
}

export default TodoForm;


