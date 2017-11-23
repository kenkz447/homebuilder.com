import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Icon } from 'antd'

import { MenuInjector, MenuHOCProps, getAllActivePath } from 'shared/core'

import { MENU_HEADER } from '../../settings'

const PureHeaderMenu = (props: MenuHOCProps) => {
    const { menu } = props
    return (
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }} selectedKeys={ getAllActivePath(menu)}>
            {
                menu.items.map((item) => (
                    <Menu.Item key={item.path} >
                        <NavLink exact={item.exact} to={item.path} activeClassName="active">
                            {
                                item.icon && <Icon type={item.icon} />
                            }
                            <span>{item.label}</span>
                        </NavLink>
                    </Menu.Item>
                ))
            }
        </Menu>
    )
}

export const HeaderMenu = MenuInjector(MENU_HEADER)(PureHeaderMenu)