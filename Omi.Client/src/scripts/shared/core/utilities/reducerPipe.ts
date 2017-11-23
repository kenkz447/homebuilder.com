const applyFn =  (state, fn) => fn(state)

export const statePipe = (fns, state) =>
    state.withMutations((s) => fns.reduce(applyFn, s))

const applyFnWithAction = (action) => (state, fn) => fn(action)(state)
    
export const statePipeWithAction = (mutators, state, action) =>
    state.withMutations((s) => mutators.reduce(applyFnWithAction(action), s))
