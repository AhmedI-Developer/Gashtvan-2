import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
}) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
