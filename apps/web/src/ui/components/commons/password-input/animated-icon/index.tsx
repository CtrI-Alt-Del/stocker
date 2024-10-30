import { motion, type Variants } from 'framer-motion'

import { Icon } from '../../icon'

const iconVariants: Variants = {
  open: { scale: 1.1, transition: { duration: 0.3, type: 'spring' } },
  closed: { scale: 0.9, transition: { duration: 0.3, type: 'spring' } },
}

type AnimatedIconProps = {
  isVisible: boolean
  onClick: () => void
}

export const AnimatedIcon = ({ isVisible, onClick }: AnimatedIconProps) => {
  return (
    <motion.div
      className='cursor-pointer'
      onClick={onClick}
      animate={isVisible ? 'open' : 'closed'}
      variants={iconVariants}
      whileTap={{ scale: 0.8 }}
    >
      {
        <Icon
          name={isVisible ? 'view' : 'eye-closed'}
          className='size-5 text-default-500'
        />
      }
    </motion.div>
  )
}
