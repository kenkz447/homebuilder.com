import * as React from 'react'
import { NavLink } from 'react-router-dom'

import { PackageViewModel } from '../../../../../admin'
import { toCurrency } from '../../../../../shared/modules/website'
import { Icon } from 'antd';

interface OwnProps {
    package: PackageViewModel
}
export const PackageItem = (props: OwnProps) => {
    return (
        <div className="package-item mb-4">
            <NavLink className="package-link" to={`${location.pathname}/${props.package.id}`}>
                <div className="package-item-top">

                    <div className="clearfix">
                        <div className="float-left">
                            <span className="package-item-title">{props.package.title}</span>
                        </div>
                        <div className="float-right">
                            <span className="package-item-price">VND {toCurrency(props.package.price)}</span>
                        </div>
                    </div>
                </div>
                {
                    <div className="effect">
                        <figure className="effect-apollo">
                            <img src={`${window.baseUrl}${props.package.avatar.src}`} />
                            <figcaption>
                                <p>View Details <Icon type="right-circle-o" /></p>
                            </figcaption>
                        </figure>   
                    </div>
                }
            </NavLink>
        </div>
    )
}
