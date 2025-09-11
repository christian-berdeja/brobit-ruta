import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProductsPage from './pages/products'

function App() {

  return (
    <BrowserRouter> 
    <Routes>
      <Route path='/productos' element = { <ProductsPage/> }/>
      {/* <Route path="/success" element ={<Success />} />
      <Route path="/canceled" element = {<Canceled />} /> */}
    </Routes>
    </BrowserRouter>
      
    
  )
}

export default App
