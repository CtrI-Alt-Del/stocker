'use client'

import Markdown from 'markdown-to-jsx'
import { Dialog } from '@/ui/components/commons/dialog'
import { Button, Spinner } from '@nextui-org/react'
import { useAiReport } from './use-ai-report'
import { useAuthContext } from '@/ui/components/contexts/auth-context'
import { Icon } from '@/ui/components/commons/icon'

export function AiReport() {
  const { user } = useAuthContext()
  const { report, isAnalysing, handleDialogOpen } = useAiReport(user?.id)

  return (
    <Dialog
      title={isAnalysing ? 'Analisando com IA...' : 'Análise com IA concluída'}
      size='2xl'
      onOpen={handleDialogOpen}
      trigger={
        <Button
          size='md'
          startContent={<Icon name='ai' size={16} />}
          isLoading={isAnalysing}
          className='bg-purple-700 text-zinc-50'
        >
          Analisar com IA
        </Button>
      }
    >
      {() => (
        <div className='h-[32rem]'>
          {isAnalysing ? (
            <div className='grid place-content-center w-full h-full pb-6'>
              <Spinner size='lg' />
            </div>
          ) : (
            <div className='prose -translate-y-2 p-6'>
              <Markdown>{report}</Markdown>
            </div>
          )}
        </div>
      )}
    </Dialog>
  )
}
