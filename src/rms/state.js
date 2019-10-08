
export class State {

    constructor(initialState = {}) {
        this.subscribers = [];
        this.reducers = {};
        this.services = {};
        this.state = this.reduce(initialState, {});
    }

    setSync(reducer){
        this.reducers = Object.assign(this.reducers,reducer)
        return this
    }

    setAsync(service){
        this.services = Object.assign(this.services, service)
        console.log(this)
        return this
    }

    get value() {
        return this.state;
    }

    subscribe(fn) {
        this.subscribers = [...this.subscribers, fn];
        fn(this.value);
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== fn);
        };
    }

    dispatch(type, payload) {
        this.state = this.reduce(this.state, { type, payload });
        this.subscribers.forEach(fn => {
            fn(this.value)
        });
    }

    createMutations() {
        let mutations = {}
        for (let type in this.reducers) {
            mutations[type] = payload => this.dispatch(type, payload)
        }
        return mutations
    }

    reduce(state, action) {
        if (action.type) {
            return this.reducers[action.type](
                state,
                action.payload,
                this.createMutations()
            )
        }
        return state;
    }
}
