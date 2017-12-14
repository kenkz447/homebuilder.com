import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { RequestSend } from 'shared/core'

import { WebsiteRootState } from '../../../Types'
import { ProductViewModel } from 'admin/Types'

interface StateProps {
    product?: ProductViewModel
}

interface DispatchProps {
    getProduct?: () => void
}

interface Params {
    package: string
    product: string 
}

interface OwnProps extends RouteComponentProps<Params> {

}

class ProductDetails extends React.Component<OwnProps & DispatchProps & StateProps> {
    componentWillMount() {
        this.props.getProduct()
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

const mapStateToProps = (state: WebsiteRootState): StateProps => {
    return {
        product: state.data.getIn(['PRODUCT', 'response'])
    }
}

const mapDispatchToProps = (dispatch, ownProps): DispatchProps => {
    const product = ownProps.match.params.product
    return {
        getProduct: () => {
            const action = RequestSend('PRODUCT', {
                url: `/product/get?name=${product}`
            })
            dispatch(action)
        }
    }
}

export const ConnectedProductDetails = withRouter<any>(connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(ProductDetails))