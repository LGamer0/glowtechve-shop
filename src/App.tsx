import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Filters } from './components/Filters'
import { ProductGrid } from './components/ProductGrid'
import { CartDrawer } from './components/CartDrawer'
import { CheckoutPage } from './components/CheckoutPage'
import { useStore } from './store'

function App() {
  const { isCheckoutOpen } = useStore()

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <CartDrawer />
      
      {isCheckoutOpen ? (
        <CheckoutPage />
      ) : (
        <main className="flex-1 container mx-auto px-4 py-8">
          <Hero />
          <Filters />
          
          <div className="mb-12">
            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-electric-blue rounded-full inline-block"></span>
              Productos Destacados
            </h2>
            <ProductGrid />
          </div>
        </main>
      )}
      
      <footer className="bg-slate-900 text-slate-400 py-12 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-white mb-4">
            <span className="text-2xl font-black tracking-tighter">GlowTechVe</span>
          </div>
          <p className="text-sm">Demo creada para propósitos de exhibición.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
