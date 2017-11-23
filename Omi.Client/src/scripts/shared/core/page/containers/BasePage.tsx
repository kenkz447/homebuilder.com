import * as React from 'react'
import { connect } from 'react-redux'

import { LayoutWrapper } from '../../layout'

import { PageOption } from '../types/PageOptions'
import { PageChangeAction } from '../state/actions'
import { PAGE_CHANGE } from '../state/keys'

interface BasePageProps extends PageOption {
    dispatch: (action) => void
    pageChange: (pageOption: PageOption) => void
}

class BasePage extends React.Component<BasePageProps> {
    constructor(props) {
        super(props)

        props.pageChange(this.props as PageOption)
    }


    componentWillMount() {
        const { dispatch, onload } = this.props
        if (onload)
            onload({ dispatch })
    }

    render() {
        return (
            <LayoutWrapper>
                {React.Children.only(this.props.children)}
            </LayoutWrapper>
        )
    }

}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        pageChange: (pageOptions: PageOption) => {
            const pageChangeAction: PageChangeAction = {
                type: PAGE_CHANGE,
                pageOptions
            }

            dispatch(pageChangeAction)
        },
        dispatch
    }
}

export default connect(() => ({}), mapDispatchToProps)(BasePage)
