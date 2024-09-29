import { type RefObject, useEffect } from 'react'

import { useNavigation } from '@/ui/hooks'
import type { DrawerRef } from '../../commons/drawer/types'

export function useDashboardLayout(drawerRef: RefObject<DrawerRef>) {
  const { currentRoute } = useNavigation()

  useEffect(() => {
    if (currentRoute) drawerRef.current?.close()
  }, [currentRoute, drawerRef.current?.close])
}
