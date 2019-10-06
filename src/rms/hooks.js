import { useState } from 'react';


export const useRMS = (stateContext, fn) => {
    const [state$, setState] = useState(stateContext.value)

    const state = () => {
        stateContext.subscribe(
            newState => {
                if (state$ !== newState)
                    setState(newState)
            }
        )
        return fn(state$)
    }

    const dispatch = (action) => stateContext.dispatch(action)

    return [
        state(), dispatch
    ]
}
