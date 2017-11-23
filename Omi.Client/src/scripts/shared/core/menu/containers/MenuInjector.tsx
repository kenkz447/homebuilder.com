import { connect } from 'react-redux'

import { RootState } from '../../types'
import { ExtractImmutableHOC } from '../../containers'

import { MenuHOCImmutableProps } from '../interfaces'

const mapStateToProps = (menuName: string) => (state: RootState): MenuHOCImmutableProps => {
    return {
        menu: state.menus.find(function (o) {
            return o.get('name') == menuName
        })
    }
}

export const MenuInjector = (menuName) => (Element) =>
    connect(mapStateToProps(menuName), null, null, { pure: false })(ExtractImmutableHOC(Element))