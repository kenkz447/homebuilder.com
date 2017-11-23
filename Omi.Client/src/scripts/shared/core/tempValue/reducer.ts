import { Action } from 'redux'
import { Map } from 'immutable'
import { statePipeWithAction } from '../utilities'
import {
    GET_TEMP_VALUE, SET_TEMP_VALUE,
    GetTempValueAction, SetTempValueAction
} from './actions'

const getTempValue = (action: GetTempValueAction) => (state: Map<any, any>) => state.get(action.tempKey)
const setTempValue = (action: SetTempValueAction) => (state: Map<any, any>) => state.set(action.tempKey, action.tempValue)

const initState = Map({

})

export const reducer = (state = initState, action: Action) => {
    switch (action.type) {
        case GET_TEMP_VALUE:
            return statePipeWithAction([getTempValue], state, action)
        case SET_TEMP_VALUE:
            return statePipeWithAction([setTempValue], state, action)
    }
    return state
}