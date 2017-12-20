import * as React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Form } from 'antd'

import { AvatarSelect, FileSelectModal, PictureWall, CleanSelectedResult } from 'shared/modules/FileAndMedia'
import { ModuleRootState, PackageViewModel } from '../../../../Types'
import { RequestSend, ExtractImmutableHOC, ShowNotification } from 'shared/core'

import { PackageFormStateProps, PackageFormDispatchProps, PackageForm } from '../components'

const mapStateToProps = (state: ModuleRootState, ownProps): PackageFormStateProps => {
  return {
    initPackageViewModel: state.data.getIn(['initPackageViewModel', 'response', 'result']) || {},
    formPostResultPackageId: state.data.getIn(['formPostResultPackageId', 'response', 'result'])
  }
}

const mapDispatchToProps = (dispatch, ownProps): PackageFormDispatchProps => {
  return {
    getInitialViewModel: () => {
      const requestSendAction = RequestSend(
        'initPackageViewModel', {
          url: `/package/GetEmptyPackageViewModel`,
          requestInit: {
            method: 'Get',
            credentials: 'include'
          }
        })
      dispatch(requestSendAction)
    },
    post(FormValues) {
      const requestSendAction = RequestSend(
        'formPostResultPackageId', {
          url: `/package/createNewPackage`,
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
          title: 'Created!',
          description: 'Create a new Package Successfuly.'
        }
      })
      dispatch(showNotificationAction)
      dispatch(push(`/website/admin/package/update?id=${newPackageId}`))
    }
  }
}

const PackageFormComponentWithPureData = ExtractImmutableHOC(PackageForm)

export const PackageFormNew = connect(mapStateToProps, mapDispatchToProps)(PackageFormComponentWithPureData)

