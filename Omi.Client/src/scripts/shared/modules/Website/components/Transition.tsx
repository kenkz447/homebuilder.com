import * as React from 'react'

import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export const Transition = (props) => {
    return (
        <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={400}
        transitionEnterTimeout={400}
        transitionLeaveTimeout={1000}
        transitionLeave={true}
        transitionName="SlideIn">
            {props.children}    
        </ ReactCSSTransitionGroup>    
    )
}