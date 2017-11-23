import * as React from 'react'
import { connect } from 'react-redux'
import { NavLink, NavLinkProps } from 'react-router-dom'
import { RootState, LanguageInfo } from '../types'
import { ExtractImmutableHOC } from '../containers'

interface StateProps {
    currentLanguage?: LanguageInfo
}

function AppLink(props: NavLinkProps & StateProps) {
    let to = props.to
    if (props.currentLanguage && !props.currentLanguage.isPrimary)
        to = `/${props.currentLanguage.code}${to}`

    return <NavLink
        className={props.className}
        activeClassName={props.activeClassName}
        exact={props.exact}
        to={to}
        children={props.children} />
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        currentLanguage: state.localization.get('CURRENT_LANGUAGE')
    }
}

export const ConnectedAppNavLink = connect<StateProps, {}, NavLinkProps>(mapStateToProps)(ExtractImmutableHOC(AppLink))