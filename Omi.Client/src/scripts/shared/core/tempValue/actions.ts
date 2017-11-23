import { Action } from 'redux'

export const SET_TEMP_VALUE = 'CORE@SET_TEMP_VALUE'
export const GET_TEMP_VALUE = 'CORE@GET_TEMP_VALUE'

export interface SetTempValueAction extends Action {
    tempKey: any
    tempValue: any
}

export interface GetTempValueAction extends Action {
    tempKey: any
}

export const SetTempValue = (tempKey, tempValue): SetTempValueAction => ({
    type: SET_TEMP_VALUE, tempKey, tempValue
})

export const GetTempValue = (tempKey): GetTempValueAction => ({
    type: GET_TEMP_VALUE, tempKey
})