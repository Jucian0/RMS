
export type Method<TState, TPayload = any> = (state: TState, payload: TPayload) => TState
export type Service<TState, TPayload = any> = (state: TState, payload: TPayload) => Promise<TState>

type Methods<TState, TPayload = any> =
    { [x: string]: Method<TState, TPayload>; }

export type Services<TState, TPayload = any> =
    { [x: string]: Service<TState, TPayload> };

export type Subscribe<TState> = (state: TState) => void;

export interface Context<TState> {
    name: string;
    state: TState;
    methods: Methods<TState>;
    services?: Services<TState>
}


export class StateMachine<TState = any>{

    public context: Context<TState>;
    private subscribers: Array<Subscribe<TState>>;
    public actions: any

    constructor(context: Context<TState>) {
        this.context = context
        this.subscribers = []
        this.actions = {}
        this.actionCreator(context.methods, context.services)
    }

    get state() {
        return this.context.state
    }

    actionCreator(methods: Methods<TState>, services?: Services<TState>) {
        for (let method in { ...methods, ...services }) {
            console.log(method)
            this.actions[method] = (payload: any) => this.dispatch(method, payload)
        }
    }

    subscribe(fn: Subscribe<TState>) {
        this.subscribers = [...this.subscribers, fn]

        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== fn)
        }
    }

    public dispatch(type: string, payload: any) {
        const state = this.reduce(this.context.state, { type, payload })
        if (!state) {
            throw new Error('Reducer and SideEffect functions must return a value')
        } else if (typeof state === 'object') {
            this.context.state = state
        }

        this.subscribers.forEach((fn: (state: TState) => void) => {
            fn(this.state)
        });
    }

    private reduce(state: TState, action: { type?: string; payload?: any; }): TState | void {

        if (action.type) {

            const reducer = this.context.methods[action.type]
            const service = this.context.services && this.context.services[action.type]

            if (reducer && typeof reducer === 'function') {
                return reducer(
                    state,
                    action.payload
                )
            }else if(service && typeof service === 'function'){
                let newState = state
                 service(state, action.payload).then(resp => {
                     newState = resp
                 })

                 return newState
            }


        }
        return state
    }

}