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
    initProductViewModel: state.data.getIn(['initProductViewModel', 'response']) || {},
    FORM_POST_RESULT_PRODUCT_ID: state.data.getIn(['FORM_POST_RESULT_PRODUCT_ID', 'response', 'result']),
  }
}

const mapDispatchToProps = (dispatch, ownProps: ProductFormProps): ProductFormDispatchProps => {
  return {
    getInitialViewModel: () => {
      const params = new URL(location.href).searchParams
      params.append('IsEditModel', String(true))

      const requestSendAction = RequestSend(
        'initProductViewModel', {
          url: `/product/get?${params.toString()}`,
          requestInit: {
            credentials: 'include'
          }}
        )
      dispatch(requestSendAction)
    },
    post(FormValues) {
      const requestSendAction = RequestSend(
        'FORM_POST_RESULT_PRODUCT_ID', {
          url: `/product/update`,
          requestInit: {
            method: 'PUT',
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

    onPostSucceeded(newProductId) {
      const showNotificationAction = ShowNotification({
        notifyType: 'success',
        display: {
          title: 'Saved!',
          description: 'Update Successfuly.'
        }
      })
      dispatch(showNotificationAction)
    }
  }
}

const ProductFormComponentWithPureData = ExtractImmutableHOC(ProductForm)

export const ProductFormUpdate = connect(mapStateToProps, mapDispatchToProps)(ProductFormComponentWithPureData)

