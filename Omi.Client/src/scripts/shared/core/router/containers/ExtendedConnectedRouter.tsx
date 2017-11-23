import * as React from 'react'
import { Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { connect } from 'react-redux'

import { RootState } from '../../types'

import { renderRoutes } from '../helpers'
import history from '../../constants/history'

import { ExtractImmutableHOC } from '../../containers'

const extendedConnectedRouter: React.StatelessComponent<any> = (props) => {
    const { routes } = props
    if (routes)
        return (
            <ConnectedRouter history={history}>
                <Switch>
                    {renderRoutes(routes)}
                </Switch>
            </ConnectedRouter>
        )
    else
        return null
}

const stateToProps = (state: RootState) => {
    return ({
        routes: state.routes
    })
}

export const ExtendedConnectedRouter = connect(stateToProps)(ExtractImmutableHOC(extendedConnectedRouter))