import { useState } from 'react';

export const useRMS = (stateContext, fn) => {
    const [state$, setState] = useState(stateContext.value)

    const state = () => {
        const unSub = stateContext.subscribe(
            newState => {
                if (state$ !== newState) {
                    setState(newState)
                    unSub()
                }
            }
        )
        return fn(stateContext.value)
    }

    if(fn){
        if(typeof fn !== 'function'){
            throw new Error("Second parameter just a function callback")
        }
        return [state(),stateContext.actions]
    }

    return [stateContext.actions]
}

export const useSideEffect = (stateContext)=>[stateContext.sideEffects]
