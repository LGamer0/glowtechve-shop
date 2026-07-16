import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Plus, Minus } from 'lucide-react'
import { useStore, formatPrice, getEffectivePrice } from '../store'
import { AnimatedPrice } from './AnimatedPrice'

interface ProductProps {
  id: string
  title: string
  description: string
  priceUSD: number
  image: string
  category?: string
  brand?: string
}

export function ProductCard({ id, title, description, priceUSD, image }: ProductProps) {
  const { cart, addToCart, updateQuantity, removeFromCart, currency, isWholesale } = useStore()
  
  const cartItem = cart.find(i => i.id === id)
  const quantity = cartItem?.quantity || 0
  const effectivePrice = getEffectivePrice(priceUSD, isWholesale)

  const handleAdd = () => {
    addToCart({ id, title, priceUSD, image })
  }

  const handleIncrement = () => updateQuantity(id, 1)
  const handleDecrement = () => {
    if (quantity === 1) {
      removeFromCart(id)
    } else {
      updateQuantity(id, -1)
    }
  }

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,85,255,0.08)] border border-slate-100 transition-all group flex flex-col h-full"
    >
      <div className="relative w-full aspect-square bg-slate-50 rounded-xl overflow-hidden mb-4 p-4 flex items-center justify-center group-hover:bg-blue-50/50 transition-colors">
        <motion.img 
          whileHover={{ scale: 1.05 }}
          src={image} 
          alt={title} 
          className="w-full h-full object-contain"
        />
      </div>
      
      <div className="flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-slate-800 mb-1 leading-tight">{title}</h3>
        <p className="text-sm text-slate-500 mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5 block">Precio</span>
            <AnimatedPrice price={formatPrice(effectivePrice, currency)} className="text-xl font-black text-electric-blue" />
          </div>
          
          <div className="h-10">
            <AnimatePresence mode="wait">
              {quantity === 0 ? (
                <motion.button
                  key="add"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={handleAdd}
                  className="h-full px-4 bg-slate-900 hover:bg-electric-blue text-white rounded-xl font-bold flex items-center gap-2 transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Agregar
                </motion.button>
              ) : (
                <motion.div
                  key="controls"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="h-full flex items-center bg-blue-50 border border-blue-100 rounded-xl overflow-hidden"
                >
                  <button 
                    onClick={handleDecrement}
                    className="w-10 h-full flex items-center justify-center text-electric-blue hover:bg-blue-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-bold text-slate-800">{quantity}</span>
                  <button 
                    onClick={handleIncrement}
                    className="w-10 h-full flex items-center justify-center text-electric-blue hover:bg-blue-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
