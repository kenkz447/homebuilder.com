import * as React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Form, notification } from 'antd'

import { AvatarSelect, FileSelectModal, PictureWall } from 'shared/modules/FileAndMedia'
import { ModuleRootState, PackageViewModel } from '../../../../Types'
import { RequestSend, ExtractImmutableHOC, ShowNotification } from 'shared/core'

import { PackageFormStateProps, PackageFormDispatchProps, PackageForm, PackageFormProps } from '../components'

const mapStateToProps = (state: ModuleRootState, ownProps): PackageFormStateProps => {
  return {
    initPackageViewModel: state.data.getIn(['initPackageViewModel', 'response', 'result']) || {},
    formPostResultPackageId: state.data.getIn(['formPostResultPackageId', 'response', 'result']),
  }
}

const mapDispatchToProps = (dispatch, ownProps: PackageFormProps): PackageFormDispatchProps => {
  return {
    getInitialViewModel: () => {
      const searchParams = new URL(location.href).searchParams
      
      const requestSendAction = RequestSend(
        'initPackageViewModel', {
          url: `/package/getPackageViewModel?${searchParams.toString()}`,
          requestInit: {
            credentials: 'include'
          }}
        )
      dispatch(requestSendAction)
    },
    post(FormValues) {
      const requestSendAction = RequestSend(
        'formPostResultPackageId', {
          url: `/package/updatePackage`,
          requestInit: {
            method: 'POST',
            headers: new Headers({
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            }),
            body: JSON.stringify(FormValues),
            credentials: 'include'
          }
        }
         
      )
      dispatch(requestSendAction)
    },

    redirectToEdit(newPackageId) {
      const showNotificationAction = ShowNotification({
        notifyType: 'success',
        display: {
          title: 'Saved!',
          description: 'Update Successfuly.'
        }
      })
      dispatch(showNotificationAction)
      dispatch(push(`${location.pathname}${location.search}`))
    }
  }
}

const PackageFormComponentWithPureData = ExtractImmutableHOC(PackageForm)

export const PackageFormUpdate = connect(mapStateToProps, mapDispatchToProps)(PackageFormComponentWithPureData)

