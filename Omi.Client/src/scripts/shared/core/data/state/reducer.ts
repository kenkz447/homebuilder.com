import { Action } from 'redux'
import { Map, fromJS } from 'immutable'
import { statePipe, statePipeWithAction } from '../../utilities'
import { REQUEST_SEND, REQUEST_RESPONSE, REQUEST_FAILED, REQUEST_CACHE_DELETE } from './keys'
import { RequestResponseAction, RequestFailedAction, RequestSendAction } from './actions'

const initReponse = (dataKey: string) => (state: Map<any, any>) => {
    return state.setIn([dataKey, 'response'], fromJS({}))
}

const deleteResponse = ({ dataKey }) => (state: Map<any, any>) => state.removeIn([dataKey, 'response'])
const setReponse = ({ dataKey, response }: RequestResponseAction) => (state: Map<any, any>) => state.setIn([dataKey, 'response'], fromJS(response))
const setStatus = ({ dataKey, status }) => (state: Map<any, any>) => state.setIn([dataKey, 'status'], fromJS(status))

const initState = Map({})

export const reducer = (state = initState, action: Action) => {
    switch (action.type) {
        case REQUEST_SEND:
            const requestSendAction = action as RequestSendAction
            return statePipe([setStatus({ dataKey: requestSendAction.dataKey, status: { processing: true } }),
            initReponse(requestSendAction.dataKey)
            ], state)
        case REQUEST_RESPONSE:
            const requestResponseAction = action as RequestResponseAction
            return statePipe([setReponse(requestResponseAction),
            setStatus({ dataKey: requestResponseAction.dataKey, status: { processing: false, reponse: true } })
            ], state)
        case REQUEST_FAILED:
            const { dataKey, error } = action as RequestFailedAction
            return statePipe([setStatus({ dataKey, status: { processing: false, error } })], state)
        case REQUEST_CACHE_DELETE:
            return statePipeWithAction([deleteResponse], state, action)
    }
    return state
}