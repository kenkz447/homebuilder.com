import * as React from 'react'
import { Row, Col } from 'antd'
import { connect } from 'react-redux'
import { ConnectedContactForm } from './ContactForm'
import { WebsiteSettingFormValue } from '../../../../Admin'
import { ExtractImmutableHOC } from '../../../../shared/core'

interface StateProps {
    websiteSetting: WebsiteSettingFormValue
}

@(ExtractImmutableHOC as any)
class ContactInfo extends React.Component<StateProps> {
    render() {
        if (!this.props.websiteSetting)
            return null
        
        return (
            <div className="contact-info" style={{ background: `url(${window.baseUrl}${this.props.websiteSetting.contactBannerImage.value.src})` }}>
                <div className="brand-container">
                    <div className="text-center mb-5" dangerouslySetInnerHTML={{__html: this.props.websiteSetting.contactWelcomeHtml.value}}>
                    </div>
                    <Row>
                        <Col span={24} lg={{span:12}} className="mb-5 mb-lg-0">
                            <div className="mb-2 mb-lg-0" dangerouslySetInnerHTML={{__html: this.props.websiteSetting.contactInfoHtml.value}} />
                        </Col>
                        <Col span={24} lg={{span:12}}>
                            <p className="contact-info-label h5 mb-4">
                                <strong>LEAVE US A NOTE</strong>
                            </p>
                            <ConnectedContactForm />
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps): StateProps => {
    return {
        websiteSetting: state.data.getIn(['WEBSITE_SETTING', 'response', 'result'])
    }
}

export const ConnectedContactInfo = connect(mapStateToProps)(ContactInfo)