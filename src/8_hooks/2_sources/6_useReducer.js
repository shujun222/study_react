import { render } from "../1_expmple"

let lastValue
export function useReducer(reducer, initValue) {
    lastValue = lastValue || initValue

    const dispatch = (newAction) => {
        lastValue = reducer(lastValue, newAction)
        render()
    }

    return [lastValue, dispatch]
}