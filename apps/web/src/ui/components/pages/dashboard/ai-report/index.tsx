'use client'

import { Dialog } from '@/ui/components/commons/dialog'
import { Button, Spinner } from '@nextui-org/react'
import { useAiReport } from './use-ai-report'
import { useAuthContext } from '@/ui/components/contexts/auth-context'
import { Icon } from '@/ui/components/commons/icon'

export function AiReport() {
  const { user } = useAuthContext()
  const { isAnalysing, handleDialogOpen } = useAiReport(user?.id)

  return (
    <Dialog
      title={isAnalysing ? 'Analisando...' : 'Análise concluída'}
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
        <div>
          {isAnalysing && (
            <div className='grid place-content-center w-full h-full'>
              <Spinner size='lg' />
            </div>
          )}
        </div>
      )}
    </Dialog>
  )
}
