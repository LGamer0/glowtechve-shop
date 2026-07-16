import { motion, AnimatePresence } from 'framer-motion'

interface AnimatedPriceProps {
  price: string
  className?: string
}

export function AnimatedPrice({ price, className = '' }: AnimatedPriceProps) {
  return (
    <span className={`inline-flex overflow-hidden relative ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={price}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, type: "spring", bounce: 0 }}
          className="inline-block"
        >
          {price}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
