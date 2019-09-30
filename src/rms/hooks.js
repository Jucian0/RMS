import { useState } from 'react';


export const useRMS = (storeContext, fn) => {
    const [state$, setState] = useState(storeContext.value)

    const state = () => {
        storeContext.subscribe(
            newState => {
                if (state$ !== newState)
                    setState(newState)
            }
        )
        return fn(state$)
    }

    const mutation = (action) => storeContext.mutation(action)

    return [
        state(), mutation
    ]
}
