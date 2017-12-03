import * as React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Form, notification } from 'antd'

import { AvatarSelect, FileSelectModal, PictureWall, CleanSelectedResult } from 'shared/modules/FileAndMedia'
import { ModuleRootState, ProductViewModel } from '../../../../Types'
import { RequestSend, ExtractImmutableHOC, ShowNotification } from 'shared/core'

import { ProductFormStateProps, ProductFormDispatchProps, ProductForm, ProductFormProps } from '../components'

const mapStateToProps = (state: ModuleRootState, ownProps): ProductFormStateProps => {
  return {
    initProductViewModel: state.data.getIn(['initProductViewModel', 'response', 'result']) || {},
    formPostResultProductId: state.data.getIn(['formPostResultProductId', 'response', 'result']),
  }
}

const mapDispatchToProps = (dispatch, ownProps: ProductFormProps): ProductFormDispatchProps => {
  return {
    getInitialViewModel: () => {
      const searchParams = new URL(location.href).searchParams
      
      const requestSendAction = RequestSend(
        'initProductViewModel', {
          url: `/product/getProductViewModel?${searchParams.toString()}`,
          requestInit: {
            credentials: 'include'
          }}
        )
      dispatch(requestSendAction)
    },
    post(FormValues) {
      const requestSendAction = RequestSend(
        'formPostResultProductId', {
          url: `/product/updateProduct`,
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

    redirectToEdit(newProductId) {
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

const ProductFormComponentWithPureData = ExtractImmutableHOC(ProductForm)

export const ProductFormUpdate = connect(mapStateToProps, mapDispatchToProps)(ProductFormComponentWithPureData)

