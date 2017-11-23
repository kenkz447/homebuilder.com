import * as React from 'react'
import { Button, Carousel as AntdCarousel } from 'antd'
import { FileEntityInfo } from 'shared/modules/FileAndMedia'

interface OwnProps {
    pictures: Array<FileEntityInfo>
}

function NextArrow(props) {
    const { className, style, onClick } = props
    return (
        <div className="slick-next">
            <Button className="border-0" icon="caret-right" onClick={onClick} ghost/>
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
            className="detail-carousel"
            effect="fade"
            prevArrow={(<PrevArrow />)}
            nextArrow={(<NextArrow />)}
            arrows
        >
            {
                props.pictures && props.pictures.map((picture) => (
                    <div key={picture.fileId} className="detail-carousel-item">
                        <img className="w-100" src={`${window.baseUrl}${picture.src}`} />
                    </div>
                ))
            }
        </AntdCarousel>
    )
}