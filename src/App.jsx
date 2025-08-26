import { useState,useCallback } from 'react'
import './App.css'
import Header from './Components/Header'
import Stats from './Components/Stats'
import { products as initialProducts } from './config/product'
import Product from './Components/Product'

function App() {
  const [cartItems,setCartItems]=useState([])
  const [openCart,setOpenCart]=useState(false)
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
 const onCartClick = useCallback(() => {
    setOpenCart(true);
  }, []);


  return (
    <>
    
     <Header cartItems={cartItems} onCartClick={onCartClick} setOpenCart={setOpenCart} openCart={openCart} setCartItems={setCartItems} search={search} setSearch={setSearch}/>
     <Stats products={products}/>
     <Product products={products} setCartItems={setCartItems} setProducts={setProducts}/>

    
    </>
  )
}

export default App
