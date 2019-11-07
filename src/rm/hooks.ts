import { useState, useEffect } from 'react';
import { State } from './state';

type ReturnHook<TR> = [TR, { [x: string]: (payload: any) => void; }] |
    [{ [x: string]: (payload: any) => void; }];


export const useStateFul = <TState, TR>(stateContext: State<TState>, fn?: (state: TState) => TR) => {

    const [state, setState] = useState<TState>(stateContext.getState)

    useEffect(() => stateContext.subscribe(setState), [])

    if (fn) {
        if (typeof fn !== 'function') {
            throw new Error("Second parameter just a function callback")
        }
        return [fn(state), stateContext.actions]
    }

    return [stateContext.actions]
}

export const useSideEffect = <TState, TR>(stateContext: State<TState>, fn?: (state: TState) => TR) => {
    const [state, setState] = useState<TState>(stateContext.getState)

    useEffect(() => stateContext.subscribe(setState), [])

    if (fn) {
        if (typeof fn !== 'function') {
            throw new Error("Second parameter just a function callback")
        }
        return [fn(state), stateContext.effects]
    }

    return [stateContext.effects]
}