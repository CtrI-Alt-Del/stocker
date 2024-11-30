import { REALTIME_EVENTS } from '@stocker/core/constants'

import { BROWSER_ENV } from '@/constants'
import { useWebSocket } from './use-websocket'
import { useToast } from './use-toast'

type UseNotificationWebSocketProps = {
  userId?: string
  onLogin: (userId: string) => void
  onLogoutUnkownAccount: (jwt: string) => void
}

export function useAuthWebSocket({
  userId,
  onLogin,
  onLogoutUnkownAccount,
}: UseNotificationWebSocketProps) {
  const { showError } = useToast()

  const { sendResponse } = useWebSocket({
    url: `${BROWSER_ENV.serverRealtimeUrl}/auth/${userId}`,
    isEnable: Boolean(userId),
    onResponse: (response) => {
      switch (response.event) {
        case REALTIME_EVENTS.authRoom.accountLogged:
          onLogin(response.payload)
          break
        case REALTIME_EVENTS.authRoom.unknownAccountLogout:
          onLogoutUnkownAccount(response.payload)
          break
      }
    },
    onError: () => {
      showError('Não possível se conectar :(')
    },
  })

  function logoutUnkownAccount(jwt: string) {
    sendResponse(REALTIME_EVENTS.authRoom.unknownAccountDetected, jwt)
  }

  return {
    logoutUnkownAccount,
  }
}
