
import { RequestSend } from '../../core'

export const FILES_DATA_KEY = 'files'
export const uploadURL = new URL('/api/files/upload', window.baseUrl)

export const GetFetchFilesAction = () => RequestSend(
    FILES_DATA_KEY,
    {
        url: `/files/getFiles`,
        requestInit: {
            credentials: 'include'
        }
    }
)