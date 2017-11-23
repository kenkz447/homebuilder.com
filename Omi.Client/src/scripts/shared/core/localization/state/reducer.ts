import { Map } from 'immutable'
import { CHANGE_CURRENT_LANGUAGE, ChangeCurrentLanguageAction } from './actions'
import { statePipeWithAction } from '../../utilities'

const changeCurrentLanguage = ({ language }: ChangeCurrentLanguageAction) => (state: Map<any, any>) => state.set('CURRENT_LANGUAGE', language)

const initState = Map({

})

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case CHANGE_CURRENT_LANGUAGE:
            return statePipeWithAction([changeCurrentLanguage], state, action)
        default:
            return state
    }
}