import { fromJS, List, Map } from 'immutable'

import { statePipe, statePipeWithAction } from '../../../core'
import {
    FileItemClickAction,
    FILES_ITEM_CLICK,
    MODAL_CLOSE,
    MODAL_OK,
    MODAL_OPEN,
    SET_CHECKED_FILES,
    OkModalAction,
    OpenModalAction,
    SetCheckedFilesAction,
    SET_RECENT_UPLOAD_FILES,
    SetRecentUploadFilesAction
} from './actions'

const openModal = (action: OpenModalAction) => (state: Map<any, any>) => state.set('visible', true)
const closeModal = (action: OpenModalAction) => (state: Map<any, any>) => state.set('visible', false)
const setAllowSelectMulti = (action: OpenModalAction) => (state: Map<any, any>) => state.set('allowSelectMulti', action.allowSelectMulti)
const setAcceptType = (action: OpenModalAction) => (state: Map<any, any>) => state.set('acceptType', action.acceptType)
const setSelectedResult = (action: OkModalAction) => (state: Map<any, any>) => {
    const allowSelectMulti = state.get('allowSelectMulti') as boolean
    const CHECKED_FILE = state.get('CHECKED_FILES') as List<Map<any, any>>

    return state.setIn(['selected', state.get('handleKey')], allowSelectMulti ? CHECKED_FILE : CHECKED_FILE.first())
}
const setActiveHandleKey = (action: OpenModalAction) => (state: Map<any, any>) => state.set('handleKey', action.handleKey)
const checkOrUncheckFile = (action: FileItemClickAction) => (state: Map<any, any>) => {
    const allowSelectMulti = state.get('allowSelectMulti') as boolean
    const checkedFiles = state.get('CHECKED_FILES') as List<Map<any, any>>

    const existFileInfo = checkedFiles && checkedFiles.find((o) => o.get('fileId') == action.fileInfo.fileId)

    const fileInfoImmu = fromJS(action.fileInfo)
    const newCheckedFiles =
        (!existFileInfo) ?
            (allowSelectMulti ? checkedFiles.push(fileInfoImmu) : List([fileInfoImmu]))
            : checkedFiles.remove(checkedFiles.indexOf(existFileInfo))

    state.set('CHECKED_FILES', newCheckedFiles)
    return state
}

const clearCheckedFiles = (action: OpenModalAction) => (state: Map<any, any>) => state.delete('CHECKED_FILES')
const setCheckedFiles = ({ files }: SetCheckedFilesAction) => (state: Map<any, any>) => state.set('CHECKED_FILES', fromJS(files || []))

const clearInitCheckedFiles = (action: OpenModalAction) => (state: Map<any, any>) => state.delete('INIT_CHECKED_FILES')
const setInitCheckedFiles = ({ files }: SetCheckedFilesAction) => (state: Map<any, any>) => state.set('INIT_CHECKED_FILES', fromJS(files))

const setRecentUploadFiles = ({ files }: SetRecentUploadFilesAction) => (state: Map<any, any>) => state.set('RECENT_UPLOAD_FILES', fromJS(files))
const clearRecentUploadFiles = ({ files }: SetRecentUploadFilesAction) => (state: Map<any, any>) => state.delete('RECENT_UPLOAD_FILES')

const initState = Map({
    CHECKED_FILE: List()
})

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case MODAL_OPEN:
            return statePipeWithAction([
                openModal,
                setActiveHandleKey,
                setAcceptType,
                setAllowSelectMulti,
                clearInitCheckedFiles,
                clearRecentUploadFiles,
                clearCheckedFiles],
                state, action)
        case MODAL_CLOSE:
            return statePipeWithAction([closeModal], state, action)
        case MODAL_OK:
            return statePipeWithAction([
                setSelectedResult,
                closeModal],
                state, action)
        case FILES_ITEM_CLICK:
            return statePipeWithAction([checkOrUncheckFile], state, action)
        case SET_CHECKED_FILES:
            return statePipeWithAction([setCheckedFiles, setInitCheckedFiles], state, action)
        case SET_RECENT_UPLOAD_FILES:
            return statePipeWithAction([setRecentUploadFiles], state, action)
    }
    return state
}