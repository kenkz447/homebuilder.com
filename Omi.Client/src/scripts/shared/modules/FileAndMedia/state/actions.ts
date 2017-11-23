import { Action } from 'redux'

import { FileType, FileEntityInfo } from '../Types'
export const MODAL_OPEN = 'FILE_AND_MEDIA@MODAL_OPEN'
export const MODAL_CLOSE = 'FILE_AND_MEDIA@MODAL_CLOSE'
export const MODAL_OK = 'FILE_AND_MEDIA@MODAL_OK'
export const FILES_ITEM_CLICK = 'FILE_AND_MEDIA@FILES_ITEM_CHECK'
export const SET_CHECKED_FILES = 'FILE_AND_MEDIA@SET_CHECKED_FILES'
export const SET_RECENT_UPLOAD_FILES = 'FILE_AND_MEDIA@SET_RECENT_UPLOAD_FILES'
export const DELETE_FILE = 'FILE_AND_MEDIA@DELETE_FILE'

export interface OpenModalAction {
    handleKey: string
    acceptType: FileType
    allowSelectMulti?: boolean
    inputName?: string
}

export interface OkModalAction extends Action {

}

export interface FileItemClickAction extends Action {
    fileInfo: FileEntityInfo
}

export interface SetCheckedFilesAction {
    files: Array<FileEntityInfo>
}

export interface SetRecentUploadFilesAction {
    files: Array<FileEntityInfo>
}

export const OpenModal = (payload: OpenModalAction): OpenModalAction & Action => ({
    type: MODAL_OPEN,
    ...payload
})

export const CloseModal = () => ({
    type: MODAL_CLOSE
})

export const OkModal = (): OkModalAction => ({
    type: MODAL_OK
})

export const SetCheckedFiles = (payload: SetCheckedFilesAction): SetCheckedFilesAction & Action => ({
    type: SET_CHECKED_FILES,
    ...payload
})

export const SetRecentUploadFiles = (payload: SetRecentUploadFilesAction): SetRecentUploadFilesAction & Action => ({
    type: SET_RECENT_UPLOAD_FILES,
    ...payload
})


export const FileItemClick = (fileInfo: FileEntityInfo): FileItemClickAction => ({
    type: FILES_ITEM_CLICK, fileInfo
})