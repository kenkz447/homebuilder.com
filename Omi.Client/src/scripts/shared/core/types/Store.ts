import { RootState } from './RootState'

export type Store = {
    getState: () => RootState,
    dispatch: Function
}