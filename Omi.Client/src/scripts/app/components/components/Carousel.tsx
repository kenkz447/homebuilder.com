import * as React from 'react'
import { Button, Carousel as AntdCarousel } from 'antd'
import { FileEntityInfo } from 'shared/modules/FileAndMedia'
import * as classNames from 'classnames'

interface OwnProps {
    thumb?: boolean
    pictures: Array<FileEntityInfo>
    slidesToShow?: number
    itemClassName?: string
    itemClick?: (itemIndex) => void
    containerClassName?: string
}

function NextArrow(props) {
    const { className, style, onClick } = props
    return (
        <div className="slick-next">
            <Button className="border-0" icon="caret-right" onClick={onClick} ghost />
        </div>
    )
}

function PrevArrow(props) {
    const { className, style, onClick } = props
    return (
        <div className="slick-prev">
            <Button className="border-0" icon="caret-left" onClick={onClick} ghost />
        </div>
    )
}
export const Carousel = (props: OwnProps) => {
    return (
        <AntdCarousel
            className={classNames(props.containerClassName, 'detail-carousel')}
            effect={!props.slidesToShow ? "fade" : "scrollx"}
            slidesToShow={props.slidesToShow}
            infinite={false}
            prevArrow={(<PrevArrow />)}
            nextArrow={(<NextArrow />)}
            arrows
        >
            {
                props.pictures && props.pictures.map((picture, i) => (
                    <div key={picture.fileId} className={classNames(props.itemClassName, 'detail-carousel-item')} onClick={() => { props.itemClick(i) }}>
                        <img className="w-100" src={`${window.baseUrl}${props.thumb ? picture.srcThumb : picture.src}`} />
                    </div>
                ))
            }
        </AntdCarousel>
    )
}