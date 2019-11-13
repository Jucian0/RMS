import Axios from "axios";
import { StateMachine, Method, Service } from "../rm/StateMachine";

export type TodoType = {
    id: string
    text: string,
    complete: boolean
}

export interface StateTodo {
    todos: Array<TodoType>;
    loading: boolean;
}

const INITIAL_STATE: StateTodo = {
    todos: [],
    loading: false
};

const removeTodo: Method<StateTodo, string> = (state, payload) => ({
    ...state,
    todos: state.todos.filter(item => item.id !== payload)
})

const addTodo: Method<StateTodo, TodoType> = (state, payload) => ({
    ...state,
    todos: state.todos.concat(payload)
})

const toggleTodo: Method<StateTodo, string> = (state, payload) => ({
    ...state,
    todos: state.todos.map(item => ({
        ...item,
        complete: item.id === payload ? !item.complete : item.complete
    }))
})

const getTodo: Method<StateTodo, Array<TodoType>> = (state, payload) => ({
    ...state,
    todos: [...state.todos, ...payload.map((item: any) => ({
        id: item.id,
        text: item.slug,
        complete: false
    }))]
})


export const getAll = async () => {
    let { data } = await Axios.get('http://www.hackintoshworld.com/wp-json/wp/v2/posts')

    return state.actions["getTodo"](data)
}


const reset = () => INITIAL_STATE

export const state = new StateMachine<StateTodo>({
    name: 'todo',
    state: INITIAL_STATE,
    methods: {
        addTodo,
        removeTodo,
        toggleTodo,
        reset,
        getTodo
    }
})
