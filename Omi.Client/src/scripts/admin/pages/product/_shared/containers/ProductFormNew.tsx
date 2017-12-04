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
    initProductViewModel: state.data.getIn(['INIT_PRODUCT_VIEW_MODEL', 'response', 'result']) || {},
    FORM_POST_RESULT_PRODUCT_ID: state.data.getIn(['FORM_POST_RESULT_PRODUCT_ID', 'response', 'result'])
  }
}

const mapDispatchToProps = (dispatch, ownProps): ProductFormDispatchProps => {
  return {
    getInitialViewModel: () => {
      const params = new URLSearchParams()
      params.append('IsEditModel', String(true))

      const requestSendAction = RequestSend(
        'INIT_PRODUCT_VIEW_MODEL', {
          url: `/product/Get?${params.toString()}`,
          requestInit: {
            method: 'Get',
            credentials: 'include'
          }
        })
      dispatch(requestSendAction)
    },
    post(FormValues) {
      const requestSendAction = RequestSend(
        'FORM_POST_RESULT_PRODUCT_ID', {
          url: `/product/create`,
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

    onPostSucceeded(newProductId) {
      const showNotificationAction = ShowNotification({
        notifyType: 'success',
        display: {
          title: 'Created!',
          description: 'Create a new Product Successfuly.'
        }
      })
      dispatch(showNotificationAction)
      dispatch(push(`/website/admin/product/update?${nameof<ProductViewModel>(o => o.entityId)}=${newProductId}`))
    }
  }
}

const ProductFormComponentWithPureData = ExtractImmutableHOC(ProductForm)

export const ProductFormNew = connect(mapStateToProps, mapDispatchToProps)(ProductFormComponentWithPureData)

