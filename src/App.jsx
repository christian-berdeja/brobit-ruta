import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProductsPage from './pages/productPage.jsx'
import SalesPage from './pages/salePage.jsx'
import HomePage from './pages/homePage.jsx'
import InventoryPage from './pages/inventoryPage.jsx'
import StorePage from './pages/storePage.jsx'

function App() {

  return (
    <BrowserRouter> 
    <Routes>
      <Route path="/" element={ <HomePage/> } />
      <Route path='/productos' element = { <ProductsPage/> }/>
      <Route path='/ventas' element = { <SalesPage/> }/>
      <Route path='/inventario' element = { <InventoryPage /> }/>
      <Route path='/tienda' element = { < StorePage /> }/>
    </Routes>
    </BrowserRouter>
      
    
  )
}

export default App
