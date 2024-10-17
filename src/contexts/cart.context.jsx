import { createContext, useState, useEffect} from "react";

const addCartItem = (cartItems, productToAdd)=>{

    const existingItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)
    
    if(existingItem){
        return cartItems.map((cartItem)=>cartItem.id === productToAdd.id 
            ?{...cartItem, quantity:cartItem.quantity + 1}
            : cartItem
        )
    }

    return [...cartItems, {...productToAdd, quantity:1}];
}

const removeCartItem = (cartItems, productToRemove)=>{
    
    const existingItem = cartItems.find((cartItem)=>cartItem.id === productToRemove.id)
    
    if(existingItem.quantity > 1){
        return cartItems.map((cartItem)=>cartItem.id === productToRemove.id
            ?{...cartItem, quantity:cartItem.quantity - 1}
            : cartItem
        )

    };
     
    return cartItems.filter(cartItem=>cartItem.id!== productToRemove.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: ()=>{},
    cartItems:[],
    addItemToCart:()=>{},
    removeItemFromCart:()=>{},
    cartCount:0
})

export const CartProvider =({children})=>{

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, cartItem)=>total+cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])   

    const addItemToCart = (productToAdd) =>{
        setCartItems(addCartItem(cartItems, productToAdd))
    }
    const removeItemFromCart = (productToRemove)=>{
        setCartItems(removeCartItem(cartItems, productToRemove));
    }
    
    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, cartItems, cartCount};

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}