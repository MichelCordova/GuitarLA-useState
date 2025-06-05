import { useEffect, useState, useMemo } from "react"
import { db } from "../data/db";


const useCart = () => {
    

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }


  const [data, setData] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])
  

  const addToCart = (item) =>{

    const itemExist = cart.findIndex(guitar => guitar.id === item.id)
    if (itemExist >= 0){ //existe en el carrito
        if(cart[itemExist].quantity >= MAX_ITEMS) return
        const updatedCart = [...cart]
        updatedCart[itemExist].quantity++
        setCart(updatedCart)
    }else{
        item.quantity = 1
        setCart([...cart, item])
    }

  }

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  const increaseQuantity= (id) => {
    const updateCart = cart.map(item => {
        if (item.id === id && item.quantity < MAX_ITEMS) {
            return{
                ...item,
                quantity: item.quantity + 1
            }
        }
        return item
    })
    setCart(updateCart)
  }

  const decreaseQuantity = (id) => {
    const updateCart = cart.map(item => {
        if (item.id === id && item.quantity > MIN_ITEMS){
            return{
                ...item,
                quantity: item.quantity - 1
            }
        }
        return item
    })
    setCart(updateCart)
  }

  const clearCart = () => {
    setCart([])
  }



   // State Derivado

   const isEmpy = useMemo(() => cart.length === 0, [cart]) 
   const cartTotal = useMemo(() => cart.reduce( (total, item) => total + (item.quantity * item.price), 0), [cart])
  

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpy,
        cartTotal
    }
};


export default useCart;

