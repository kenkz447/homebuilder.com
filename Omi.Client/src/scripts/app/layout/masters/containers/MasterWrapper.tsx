import * as React from 'react'
import { connect } from 'react-redux'
import * as LoadingBar from 'react-redux-loading-bar'

import { RequestSend } from 'shared/core'

import { WebsiteRootState } from '../../../Types'

interface StateProps {
    websiteSetting?: any
    children?: any
}

interface DispatchProps {
    getWebsiteSetting?: () => void
}

function MasterWrapper(props: StateProps & DispatchProps) {
    if (props.websiteSetting == null)
        props.getWebsiteSetting()

    return (
        <div className="app-master">
            <LoadingBar.default className="app-master-loading-bar" />
            {React.Children.only(props.children)}
        </div>
    )
}


const mapStateToProps = (state: WebsiteRootState): StateProps => {
    return {
        websiteSetting: state.data.getIn(['WEBSITE_SETTING', 'response', 'result'])
    }
}

const mapDispatchToProps = (dispatch): DispatchProps => {
    return {
        getWebsiteSetting: () => {
            const action = RequestSend('WEBSITE_SETTING', {
                url: '/setting/getAppSetting'
            })
            dispatch(action)
        }
    }
}

export const ConnectedMasterWrapper = connect<StateProps, DispatchProps, any>(mapStateToProps, mapDispatchToProps)(MasterWrapper)