
import { Action } from 'redux'
import { NotificationDisplay } from '../utilities'

export const SHOW_NOTIFY = 'CORE@NOTIFICATION_SHOW'

export interface ShowNotificationActionPayload {
    notifyType: string,
    display: NotificationDisplay
}

export interface ShowNotificationAction extends Action, ShowNotificationActionPayload {
}

export const ShowNotification = (payload: ShowNotificationActionPayload): ShowNotificationAction => ({
    type: SHOW_NOTIFY,
    ...payload
})