import { State } from "../rms/state";
import Axios from "axios";


const INITIAL_STATE = {
    todos: [],
    loading: false
};

const removeTodo = (state, payload) => ({
    ...state,
    todos: state.todos.filter(item => item.id !== payload)
})

const addTodo = (state, payload) => ({
    ...state,
    todos: state.todos.concat(payload)
})

const toggleTodo = (state, payload) => ({
    ...state,
    todos: state.todos.map(item => ({
        ...item,
        complete: item.id === payload ? !item.complete : item.complete
    }))
})

const asyncTodo = (state, payload, { asyncFinish }) => {
    Axios.get('http://www.hackintoshworld.com/wp-json/wp/v2/posts')
        .then(resp => asyncFinish(resp.data))
    return state
}

const asyncFinish = (state, payload) => {
    return {
        ...state,
        todos: [...state.todos, ...payload.map(item => ({
            id: item.id,
            text: item.slug,
            complete: false
        }))]
    }
}

const reset = () => INITIAL_STATE

export const state = new State(INITIAL_STATE)
    .setSync({ addTodo })
    .setSync({ removeTodo })
    .setSync({ toggleTodo })
    .setSync({ asyncTodo })
    .setSync({ asyncFinish })
    .setSync({ reset })
    .setAsync({})



