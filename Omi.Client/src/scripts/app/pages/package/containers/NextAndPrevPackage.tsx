import * as React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { RequestSend, ExtractImmutableHOC } from '../../../../shared/core/index'
import { ProjectViewModel } from '../../../../admin'
import { WebsiteRootState } from '../../../Types'
import { Icon } from 'antd'

interface DispatchProps {
    getNextAndPrev?: (packageId: number) => void
}
interface StateProps {
    nextAndPrev: { next: ProjectViewModel, prev: ProjectViewModel }
}
interface OwnProps {
    packageId: number
}

export class NextAndPrevPackage extends React.Component<OwnProps & StateProps & DispatchProps> {
    componentWillMount() {
        this.props.getNextAndPrev(this.props.packageId)
    }

    componentWillReceiveProps(nextProps: OwnProps) {
        if (this.props.packageId != nextProps.packageId)
            this.props.getNextAndPrev(nextProps.packageId)
    }

    render() {
        if (!this.props.nextAndPrev)
            return null

        return (
            <div className="clearfix">
                {
                    this.props.nextAndPrev.next && (
                        <div className="float-left">
                            <NavLink to={`/package/${this.props.nextAndPrev.next.id}`}>
                                <div className="package-next">
                                    <span className="package-next-text">NEXT PACKAGE</span>
                                    <span className="package-next-icon"><Icon type="caret-left" /></span>
                                </div>
                            </NavLink>
                        </div>
                    )
                }
                {
                    this.props.nextAndPrev.prev && (
                        <div className="float-right">
                            <NavLink to={`/package/${this.props.nextAndPrev.prev.id}`}>
                                <div className="package-prev">
                                    <span className="package-prev-icon"><Icon type="caret-right" /></span>
                                    <span className="package-prev-text">PREVIOUS PACKAGE</span>
                                </div>
                            </NavLink>
                        </div>
                    )
                }

            </div>
        )
    }
}

const mapStateToProps = (state: WebsiteRootState, ownProps): StateProps => {
    return {
        nextAndPrev: state.data.getIn(['WEBSITE_NEXT_PREV_PACKAGE', 'response', 'result'])
    }
}

const mapDispatchToProps = (dispatch): DispatchProps => {
    return {
        getNextAndPrev: (packageId) => {
            const getNextAndPrevPackageAction = RequestSend('WEBSITE_NEXT_PREV_PACKAGE', {
                url:  `/package/getNextAndPrevPackage?packageId=${packageId}`
            })
            dispatch(getNextAndPrevPackageAction)
        }
    }
}


const NextAndPrevPackageWithPureData = ExtractImmutableHOC(NextAndPrevPackage)

export const ConnectedNextAndPrevPackage = connect(mapStateToProps, mapDispatchToProps)(NextAndPrevPackageWithPureData)