'use client'

import { useState } from 'react'

import { useAiReportWebSocket } from '@/ui/hooks'

export function useAiReport(userId?: string) {
  const [isAnalysing, setIsAnalysing] = useState(false)
  const [report, setReport] = useState('')

  const { generate } = useAiReportWebSocket({
    userId,
    onGenerate: (chunk) => {
      setIsAnalysing(false)
      console.log(chunk)
      setReport((report) => report.concat(chunk))
    },
  })

  function handleDialogOpen() {
    setReport('')
    setIsAnalysing(true)
    generate()
  }

  return {
    report,
    isAnalysing,
    handleDialogOpen,
  }
}
