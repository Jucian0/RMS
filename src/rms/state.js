export class State {

    constructor(initialState = {}) {
        this.subscribers = []
        this.reducers = {}
        this.state = this.reduce(initialState, {})
        this.actions = {}
        this.effects = {}
        this.sideEffects = {}
    }

    setReducer(reducer) {
        this.reducers = Object.assign(this.reducers, reducer)
        this.actionCreator()
        return this
    }

    setEffect(effect) {
        this.effects = Object.assign(this.effects, effect)
        this.effectCreator()
        return this
    }

    get value() {
        return this.state
    }

    subscribe(fn) {
        this.subscribers = [...this.subscribers, fn]
        fn(this.value)
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== fn)
        };
    }

    dispatch(type, payload) {
        const state = this.reduce(this.state, { type, payload })
        if (!state) {
            throw new Error('Reducer and SideEffect functions must return a value')
        } else if (typeof state === 'object' ) {
            this.state = state
        }


        this.subscribers.forEach(fn => {
            fn(this.value)
        });
    }

    effectCreator() {
        for (let type in this.effects) {
            this.sideEffects[type] = payload => this.dispatch(type, payload)
        }
    }

    actionCreator() {
        for (let type in this.reducers) {
            this.actions[type] = payload => this.dispatch(type, payload)
        }
    }

    reduce(state, action) {

        if (action.type) {

            const reducer = this.reducers[action.type]
            const effect = this.effects[action.type]

            if (reducer && typeof reducer === 'function') {
                return this.reducers[action.type](
                    state,
                    action.payload
                )
            } else if (effect && typeof effect === 'function') {
                return this.effects[action.type](
                    state,
                    action.payload,
                    this.actions
                )
            }

        }
        return state
    }
}
