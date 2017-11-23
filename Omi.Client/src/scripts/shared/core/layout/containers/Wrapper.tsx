import * as React from 'react'
import { connect } from 'react-redux'

import { windowResize } from '../state/actions'

interface WrapperProps extends React.AllHTMLAttributes<any> {
    windowWidthChange?: (windowWidth: number) => void
}

const mapDispatchToProps = (dispatch) => {
    return {
        windowWidthChange: (windowWidth: number) => {
            const windowResizeAction = windowResize(windowWidth)

            dispatch(windowResizeAction)
        }
    }
}

/**
 * Wrapper có nhiệm vụ theo dõi những thay của đổi kích thước của window
 * sau đó đưa thông tin(height và width) về cho middleware xử lý
 */
@(connect<{}, {}, React.AllHTMLAttributes<any>>((state) => ({}), mapDispatchToProps) as any)
export class Wrapper extends React.Component<WrapperProps> {
    resizeTimer = null

    constructor(props) {
        super(props)

        this.resizeTimerStart = this.resizeTimerStart.bind(this)
        this.onWindowWidthChange = this.onWindowWidthChange.bind(this)
    }

    componentDidMount() {
        window.addEventListener("resize", this.resizeTimerStart)
    }

    render() {
        return React.Children.only(this.props.children)
    }

    // call onWindowWidthChange every 300ms when Window resizing
    resizeTimerStart(e) {
        if (this.resizeTimer)
            clearTimeout(this.resizeTimer)

        this.resizeTimer = setTimeout(() => {
            this.onWindowWidthChange(e)
        }, 300)
    }

    onWindowWidthChange(e) {
        const windowWidth: number = e.target.innerWidth
        this.props.windowWidthChange(windowWidth)
    }
}
