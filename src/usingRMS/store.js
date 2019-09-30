import { Store } from "../rms/store";


const INITIAL_STATE = {
    todos: [],
    loading: false
};

export function todosReducer(
    state = INITIAL_STATE,
    action
) {
    
    switch (action.type) {
        case 'ADD_TODO': {
            const todo = action.payload;
            const todos = [...state.todos, todo];
            return {
                ...state,
                todos,
            };
        }

        case 'TOGGLE_TODO': {
            const todos = state.todos.map(item => ({
                ...item,
                complete: item.id === action.payload ? !item.complete : item.complete
            }))

            return {
                ...state,
                todos,
            };
        }

        case 'REMOVE_TODO': {
            const todos = state.todos.filter(item => item.id !== action.payload)

            return {
                ...state,
                todos,
            };
        }
    }
    return state;
}

export const store = new Store({todos:INITIAL_STATE}, { todos: todosReducer })





// const removeTodo = (state = INITIAL_STATE, action) => ({
//     ...state,
//     todos: state.todos.filter(item => item.id !== action.payload)
// })

// const addTodo = (state = INITIAL_STATE, action) => ({
//     ...state,
//     todos: state.todos.concat(action.payload)
// })

// const toggleTodo = (state = INITIAL_STATE, action) => ({
//     ...state,
//     todos: state.todos.map(item => ({
//         ...item,
//         complete: item.id === action.payload ? !item.complete : item.complete
//     }))
// })

// export const store = new Store(
//     { todos: INITIAL_STATE },
//     {
//         addTodo,
//         toggleTodo,
//         removeTodo
//     }
// )

