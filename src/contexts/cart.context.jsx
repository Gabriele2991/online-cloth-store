import { createContext, useState, useEffect, useReducer} from "react";

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

const subtractCartItem = (cartItems, productToSubtract)=>{
    
    const existingItem = cartItems.find((cartItem)=>cartItem.id === productToSubtract.id)
    
    if(existingItem.quantity > 1){
        return cartItems.map((cartItem)=>cartItem.id === productToSubtract.id
            ?{...cartItem, quantity:cartItem.quantity - 1}
            : cartItem
        )

    };
     
    return cartItems.filter(cartItem=>cartItem.id!== productToSubtract.id);
}

const removeCartItem=(cartItems, productToRemove)=>{

    return cartItems.filter(cartItem=>cartItem.id !== productToRemove.id);
}



export const CartContext = createContext({
    isCartOpen: false,
    cartItems:[],
    cartCount:0,
    cartTotal:0,
    setIsCartOpen: ()=>{},
    addItemToCart:()=>{},
    subtractItemFromCart:()=>{},
    removeItemFromCart:()=>{},
})

const CART_ACTION_TYPES = {
    SET_CART_ITEMS:"SET_CART_ITEMS",
    SET_IS_CART_OPEN : "SET_IS_CART_OPEN"
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems:[],
    cartCount:0,
    cartTotal:0,
};

const cartReducer = (state, action)=>{
    const {type,payload} = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                ...payload
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen:payload
            };
        default:
            throw new Error(`Unhandled type ${type} in cartReducer in cartContext`)
    }
}



export const CartProvider =({children})=>{

    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);

    const [{isCartOpen, cartItems,cartCount, cartTotal},dispatch] = useReducer(cartReducer,INITIAL_STATE);

    // useEffect(()=>{
    //     const newCartCount = cartItems.reduce((total, cartItem)=>total+cartItem.quantity, 0);
    //     setCartCount(newCartCount);
    // }, [cartItems]);   

    // useEffect(()=>{
    //     const newCartTotal = cartItems.reduce((total, cartItem)=>total+(cartItem.quantity*cartItem.price), 0);
    //     setCartTotal(newCartTotal);
    // }, [cartItems]);

    const updateCartItemsReducer = (newCartItems)=>{
        const newCartCount = newCartItems.reduce(
            (total, cartItem)=>total+cartItem.quantity, 0
        );

        const newCartTotal = newCartItems.reduce(
            (total, cartItem)=>total+(cartItem.quantity*cartItem.price), 0
        );
        
       dispatch({
            type:CART_ACTION_TYPES.SET_CART_ITEMS,
            payload:{
                cartItems: newCartItems,
                cartCount: newCartCount,
                cartTotal: newCartTotal
            }
        })
    }

    const addItemToCart = (productToAdd) =>{
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const subtractItemFromCart = (productToSubtract)=>{
        const newCartItems = subtractCartItem(cartItems, productToSubtract);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (productToRemove)=>{
        const newCartItems = removeCartItem(cartItems,productToRemove);
        updateCartItemsReducer(newCartItems);
    }
    
    const setIsCartOpen = (bool)=>{
        dispatch({
            type:CART_ACTION_TYPES.SET_IS_CART_OPEN,
            payload:bool
        })
    }


    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        subtractItemFromCart, 
        removeItemFromCart, 
        cartItems, 
        cartCount, 
        cartTotal,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}