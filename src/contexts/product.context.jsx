import { createContext, useState, useEffect } from "react";
import PRODUCTS from "../utils/shop-data.js"

export const ProductsContext = createContext({
    products: [],
});

export const ProductsProvider = ({children})=>{
    const [products, setProducts] = useState(PRODUCTS);
    const value = {products};

    useEffect(()=>{

    },[])
     return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

