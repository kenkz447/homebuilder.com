const notification = require('antd/lib/notification')

export interface NotificationDisplay {
    title: string
    description: string
}

export const openNotificationWithIcon = (type: 'success' | 'info' | 'warning' | 'error', display: NotificationDisplay) => {
    notification[type]({
        message: display.title,
        description: display.description
    })
}