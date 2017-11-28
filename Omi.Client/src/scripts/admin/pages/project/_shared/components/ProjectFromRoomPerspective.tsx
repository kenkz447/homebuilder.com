import * as React from 'react'
import { connect } from 'react-redux'
import * as classnames from 'classnames'
import { autobind } from 'core-decorators'
import { Modal, Slider, Button } from 'antd'
import * as uuid from 'uuid'

import { ExtractImmutableHOC } from 'shared/core'
import { FileEntityInfo, FormFileSelect } from 'shared/modules/FileAndMedia/index'
import { ModuleRootState } from '../../../../Types'

interface Arrow {
    id: string
    x: number
    y: number
    rotate: number
    image?: FileEntityInfo
    isActive?: boolean
}

interface OwnProps {
    file?: FileEntityInfo
    //** Initial value */
    value?: Array<Arrow>
    onChange?: (value) => void
}

interface State {
    modalVisible: boolean
    arrows: Array<Arrow>
}

export class ProjectFromRoomPerspective extends React.Component<OwnProps, State> {
    static defaultProps: OwnProps = {
        value: []
    }

    constructor(props: OwnProps) {
        super(props)

        const initValueWithIds = props.value.map(((o) => {
            o.id = uuid()
            return o
        }))

        this.state = {
            modalVisible: false,
            arrows: initValueWithIds
        }
    }

    render() {
        const src = (this.props.file && `${window.baseUrl}${this.props.file.src}`) || '/images/template-layout.jpg'

        return (
            <div className={classnames('c-project-layout', { 'empty': !this.props.file })} onClick={this.showModal}>
                <img src={src} />
                <Modal title="Title"
                    visible={this.state.modalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={800}
                >
                    <div className="c-project-layout">
                        <div onClick={this.layoutClick}>
                            <img className="w-100" src={src} />
                        </div>
                        {
                            this.state.arrows.map((arrow) =>
                                <div key={arrow.id} className={'c-project-layout-arrow-wrapper'}
                                    style={{
                                        top: `${arrow.y}%`,
                                        left: `${arrow.x}%`
                                    }}
                                >
                                    <div className={classnames('c-project-layout-arrow', { 'active': arrow.isActive == true })}
                                        onClick={this.arrowClick(arrow.id).bind(this)}
                                        style={{
                                            transform: `rotate(${arrow.rotate}deg)`
                                        }}
                                    />
                                    {
                                        arrow.isActive && (
                                            <div className="c-project-layout-arrow-controller">
                                                <div><Slider min={0} max={360} value={arrow.rotate} onChange={this.arrowRotateChange(arrow.id)} /></div>
                                                <div className="text-center">
                                                    <FormFileSelect
                                                        id={arrow.id}
                                                        icon="picture"
                                                        classNames="border-0 mr-2"
                                                        size="large"
                                                        value={arrow.image}
                                                        onChange={this.selectImageOK(arrow.id)}
                                                        onClick={this.selectImageClick}
                                                        onModalClose={this.selectImageClose}
                                                    />
                                                    <Button className="border-0" size="large" icon="delete" onClick={this.arrowRemove(arrow.id)} />
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            )}
                    </div>
                </Modal>
            </div>
        )
    }

    //#region [Modal handle]
    @autobind
    showModal(e) {
        if (!this.props.file)
            return

        this.setState({
            modalVisible: true,
        })
    }

    @autobind
    handleOk() {
        const newArrows = this.state.arrows.slice()
        newArrows.forEach((o) => {
            o.isActive = false
        })

        this.props.onChange(newArrows)

        this.setState({ modalVisible: false, arrows: newArrows})
    }

    @autobind
    handleCancel() {
        this.setState({ modalVisible: false, arrows: [] })
    }

    //#endregion

    //#region [Layout]
    @autobind
    layoutClick(e) {
        const target = e.target

        const x = e.nativeEvent.offsetX / target.clientWidth * 100
        const y = e.nativeEvent.offsetY / target.clientHeight * 100

        const newArrows = this.state.arrows.slice()
        newArrows.forEach((o) => {
            o.isActive = false
        })

        const newArrow: Arrow = {
            id: uuid(),
            x: x,
            y: y,
            rotate: 0,
            isActive: true
        }

        newArrows.push(newArrow)
        this.setState({ arrows: newArrows })
    }

    arrowClick = (arrowId) => () => {
        const newArrows = this.state.arrows.slice()
        newArrows.forEach((o) => {
            o.isActive = (o.id == arrowId)
        })

        this.setState({ arrows: newArrows })
    }

    arrowRotateChange = (arrowId) => (value) => {
        const newArrows = this.state.arrows.slice()
        newArrows.forEach((o) => {
            if (o.id == arrowId)
                o.rotate = value
        })

        this.setState({ arrows: newArrows })
    }

    arrowRemove = (arrowId) => (e) => {
        const newArrows = this.state.arrows.filter((o) => o.id != arrowId)
        this.setState({ arrows: newArrows })
    }

    @autobind
    selectImageClick() {
        this.setState({ modalVisible: false })
    }

    @autobind
    selectImageClose() {
        this.setState({ modalVisible: true })
    }

    selectImageOK = (arrowId: string) => (file: FileEntityInfo) => {
        const newArrows = this.state.arrows.slice()
        const targetArrow = newArrows.find((o) => o.id == arrowId)
        targetArrow.image = file

        this.setState({
            modalVisible: true,
            arrows: newArrows
        })
    }
    //#endregion
}