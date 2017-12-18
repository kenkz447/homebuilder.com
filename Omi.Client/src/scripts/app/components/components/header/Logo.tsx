import * as React from 'react'
import { Image } from '../../../../shared/modules/FileAndMedia'
import { connect } from 'react-redux'
import { WebsiteSettingFormValue } from 'src/scripts/admin'
import { ExtractImmutableHOC } from 'shared/core'

interface StateProps {
    websiteSetting: WebsiteSettingFormValue
}

const Logo = (props: StateProps) => {
    if (!props.websiteSetting)
        return null
    
    return (
            <Image containerClassName="brand-logo" className="brand-logo-image" fileEntityInfo={props.websiteSetting.companyLogo.value} />
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        websiteSetting: state.data.getIn(['WEBSITE_SETTING', 'response', 'result'])
    }
}

export const ConnectedLogo = connect(mapStateToProps)(ExtractImmutableHOC(Logo))