import * as React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Form } from 'antd'

import { AvatarSelect, FileSelectModal, PictureWall, CleanSelectedResult } from 'shared/modules/FileAndMedia'
import { ModuleRootState, ProductViewModel } from '../../../../Types'
import { RequestSend, ExtractImmutableHOC, ShowNotification } from 'shared/core'

import { ProductFormStateProps, ProductFormDispatchProps, ProductForm } from '../components'

const mapStateToProps = (state: ModuleRootState, ownProps): ProductFormStateProps => {
  return {
    initProductViewModel: state.data.getIn(['initProductViewModel', 'response', 'result']) || {},
    formPostResultProductId: state.data.getIn(['formPostResultProductId', 'response', 'result'])
  }
}

const mapDispatchToProps = (dispatch, ownProps): ProductFormDispatchProps => {
  return {
    getInitialViewModel: () => {
      const requestSendAction = RequestSend(
        'initProductViewModel', {
          url: `/product/GetEmptyProductViewModel`,
          requestInit: {
            method: 'Get',
            credentials: 'include'
          }
        })
      dispatch(requestSendAction)
    },
    post(FormValues) {
      const requestSendAction = RequestSend(
        'formPostResultProductId', {
          url: `/product/createNewProduct`,
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
          title: 'Created!',
          description: 'Create a new Product Successfuly.'
        }
      })
      dispatch(showNotificationAction)
      dispatch(push(`/website/admin/product/update?productId=${newProductId}`))
    }
  }
}

const ProductFormComponentWithPureData = ExtractImmutableHOC(ProductForm)

export const ProductFormNew = connect(mapStateToProps, mapDispatchToProps)(ProductFormComponentWithPureData)

