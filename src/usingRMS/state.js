import { State } from "../rms/state";
import Axios from "axios";


const INITIAL_STATE = {
    todos: [],
    loading: false
};

const removeTodo = (state, action) => ({
    ...state,
    todos: state.todos.filter(item => item.id !== action.payload)
})

const addTodo = (state, action) => ({
    ...state,
    todos: state.todos.concat(action.payload)
})

const toggleTodo = (state, action) => ({
    ...state,
    todos: state.todos.map(item => ({
        ...item,
        complete: item.id === action.payload ? !item.complete : item.complete
    }))
})

const asyncTodo = (state, action, dispatch) => {
    Axios.get('http://www.hackintoshworld.com/wp-json/wp/v2/posts')
        .then(resp =>
            resp.data.filter(item => item.slug !== "macos-10-13-4-update")
        )
        .then(data => dispatch({ type: 'ASYNC_FINISH', payload: data }))

    return state
}

const asyncFinish = (state, action) => ({
    ...state,
    todos: [...state.todos, ...action.payload.map(item => ({
        id: item.id,
        text: item.slug,
        complete: false
    }))]
})

export function todosReducer(state = INITIAL_STATE, action, dispatch) {
    switch (action.type) {
        case 'ASYNC_TODO': return asyncTodo(state, action, dispatch)
        case 'ASYNC_FINISH': return asyncFinish(state, action)
        case 'ADD_TODO': return addTodo(state, action)
        case 'TOGGLE_TODO': return toggleTodo(state, action)
        case 'REMOVE_TODO': return removeTodo(state, action)
    }
    return state;
}

export const state = new State({ todos: INITIAL_STATE }, { todos: todosReducer })



