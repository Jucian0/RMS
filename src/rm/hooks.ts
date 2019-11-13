import { useState, useEffect } from 'react';
import { StateMachine } from './StateMachine';

type ReturnHook<TR> = [TR, { [x: string]: (payload: any) => void; }] |
    [{ [x: string]: (payload: any) => void; }];


export const useMutation = <TState, TR>(stateContext: StateMachine<TState>, fn?: (state: TState) => TR) => {

    const [state, setState] = useState<TState>(stateContext.state)

    useEffect(() => stateContext.subscribe(setState), [])

    if (fn) {
        if (typeof fn !== 'function') {
            throw new Error("Second parameter just a function callback")
        }
        return [fn(state), stateContext.actions]
    }

    return [stateContext.actions]
}