import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import * as React from 'react'
import { Editor as DraftEditor } from 'react-draft-wysiwyg'
import { uploadURL, FileEntityInfo } from 'shared/modules/FileAndMedia'

function uploadImageCallBack(file) {
    return new Promise(
        (resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open('POST', uploadURL.href)
            xhr.withCredentials = true
            const data = new FormData()
            data.append('image', file)
            xhr.send(data)
            xhr.addEventListener('load', () => {
                const response: {result: Array<FileEntityInfo> } = JSON.parse(xhr.responseText)
                resolve({
                    data: {
                        link: `${window.baseUrl}${response.result[0].src}`
                    }
                })
            })
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText)
                reject(error)
            })
        }
    )
}

const imageProps = {
    uploadCallback:
    uploadImageCallBack,
    alt: { present: true },
    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
}

export const Editor = (props) => {
    if (typeof props.value === 'string') {
        const parse = JSON.parse(props.value)
        props.onChange(parse)    
        return null
    }

    return (
        <DraftEditor
            onChange={props.onChange}
            initialContentState={props.value}
            wrapperClassName="editor-wrapper"
            editorClassName="editor"
            toolbar={{
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
                image: imageProps,
            }}
        />
    )
}