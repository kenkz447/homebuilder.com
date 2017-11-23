import { Action } from 'redux'

import { REQUEST_FAILED, REQUEST_RESPONSE, REQUEST_SEND, REQUEST_CACHE_DELETE } from './keys'

export interface RequestSendAction extends Action {
    dataKey: string
    url: string
    requestInit: RequestInit
}

const processUrl = (url: string) => {
    if (url.startsWith('https://') || url.startsWith('http://'))
        return url

    // window.baseUrl was declared in app init
    return new URL(`/api${url}`, window.baseUrl).href
}

export function RequestSend(dataKey: string, payload: {
    url: string,
    requestInit?: RequestInit
}): RequestSendAction {
    let requestUrl = processUrl(payload.url)

    const currentUrl = new URL(window.location.href)
    const inputLanguage = currentUrl.searchParams.get('input-language')
    if (inputLanguage) {
        const requestURL = new URL(requestUrl)
        requestURL.searchParams.set('input-language', inputLanguage)
        requestUrl = requestURL.toString()
    }

    return {
        type: REQUEST_SEND,
        dataKey,
        url: requestUrl,
        requestInit: payload.requestInit
    }
}

export interface RequestResponseAction extends Action {
    dataKey: string
    response: any
}

export const RequestResponse = (dataKey: string, response: any): RequestResponseAction => ({
    type: REQUEST_RESPONSE, dataKey, response
})

export interface RequestFailedAction extends Action {
    dataKey: string,
    error: string
}

export const RequestFailed = (dataKey: string, error: string): RequestFailedAction => ({
    type: REQUEST_FAILED, dataKey, error
})

export const RequestCacheDelete = (dataKey: string) => ({
    type: REQUEST_CACHE_DELETE, dataKey
})