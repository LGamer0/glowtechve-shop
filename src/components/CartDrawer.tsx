import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useStore, formatPrice, getEffectivePrice } from '../store'
import { AnimatedPrice } from './AnimatedPrice'

export function CartDrawer() {
  const { isCartOpen, setCartOpen, cart, updateQuantity, removeFromCart, currency, isWholesale } = useStore()

  const subtotalUSD = cart.reduce((sum, item) => sum + getEffectivePrice(item.priceUSD, isWholesale) * item.quantity, 0)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const canCheckout = !isWholesale || totalItems >= 10

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-electric-blue" />
                Tu Carrito
              </h2>
              <button 
                onClick={() => setCartOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-4">
                  <ShoppingBag className="w-16 h-16 opacity-20" />
                  <p className="text-lg font-medium">Tu carrito está vacío</p>
                  <button 
                    onClick={() => setCartOpen(false)}
                    className="text-electric-blue font-semibold hover:underline"
                  >
                    Seguir comprando
                  </button>
                </div>
              ) : (
                cart.map(item => {
                  const effectivePrice = getEffectivePrice(item.priceUSD, isWholesale);
                  const itemTotal = effectivePrice * item.quantity;
                  return (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 relative group items-center"
                  >
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-1.5 shrink-0 border border-slate-200">
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 w-full">
                      <h4 className="font-bold text-slate-800 text-sm mb-1 leading-tight">{item.title}</h4>
                      
                      <div className="flex items-center gap-x-2 mb-3">
                        <p className="font-black text-electric-blue text-sm flex items-center gap-1">
                          <AnimatedPrice price={formatPrice(effectivePrice, currency)} /> <span className="text-xs text-slate-400 font-medium">c/u</span>
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden h-8 shadow-sm">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-full flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-electric-blue transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-bold text-slate-800">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-full flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-electric-blue transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Total</p>
                          <AnimatedPrice price={formatPrice(itemTotal, currency)} className="font-black text-slate-700 text-sm leading-none" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )})
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-slate-100 bg-slate-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-500 font-medium">Subtotal</span>
                  <AnimatedPrice price={formatPrice(subtotalUSD, currency)} className="text-xl font-black text-slate-800" />
                </div>
                {!canCheckout && (
                  <p className="text-xs text-red-500 font-bold mb-3 text-center bg-red-50 p-2 rounded-lg">
                    Debes tener al menos 10 unidades en total para compras al mayor.
                  </p>
                )}
                <button 
                  disabled={!canCheckout}
                  onClick={() => {
                    setCartOpen(false)
                    useStore.getState().setCheckoutOpen(true)
                  }}
                  className="w-full bg-electric-blue hover:bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-blue-500/20"
                >
                  Proceder al Pago
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
