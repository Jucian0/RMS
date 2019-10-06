import { Store } from "../rms/store";


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

export function todosReducer(state = INITIAL_STATE, action, mutations) {
    console.log(mutations)
    switch (action.type) {
        case 'ADD_TODO': return addTodo(state, action)
        case 'TOGGLE_TODO': return toggleTodo(state, action)
        case 'REMOVE_TODO': return removeTodo(state, action)
    }
    return state;
}

export const store = new Store({ todos: INITIAL_STATE }, { todos: todosReducer })



