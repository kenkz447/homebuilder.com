import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { RootState } from '../../types'

import { getLayouts } from '../constants'
import { Wrapper } from './Wrapper'

const layoutSelector: React.StatelessComponent<any> = (props) => {
    const { layoutType } = props
    const LayoutType = getLayouts(layoutType)

    const OriginPage = React.Children.only(props.children)
    const NewPage = React.cloneElement(OriginPage, props)

    if (LayoutType)
        return (
            <LayoutType>
                <Wrapper>
                    {NewPage}
                </Wrapper>
            </LayoutType>
        )
    else
        return (
            <Wrapper>
                {NewPage}
            </Wrapper>
        )

}

const mapStateToProps = (state: RootState) => {
    return {
        layoutType: state.layout.get('type')
    }
}

export const LayoutWrapper = withRouter<any>(connect(mapStateToProps)(layoutSelector))