import { useState, useEffect } from 'react';
import { StateMachine, Context } from './StateMachine';

export const useMutation =
    <TContext extends Context<TContext["state"]>, TR>(stateContext: StateMachine<TContext>, fn?: (state: TContext['state']) => TR) => {

        const [state, setState] = useState<TContext['state']>(stateContext.state)

        useEffect(() => stateContext.subscribe(setState), [])

        if (fn) {
            if (typeof fn !== 'function') {
                throw new Error("Second parameter just a function callback")
            }
            return fn(state)
        }
    }