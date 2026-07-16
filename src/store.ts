import { create } from 'zustand'

export type Currency = 'BS' | 'USD' | 'EUR' | 'USDT'

export interface CartItem {
  id: string
  title: string
  priceUSD: number
  quantity: number
  image: string
}

interface StoreState {
  currency: Currency
  setCurrency: (c: Currency) => void
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  updateQuantity: (id: string, delta: number) => void
  removeFromCart: (id: string) => void
  
  // Cart Drawer
  isCartOpen: boolean
  setCartOpen: (isOpen: boolean) => void
  
  // Checkout Modal
  isCheckoutOpen: boolean
  setCheckoutOpen: (isOpen: boolean) => void
  
  // Pricing Mode
  isWholesale: boolean
  setWholesale: (isWholesale: boolean) => void
  
  // Filters
  searchQuery: string
  setSearchQuery: (query: string) => void
  category: string
  brand: string
  sort: string
  setFilter: (key: 'category' | 'brand' | 'sort', value: string) => void
}

export const useStore = create<StoreState>((set) => ({
  currency: 'USD',
  setCurrency: (currency) => set({ currency }),
  cart: [],
  isCartOpen: false,
  setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
  isCheckoutOpen: false,
  setCheckoutOpen: (isOpen) => set({ isCheckoutOpen: isOpen }),
  isWholesale: false,
  setWholesale: (val) => set({ isWholesale: val }),
  category: 'Todas las categorías',
  brand: 'Todas las marcas',
  sort: 'Destacados',
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilter: (key, value) => set({ [key]: value }),
  addToCart: (item) =>
    set((state) => {
      const oldTotal = state.cart.reduce((sum, i) => sum + i.quantity, 0)
      let newCart;
      
      const existing = state.cart.find((i) => i.id === item.id)
      if (existing) {
        newCart = state.cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      } else {
        newCart = [...state.cart, { ...item, quantity: 1 }]
      }
      
      const newTotal = newCart.reduce((sum, i) => sum + i.quantity, 0)
      let newIsWholesale = state.isWholesale
      if (newTotal >= 10 && oldTotal < 10) newIsWholesale = true
      if (newTotal < 10 && oldTotal >= 10) newIsWholesale = false
      
      return { cart: newCart, isWholesale: newIsWholesale }
    }),
  updateQuantity: (id, delta) =>
    set((state) => {
      const oldTotal = state.cart.reduce((sum, i) => sum + i.quantity, 0)
      const newCart = state.cart
        .map((i) =>
          i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i
        )
        .filter((i) => i.quantity > 0)
        
      const newTotal = newCart.reduce((sum, i) => sum + i.quantity, 0)
      let newIsWholesale = state.isWholesale
      if (newTotal >= 10 && oldTotal < 10) newIsWholesale = true
      if (newTotal < 10 && oldTotal >= 10) newIsWholesale = false
      
      return { cart: newCart, isWholesale: newIsWholesale }
    }),
  removeFromCart: (id) =>
    set((state) => {
      const oldTotal = state.cart.reduce((sum, i) => sum + i.quantity, 0)
      const newCart = state.cart.filter((i) => i.id !== id)
      
      const newTotal = newCart.reduce((sum, i) => sum + i.quantity, 0)
      let newIsWholesale = state.isWholesale
      if (newTotal >= 10 && oldTotal < 10) newIsWholesale = true
      if (newTotal < 10 && oldTotal >= 10) newIsWholesale = false
      
      return { cart: newCart, isWholesale: newIsWholesale }
    }),
}))

export const exchangeRates: Record<Currency, number> = {
  USD: 1,
  BS: 730,
  EUR: 730 / 830, // Si 1 EUR son 830 BS y 1 USD son 730 BS, el precio en EUR es (USD * 730) / 830
  USDT: 0.8, // 20% cheaper
}

export function formatPrice(priceUSD: number, currency: Currency): string {
  const rate = exchangeRates[currency]
  const converted = priceUSD * rate
  
  return new Intl.NumberFormat('es-VE', {
    style: 'currency',
    currency: currency === 'BS' ? 'VED' : currency === 'USDT' ? 'USD' : currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(converted).replace('VED', 'Bs.').replace('USD', currency === 'USDT' ? 'USDT' : '$')
}

export function getEffectivePrice(basePriceUSD: number, isWholesale: boolean): number {
  return isWholesale ? basePriceUSD * 0.8 : basePriceUSD
}
