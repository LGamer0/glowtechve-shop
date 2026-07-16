import { useState } from 'react'
import { ShoppingCart, Zap, Search, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore, type Currency } from '../store'
import { CATEGORIES } from '../data/products'

const CURRENCIES: Currency[] = ['BS', 'USD', 'EUR', 'USDT']

export function Header() {
  const { currency, setCurrency, cart, setCartOpen, setFilter, category, searchQuery, setSearchQuery, isWholesale, setWholesale } = useStore()
  const [isCurrencyOpen, setCurrencyOpen] = useState(false)

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between gap-2 md:gap-6">
          {/* Logo & Brand */}
          <div className="flex items-center gap-1 md:gap-2 text-electric-blue shrink-0 cursor-pointer" onClick={() => setFilter('category', 'Todas las categorías')}>
            <Zap className="w-6 h-6 md:w-8 md:h-8 fill-current" />
            <span className="text-xl md:text-2xl font-black tracking-tighter">GlowTechVe</span>
          </div>

          {/* Search Bar Desktop */}
          <div className="flex-1 max-w-2xl relative hidden md:block">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar productos, marcas y más..." 
              className="w-full bg-white/50 border border-slate-200 rounded-full py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all placeholder:text-slate-400 text-sm font-medium text-slate-800"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            {/* Wholesale Toggle */}
            <div className="flex items-center gap-1 md:gap-2">
              <span className={`text-[10px] md:text-xs font-bold hidden sm:inline ${!isWholesale ? 'text-electric-blue' : 'text-slate-400'}`}>Detal</span>
              <button 
                onClick={() => setWholesale(!isWholesale)}
                className={`w-10 h-5 md:w-12 md:h-6 rounded-full p-1 transition-colors ${isWholesale ? 'bg-electric-blue' : 'bg-slate-300'}`}
              >
                <div className={`w-3 h-3 md:w-4 md:h-4 bg-white rounded-full transition-transform ${isWholesale ? 'translate-x-5 md:translate-x-6' : 'translate-x-0'}`} />
              </button>
              <span className={`text-[10px] md:text-xs font-bold ${isWholesale ? 'text-electric-blue' : 'text-slate-400'}`}>Mayor</span>
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <button 
                onClick={() => setCurrencyOpen(!isCurrencyOpen)}
                className="flex items-center gap-1 px-2 md:px-3 py-1.5 rounded-full hover:bg-slate-100/80 transition-colors text-xs md:text-sm font-bold text-slate-700"
              >
                {currency} <ChevronDown className={`w-3 h-3 md:w-4 md:h-4 text-slate-400 transition-transform ${isCurrencyOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isCurrencyOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute z-50 right-0 top-full mt-1 w-20 md:w-24 py-1 bg-white rounded-xl shadow-lg border border-slate-100 origin-top"
                  >
                    {CURRENCIES.map(c => (
                      <button 
                        key={c}
                        onClick={() => {
                          setCurrency(c)
                          setCurrencyOpen(false)
                        }}
                        className={`block w-full text-left px-3 md:px-4 py-1.5 text-xs md:text-sm font-medium hover:bg-slate-50 hover:text-electric-blue transition-colors ${currency === c ? 'text-electric-blue bg-blue-50/50' : 'text-slate-600'}`}
                      >
                        {c}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart */}
            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-1.5 md:p-2 text-slate-700 hover:text-electric-blue transition-colors"
            >
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
              {totalItems > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={totalItems}
                  className="absolute -top-1 -right-1 flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full bg-electric-blue text-[9px] md:text-[11px] font-bold text-white shadow-sm ring-2 ring-white"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar Mobile */}
        <div className="pb-3 block md:hidden">
          <div className="relative">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar productos..." 
              className="w-full bg-white/50 border border-slate-200 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all placeholder:text-slate-400 text-sm font-medium text-slate-800 shadow-sm"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Categories Nav */}
      <nav className="border-t border-slate-200/50 bg-white/95 backdrop-blur-md">
        <div className="container mx-auto px-4 overflow-x-auto no-scrollbar">
          <ul className="flex items-center gap-6 py-2.5">
            <li className="shrink-0">
              <button 
                onClick={() => setFilter('category', 'Todas las categorías')}
                className={`text-sm font-semibold transition-colors whitespace-nowrap ${category === 'Todas las categorías' ? 'text-electric-blue' : 'text-slate-600 hover:text-electric-blue'}`}
              >
                Todas
              </button>
            </li>
            {CATEGORIES.map(cat => (
              <li key={cat} className="shrink-0">
                <button 
                  onClick={() => setFilter('category', cat)}
                  className={`text-sm font-semibold transition-colors whitespace-nowrap ${category === cat ? 'text-electric-blue' : 'text-slate-600 hover:text-electric-blue'}`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
