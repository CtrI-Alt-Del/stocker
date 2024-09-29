import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type AnimatedContainerProps = {
  children: ReactNode
  isVisible: boolean
}

export const AnimatedContainer = ({ children, isVisible }: AnimatedContainerProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: 20 }}
          transition={{ duration: 0.3 }}
          className='text-black rounded-lg flex items-center gap-5 max-w-96 relative overflow-hidden'
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
