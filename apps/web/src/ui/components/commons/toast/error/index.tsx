'use client'
import { Icon } from '../../icon'
import { Toast, toast } from 'react-hot-toast'
import { AnimatePresence, motion } from 'framer-motion'

interface ErrorToastProps {
  t: Toast
  message: string
}

export const ErrorToast = ({ message, t }: ErrorToastProps) => {
  return (
    <AnimatePresence>
      {t.visible && (
        <motion.div
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: 20 }}
          transition={{ duration: 0.3 }}
          className='bg-red-100 text-black rounded-lg flex items-center gap-5 max-w-fit p-5 relative overflow-hidden'
        >
          <div className='bg-red-500 h-full w-2 absolute inset-y-0 left-0' />

          <div className='pl-4 flex items-center gap-5'>
            <Icon
              name='close'
              className='text-white flex items-center justify-center bg-red-500  rounded-full'
            />
            <div className='flex flex-col'>
              <h1 className='font-semibold'>Erro</h1>
              <p className='font-medium text-zinc-600'>{message}</p>
            </div>
            <button onClick={() => toast.dismiss(t.id)}>
              <Icon name='close' className='text-black' />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
