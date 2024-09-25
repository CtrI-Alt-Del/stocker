import { type RefObject, useState } from 'react'
import type { Selection } from '@nextui-org/react'

import type { Batch } from '@stocker/core/entities'
import type { DrawerRef } from '@/ui/components/commons/drawer/types'

type UseBatchesTableParams = {
  drawerRef: RefObject<DrawerRef>
  batches: Batch[]
  onBatchesSelectionChange: (productsIds: string[]) => void
}

export function useBatchesTable({
  batches,
  drawerRef,
  onBatchesSelectionChange,
}: UseBatchesTableParams) {
  const [batchBeingUpdating, setBatchBeingUpdating] = useState<Batch | null>(null)

  function handleBatchesSelectionChange(selection: Selection) {
    if (selection === 'all') {
      onBatchesSelectionChange(batches.map((batche) => batche.id))
      return
    }

    onBatchesSelectionChange(Array.from(selection) as string[])
  }

  function handleUpdateBatchButtonClick(batch: Batch) {
    setBatchBeingUpdating(batch)
    drawerRef.current?.open()
  }

  function handleDrawerClose() {
    setBatchBeingUpdating(null)
  }

  return {
    batchBeingUpdating,
    handleUpdateBatchButtonClick,
    handleBatchesSelectionChange,
    handleDrawerClose,
  }
}
