import { RequestSend } from 'shared/core'

export const getTags = RequestSend(
    'GET_BLOG_TAGS', {
        url: `/blog/GetAllTag`,
        requestInit: {
            method: 'Get',
            credentials: 'include'
        }
    })