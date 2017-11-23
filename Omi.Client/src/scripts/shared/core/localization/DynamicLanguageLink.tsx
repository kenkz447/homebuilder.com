import * as React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { RootState } from '../types'
import { getLanguages } from './languages'

interface StateProps {
    location: any
}

interface OwnProps {
    langCode: string
    classNames?: string
    activeClassName?: string
}

function DynamicLanguageLink(props: OwnProps & StateProps) {
    let currentPathname = location.pathname

    const languages = getLanguages()
    for (const lang of languages)
        if (currentPathname.startsWith(`/${lang.code}`))
            currentPathname = currentPathname.replace(`/${lang.code}`, '')

    const wantedLanguage = languages.find((o) => o.code == props.langCode)

    if (!wantedLanguage.isPrimary)
        currentPathname = `/${wantedLanguage.code}${currentPathname}`

    currentPathname += location.search

    return (
        <NavLink
            className={props.classNames}
            activeClassName={props.activeClassName}
            to={currentPathname}>
            {wantedLanguage.title}
        </NavLink>
    )
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        location: state.router.location
    }
}

export const ConnectedDynamicLanguageLink = connect<StateProps, {}, OwnProps>(mapStateToProps)(DynamicLanguageLink)