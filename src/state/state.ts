import Axios from "axios";
import { State, Reducer, SideEffect } from "../rm";

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

const removeTodo: Reducer<StateTodo> = (state, payload) => ({
    ...state,
    todos: state.todos.filter(item => item.id !== payload)
})

const addTodo: Reducer<StateTodo> = (state, payload) => ({
    ...state,
    todos: state.todos.concat(payload)
})

const toggleTodo: Reducer<StateTodo> = (state, payload) => ({
    ...state,
    todos: state.todos.map(item => ({
        ...item,
        complete: item.id === payload ? !item.complete : item.complete
    }))
})

const asyncTodo: SideEffect<StateTodo> = (_, __, { asyncFinish }) =>
    Axios.get('http://www.hackintoshworld.com/wp-json/wp/v2/posts')
        .then(resp => asyncFinish(resp.data))


const asyncFinish: Reducer<StateTodo> = (state, payload) => {
    return {
        ...state,
        todos: [...state.todos, ...payload.map((item: any) => ({
            id: item.id,
            text: item.slug,
            complete: false
        }))]
    }
}

const reset = () => INITIAL_STATE

export const state = new State<StateTodo>(INITIAL_STATE)
    .setReducer(addTodo)
    .setReducer(removeTodo)
    .setReducer(toggleTodo)
    .setReducer(asyncFinish)
    .setReducer(reset)
    .setSideEffect(asyncTodo)
