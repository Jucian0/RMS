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

    return [
        state(), stateContext.createMutations()
    ]
}
