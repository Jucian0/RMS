
export type Method<TState, TPayload = any> = (state: TState, payload: TPayload) => TState

type Methods<TState, TPayload = any> =
    { [x: string]: Method<TState, TPayload>; }

export type Mutation<TPayload> = (payload: TPayload) => void


type Mutations<TPayload = any> =
    { [x: string]: Mutation<TPayload>; }

export type Subscribe<TState> = (state: TState) => void;

export interface Context<TState> {
    name: string;
    state: TState;
    methods: Methods<TState>;
}


export class StateMachine<TContext extends Context<TContext['state']>>{

    private context: TContext;
    private subscribers: Array<Subscribe<TContext["state"]>>;
    public mutations: TContext["methods"]

    constructor(context: TContext) {
        this.context = context
        this.subscribers = []
        this.mutations = {}
        this.actionCreator(context.methods)
    }

    get state() {
        return this.context.state
    }

    private actionCreator(methods: TContext["methods"]) {

        let mutations: { [x: string]: (payload: any) => void } = {}

        for (let method in methods) {

            mutations[method] = (payload: any) => this.dispatch(method, payload)
        }

        this.mutations = Object.assign({ mutations})

    }

    subscribe(fn: Subscribe<TContext['state']>) {
        this.subscribers = [...this.subscribers, fn]

        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== fn)
        }
    }

    private dispatch(type: string, payload: any) {
        const state = this.reduce(this.context.state, { type, payload })
        if (!state) {
            throw new Error('Reducer and SideEffect functions must return a value')
        } else if (typeof state === 'object') {
            this.context.state = state
        }

        this.subscribers.forEach((fn: (state: TContext["state"]) => void) => {
            fn(this.state)
        });
    }

    private reduce(state: TContext["state"], action: { type?: string; payload?: any; }): TContext["state"] | void {

        if (action.type) {

            const reducer = this.context.methods[action.type]

            if (reducer && typeof reducer === 'function') {
                return reducer(
                    state,
                    action.payload
                )
            }


        }
        return state
    }

}