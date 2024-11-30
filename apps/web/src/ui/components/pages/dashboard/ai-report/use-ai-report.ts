'use client'

import { useState } from 'react'

import { useAiReportWebSocket } from '@/ui/hooks'

export function useAiReport(userId?: string) {
  const [isAnalysing, setIsAnalysing] = useState(false)

  const { generate } = useAiReportWebSocket({
    userId,
    onGenerate: (chunk) => {
      setIsAnalysing(false)
      console.log(chunk)
    },
  })

  function handleDialogOpen() {
    setIsAnalysing(true)
    generate()
  }

  return {
    isAnalysing,
    handleDialogOpen,
  }
}
