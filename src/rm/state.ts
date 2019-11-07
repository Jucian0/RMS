import { objectValidation, functionsValidation } from "."
import { EffectAndActions } from ".";
import { Reducers, SideEffects } from "./types";


export class State<S> {

    private subscribers: Array<(state: S) => void>;
    private reducers: Reducers;
    private sideEffects: SideEffects;
    private state: S;
    public actions: EffectAndActions;
    public effects: EffectAndActions;

    constructor(initialState: any = {}) {
        objectValidation(initialState, 'InitialState')
        this.subscribers = []
        this.reducers = {}
        this.state = this.reduce(initialState, {})
        this.actions = {}
        this.effects = {}
        this.sideEffects = {}
    }

    setReducer(reducer: Function): State<S> {
        functionsValidation(reducer, 'reducer')
        this.reducers = Object.assign(this.reducers, { [reducer.name]: reducer })
        this.actionCreator()
        return this
    }

    setSideEffect(sideEffect: Function): State<S> {
        functionsValidation(sideEffect, 'effect')
        this.sideEffects = Object.assign(this.sideEffects, { [sideEffect.name]: sideEffect })
        this.effectCreator()
        return this
    }

    get getState() {
        return this.state
    }

    subscribe(fn: (state: S) => void) {
        functionsValidation(fn, 'subscriber')
        this.subscribers = [...this.subscribers, fn]
        return () => {
            this.subscribers = this.subscribers.filter((sub: any) => sub !== fn)
        };
    }

    dispatch(type: string, payload: any) {
        const state = this.reduce(this.state, { type, payload })
        if (!state) {
            throw new Error('Reducer and SideEffect functions must return a value')
        } else if (typeof state === 'object') {
            this.state = state
        }

        this.subscribers.forEach((fn: (arg0: any) => void) => {
            fn(this.getState)
        });
    }

    effectCreator() {
        for (let type in this.sideEffects) {
            this.effects[type] = (payload: any) => this.dispatch(type, payload)
        }
    }

    actionCreator() {
        for (let type in this.reducers) {
            this.actions[type] = (payload: any) => this.dispatch(type, payload)
        }
    }

    reduce<TState>(state: TState, action: { type?: any; payload?: any; }): TState | void {

        if (action.type) {

            const reducer = this.reducers[action.type]
            const sideEffect = this.sideEffects[action.type]

            if (reducer && typeof reducer === 'function') {
                return this.reducers[action.type](
                    state,
                    action.payload
                )
            } else if (sideEffect && typeof sideEffect === 'function') {
                this.sideEffects[action.type](
                    state,
                    action.payload,
                    this.actions
                )

                return state
            }

        }
        return state
    }
}
