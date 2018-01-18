import * as React from 'react'
import { ProductViewModel, PackageProductViewModel } from 'admin/Types'
import { Image } from 'shared/modules/FileAndMedia'
import { toCurrency } from 'shared/modules/website'
import { NavLink } from 'react-router-dom'

interface Props {
    items: Array<PackageProductViewModel>
}

export function ProductList(props: Props) {
    return (
        <div>
            <ul className="product-list">
                {props.items.map(o => {
                    const product = o.productViewModel
                    const path = `${location.pathname}/${product.name}`
                    return (
                        <li key={product.entityId} className="product-list-item">
                            <div className={'product-list-item-container clearfix'}>
                                <div className="product-list-item-avatar">
                                    <NavLink to={path}>
                                        <Image className="d-block mw-100 w-100" fileEntityInfo={product.avatar} />
                                    </NavLink>
                                </div>
                                <div className="product-list-item-details">
                                    <NavLink to={path}>
                                        <label className="product-list-item-label">{product.title}</label>
                                    </NavLink>
                                    <span className="product-list-item-text">{product.type.label} | {product.brand.label}</span>
                                    <span className="product-list-item-text">Quantity: {o.quantity}</span>
                                </div>
                                <NavLink className="product-list-item-viewmore-btn d-none d-xl-block" aria-current="false" to={path}>
                                    <div className="product-list-item-viewmore">
                                        <span className="product-list-item-viewmore-text">View More</span>
                                        <span className="product-list-item-viewmore-icon">
                                            <i className="anticon anticon-caret-right"></i>
                                        </span>
                                    </div>
                                </NavLink>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}