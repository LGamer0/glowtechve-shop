import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Truck, User, CreditCard, Phone, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react'
import { useStore, formatPrice, getEffectivePrice } from '../store'
import { AnimatedPrice } from './AnimatedPrice'

const PREFIXES = ['0412', '0414', '0424', '0416', '0426', '0422']
const SHIPPING = ['Zoom', 'MRW', 'Tealca', 'Domesa']

export function CheckoutPage() {
  const { setCheckoutOpen, cart, updateQuantity, removeFromCart, currency, isWholesale } = useStore()
  
  const subtotalUSD = cart.reduce((sum, item) => sum + getEffectivePrice(item.priceUSD, isWholesale) * item.quantity, 0)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const canCheckout = !isWholesale || totalItems >= 10
  
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    phonePrefix: '0424',
    phone: '',
    state: '',
    city: '',
    address: '',
    shipping: 'Zoom'
  })
  
  const [isPrefixOpen, setIsPrefixOpen] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleWhatsapp = () => {
    const total = formatPrice(subtotalUSD, currency)
    let message = `*¡Hola GlowTechVe! Quiero concretar mi pedido:*%0A%0A`
    
    message += `*📝 Datos del Cliente:*%0A`
    message += `- Nombre: ${formData.name}%0A`
    message += `- Cédula: ${formData.id}%0A`
    message += `- Teléfono: ${formData.phonePrefix}-${formData.phone}%0A%0A`
    
    message += `*📍 Datos de Envío:*%0A`
    message += `- Estado: ${formData.state}%0A`
    message += `- Ciudad: ${formData.city}%0A`
    message += `- Dirección: ${formData.address}%0A`
    message += `- Encomienda: ${formData.shipping}%0A%0A`
    
    message += `*🛒 Pedido:*%0A`
    cart.forEach(item => {
      const effectivePrice = getEffectivePrice(item.priceUSD, isWholesale);
      message += `- ${item.quantity}x ${item.title} (${formatPrice(effectivePrice, currency)} c/u)%0A`
    })
    
    message += `%0A*Total a pagar: ${total}*`

    window.open(`https://wa.me/584245647331?text=${message}`, '_blank')
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <button 
        onClick={() => setCheckoutOpen(false)}
        className="flex items-center gap-2 text-slate-500 hover:text-electric-blue font-bold mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver a la tienda
      </button>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        
        {/* Left Section: Cart Items */}
        <div className="flex-1 lg:w-1/2 flex flex-col w-full">
          <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
            Tu Pedido
          </h2>
          
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 w-full min-h-[400px]">
            <div className="flex flex-col gap-4">
              {cart.length === 0 ? (
                <p className="text-slate-500 font-medium text-center py-12">Tu carrito está vacío.</p>
              ) : (
                cart.map(item => {
                  const effectivePrice = getEffectivePrice(item.priceUSD, isWholesale);
                  const itemTotal = effectivePrice * item.quantity;
                  return (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex flex-col sm:flex-row gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 items-start sm:items-center relative"
                  >
                    <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center p-2 shrink-0 border border-slate-200">
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                    </div>
                    
                    <div className="flex-1 w-full">
                      <h4 className="font-bold text-slate-800 mb-1 leading-tight">{item.title}</h4>
                      
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
                        <p className="text-slate-500 text-sm font-medium flex items-center gap-1">
                          <AnimatedPrice price={formatPrice(effectivePrice, currency)} /> c/u
                        </p>
                        <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full ${isWholesale ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>
                          {isWholesale ? 'Al Mayor' : 'Al Detal'}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden h-9 shadow-sm">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-9 h-full flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-electric-blue transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-10 text-center font-bold text-slate-800">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-9 h-full flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-electric-blue transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Total</p>
                          <AnimatedPrice price={formatPrice(itemTotal, currency)} className="font-black text-electric-blue text-lg leading-none" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )})
              )}
            </div>
          </div>
        </div>

        {/* Right Section: Form & Checkout */}
        <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col w-full">
          
          <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
            <User className="w-6 h-6 text-electric-blue" />
            Datos de Envío y Contacto
          </h2>

          {/* Form */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 mb-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-600 mb-1.5">Nombre y Apellido</label>
                  <input 
                    name="name" value={formData.name} onChange={handleChange}
                    placeholder="Ej. Juan Pérez"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:bg-white transition-all font-medium"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-600 mb-1.5">Cédula</label>
                  <div className="flex relative">
                    <CreditCard className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input 
                      name="id" value={formData.id} onChange={handleChange}
                      placeholder="V-12345678"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:bg-white transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-600 mb-1.5">Teléfono</label>
                  <div className="flex bg-slate-50 border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-electric-blue focus-within:bg-white transition-all overflow-visible relative z-20">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsPrefixOpen(!isPrefixOpen)}
                        className="h-full flex items-center justify-between gap-2 bg-transparent px-4 py-3 font-bold text-slate-700 outline-none border-r border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors w-24"
                      >
                        {formData.phonePrefix}
                        <svg className={`w-4 h-4 text-slate-400 transition-transform ${isPrefixOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </button>
                      
                      {isPrefixOpen && (
                        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-30">
                          {PREFIXES.map(p => (
                            <button
                              key={p}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, phonePrefix: p })
                                setIsPrefixOpen(false)
                              }}
                              className={`w-full text-left px-4 py-2.5 font-bold transition-colors ${formData.phonePrefix === p ? 'bg-blue-50 text-electric-blue' : 'text-slate-600 hover:bg-slate-50 hover:text-electric-blue'}`}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="relative flex-1">
                      <Phone className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input 
                        name="phone" value={formData.phone} onChange={handleChange}
                        placeholder="1234567"
                        maxLength={7}
                        className="w-full bg-transparent pl-10 pr-4 py-3 focus:outline-none font-medium tracking-widest"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2 pt-2 pb-1">
                  <hr className="border-slate-100" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1.5">Estado</label>
                  <input 
                    name="state" value={formData.state} onChange={handleChange}
                    placeholder="Ej. Miranda"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:bg-white transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1.5">Ciudad</label>
                  <input 
                    name="city" value={formData.city} onChange={handleChange}
                    placeholder="Ej. Caracas"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:bg-white transition-all font-medium"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-600 mb-1.5">Dirección Específica</label>
                  <input 
                    name="address" value={formData.address} onChange={handleChange}
                    placeholder="Calle, Av, Casa o Edificio"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:bg-white transition-all font-medium"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-600 mb-1.5">Empresa de Encomiendas</label>
                  <div className="grid grid-cols-2 gap-3">
                    {SHIPPING.map(company => (
                      <button
                        key={company}
                        onClick={() => setFormData({ ...formData, shipping: company })}
                        className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 font-bold transition-all ${
                          formData.shipping === company 
                          ? 'border-electric-blue bg-blue-50 text-electric-blue' 
                          : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'
                        }`}
                      >
                        <Truck className={`w-4 h-4 ${formData.shipping === company ? 'text-electric-blue' : 'text-slate-400'}`} />
                        {company}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Totals & Buttons */}
          <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <span className="text-slate-400 font-medium text-lg">Total a pagar</span>
              <AnimatedPrice price={formatPrice(subtotalUSD, currency)} className="text-3xl font-black text-electric-blue" />
            </div>
            
            {!canCheckout && (
              <p className="text-xs text-red-400 font-bold mb-4 text-center bg-red-900/30 p-3 rounded-xl border border-red-900/50">
                Debes tener al menos 10 unidades en total en tu pedido para poder comprar con precios al mayor.
              </p>
            )}

            <div className="flex flex-col gap-4">
              <button 
                onClick={handleWhatsapp}
                disabled={cart.length === 0 || !canCheckout}
                className="w-full bg-[#25D366] hover:bg-[#1EBE5D] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <MessageCircle className="w-6 h-6" />
                Continuar Compra en WhatsApp
              </button>
              
              <button 
                onClick={() => setCheckoutOpen(false)}
                className="w-full px-6 py-4 font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
              >
                Seguir Comprando
              </button>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  )
}
