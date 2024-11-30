export const REALTIME_EVENTS = {
  notificationsRoom: {
    connected: 'notifications-room-connected',
    stockLevelNotificationSent: 'stock-level-notification-sent',
    notificationDeleted: 'notification-deleted',
    companyDeleted: 'company-deleted',
  },
  aiReportRoom: {
    requested: 'ai-report-requested',
    generated: 'ai-report-generated',
  },
  authRoom: {
    accountLogged: 'auth-room-account-logged',
    accountDeleted: 'auth-room-account-deleted',
    unknownAccountDetected: 'auth-room-unknown-account-detected',
    unknownAccountLogout: 'auth-room-unknown-account-logout',
  },
}
