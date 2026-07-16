import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const BANNERS = [
  {
    id: 1,
    image: '/banner_gamer.png',
    title: 'Lleva tu setup al siguiente nivel',
    subtitle: 'Componentes High-End con hasta 20% Off',
    cta: 'Ver Ofertas',
  },
  {
    id: 2,
    image: '/banner_laptops.png',
    title: 'Portabilidad y Potencia',
    subtitle: 'Descubre la nueva línea de Laptops Premium',
    cta: 'Explorar Laptops',
  }
]

export function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % BANNERS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const next = () => setCurrent((prev) => (prev + 1) % BANNERS.length)
  const prev = () => setCurrent((prev) => (prev - 1 + BANNERS.length) % BANNERS.length)

  return (
    <div className="relative w-full h-[300px] md:h-[450px] overflow-hidden rounded-2xl group shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
          <img 
            src={BANNERS[current].image} 
            alt="Banner" 
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-8 md:px-16">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="max-w-xl text-white"
              >
                <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">{BANNERS[current].title}</h2>
                <p className="text-lg md:text-xl text-slate-200 mb-8 font-medium">{BANNERS[current].subtitle}</p>
                <button className="bg-electric-blue hover:bg-blue-600 text-white px-8 py-3 rounded-full font-bold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,85,255,0.4)]">
                  {BANNERS[current].cta}
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button 
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button 
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${current === i ? 'bg-electric-blue w-8' : 'bg-white/50 hover:bg-white/80'}`}
          />
        ))}
      </div>
    </div>
  )
}
