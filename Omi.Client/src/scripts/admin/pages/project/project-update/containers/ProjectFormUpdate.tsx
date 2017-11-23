import * as React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Form, notification } from 'antd'
import { extend } from 'jquery-slim'

import { AvatarSelect, FileSelectModal, PictureWall } from 'shared/modules/FileAndMedia'
import { ModuleRootState, ProjectViewModel } from '../../../../Types'
import { RequestSend, ExtractImmutableHOC, ShowNotification } from 'shared/core'

import { FormStateProps, FormDispatchProps, ProjectForm, FormComponent } from '../../_shared/components/ProjectForm'

function ProjectUpdateFormHOC(props) {
  let newProps = props

  if (newProps.initValue.projectBlocks) {
    const towerBlockKeys = newProps.initValue.projectBlocks.map((o) => o.id)

    const processedProps = {
      initValue: {}
    }

    processedProps.initValue[FormComponent.towerKeysFieldName] = towerBlockKeys
    for (const towerBlock of newProps.initValue.projectBlocks) {
      // Process floors
      if (towerBlock.children) {
        towerBlock['children-keys'] = []
        for (const floorBlock of towerBlock.children) {
          towerBlock['children-keys'].push(floorBlock.id)
          towerBlock[`children-${floorBlock.id}`] = floorBlock
          
          // Process rooms
          if (floorBlock.children) {
            floorBlock['children-keys'] = []
            for (const room of floorBlock.children) {
              floorBlock['children-keys'].push(room.id)
              floorBlock[`children-${room.id}`] = room 
            }
          }
        }
      }
      processedProps.initValue[`${FormComponent.towerFieldName}-${towerBlock.id}`] = towerBlock
    }

    newProps = extend(true, processedProps, props)
  }

  return (
    <ProjectForm {...newProps} />
  )
}

const mapStateToProps = (state: ModuleRootState, ownProps): FormStateProps => {
  return {
    initValue: state.data.getIn(['initProjectForUpdate', 'response', 'result']) || {},
    formPostResultProjectId: state.data.getIn(['formPostResultProjectId', 'response', 'result']),
  }
}

const mapDispatchToProps = (dispatch): FormDispatchProps => {
  return {
    getInitialViewModel: () => {
      const searchParams = new URL(location.href).searchParams

      const requestSendAction = RequestSend(
        'initProjectForUpdate', {
          url:`/project/getProject?${searchParams.toString()}`,
          requestInit: {
            credentials: 'include'
          }}
        )
      dispatch(requestSendAction)
    },
    post(FormValues) {
      const requestSendAction = RequestSend(
        'formPostResultProjectId', {
          url: `/project/updateProject`, 
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

    redirectToEdit(newProjectId) {
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

const ProjectFormComponentWithPureData = ExtractImmutableHOC(ProjectUpdateFormHOC)
export const ProjectFormUpdate = connect(mapStateToProps, mapDispatchToProps)(ProjectFormComponentWithPureData)

