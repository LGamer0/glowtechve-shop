import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProductCard } from './ProductCard'
import { PRODUCTS } from '../data/products'
import { useStore } from '../store'

export function ProductGrid() {
  const { category, brand, sort, searchQuery } = useStore()

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS]

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q)
      )
    }

    if (category !== 'Todas las categorías') {
      result = result.filter(p => p.category === category)
    }

    if (brand !== 'Todas las marcas') {
      result = result.filter(p => p.brand === brand)
    }

    if (sort === 'Menor Precio') {
      result.sort((a, b) => a.priceUSD - b.priceUSD)
    } else if (sort === 'Mayor Precio') {
      result.sort((a, b) => b.priceUSD - a.priceUSD)
    } else if (sort === 'Nombre (A-Z)') {
      result.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sort === 'Nombre (Z-A)') {
      result.sort((a, b) => b.title.localeCompare(a.title))
    }

    return result
  }, [category, brand, sort, searchQuery])

  if (filteredProducts.length === 0) {
    return (
      <div className="py-12 text-center text-slate-500">
        <h3 className="text-lg font-bold text-slate-700">No se encontraron productos</h3>
        <p>Intenta ajustar los filtros para ver más resultados.</p>
      </div>
    )
  }

  return (
    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence mode="popLayout">
        {filteredProducts.map(product => (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            key={product.id}
          >
            <ProductCard {...product} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
