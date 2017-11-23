import './style.scss'

import * as React from 'react'
import { render } from 'react-dom'
import * as MonacoEditor from 'react-monaco-editor'

const options = {
    selectOnLineNumbers: true,
    minimap: {
        enabled: false
    }
}

const requireConfig = {
    url: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.10.1/min/vs/loader.js',
    paths: {
      'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.10.1/min/vs'
    }
}
  
export class CodeEditor extends React.Component<any> {
    render() {
        return (
            <MonacoEditor.default
                width="100%"
                height="500"
                language="html"
                theme="vs-light"
                
                onChange={this.props.onChange}
                value={this.props.value}
                options={options}
                requireConfig={requireConfig}
            />
        )
    }   
}