import { useState, useRef, useEffect } from 'react'
import { SlidersHorizontal, ArrowUpDown, ChevronDown } from 'lucide-react'
import { useStore } from '../store'
import { CATEGORIES, BRANDS } from '../data/products'
import { motion, AnimatePresence } from 'framer-motion'

type DropdownType = 'category' | 'brand' | 'sort' | null

interface CustomSelectProps {
  label?: string
  value: string
  options: string[]
  isOpen: boolean
  onToggle: () => void
  onSelect: (value: string) => void
  className?: string
}

function CustomSelect({ label, value, options, isOpen, onToggle, onSelect, className = '' }: CustomSelectProps) {
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between gap-2 px-3 md:px-4 py-2 rounded-xl border transition-all text-sm font-semibold
          ${isOpen 
            ? 'bg-blue-50 border-blue-200 text-electric-blue shadow-sm' 
            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
          }`}
      >
        <div className="flex items-center gap-1 truncate">
          {label && <span className="text-slate-500 font-medium shrink-0">{label}</span>}
          <span className="truncate">{value}</span>
        </div>
        <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-electric-blue' : 'text-slate-400'}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 origin-top-left"
          >
            <div className="max-h-64 overflow-y-auto p-1 custom-scrollbar">
              {options.map(option => (
                <button
                  key={option}
                  onClick={() => onSelect(option)}
                  className={`w-full text-left px-4 py-2 text-sm font-semibold rounded-lg transition-colors
                    ${value === option 
                      ? 'bg-blue-50 text-electric-blue' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-electric-blue'
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Filters() {
  const { category, brand, sort, setFilter } = useStore()
  const [openDropdown, setOpenDropdown] = useState<DropdownType>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleToggle = (type: DropdownType) => {
    setOpenDropdown(openDropdown === type ? null : type)
  }

  const handleSelect = (key: 'category' | 'brand' | 'sort', value: string) => {
    setFilter(key, value)
    setOpenDropdown(null)
  }

  return (
    <div ref={containerRef} className="flex flex-col gap-4 py-6 my-6 border-y border-slate-200">
      
      {/* Primera fila: Título Filtros y Botones Categoría/Marca */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-2 text-slate-700 font-bold sm:mr-2">
          <SlidersHorizontal className="w-5 h-5 text-electric-blue" />
          <span>Filtros</span>
        </div>
        
        <div className="grid grid-cols-1 sm:flex sm:flex-wrap sm:items-center gap-3 w-full sm:w-auto">
          <CustomSelect
            className="w-full sm:w-auto"
            value={category}
            options={['Todas las categorías', ...CATEGORIES]}
            isOpen={openDropdown === 'category'}
            onToggle={() => handleToggle('category')}
            onSelect={(val) => handleSelect('category', val)}
          />
          
          <CustomSelect
            className="w-full sm:w-auto"
            value={brand}
            options={['Todas las marcas', ...BRANDS]}
            isOpen={openDropdown === 'brand'}
            onToggle={() => handleToggle('brand')}
            onSelect={(val) => handleSelect('brand', val)}
          />
        </div>
      </div>

      {/* Segunda fila: Ordenar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-end w-full pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        <div className="flex items-center gap-2 text-slate-700 font-bold">
          <ArrowUpDown className="w-5 h-5 text-electric-blue" />
          <span>Ordenar</span>
        </div>
        
        <CustomSelect
          className="w-full sm:w-64"
          value={sort}
          options={['Destacados', 'Menor Precio', 'Mayor Precio', 'Nombre (A-Z)', 'Nombre (Z-A)']}
          isOpen={openDropdown === 'sort'}
          onToggle={() => handleToggle('sort')}
          onSelect={(val) => handleSelect('sort', val)}
        />
      </div>
      
    </div>
  )
}
