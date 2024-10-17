import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-items/checkout-item.component";

import "./checkout.styles.scss";
const Checkout = ()=>{
    

    const { cartItems, addItemToCart, removeItemFromCart } = useContext(CartContext);

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map((cartItem) => 
                <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
                // const {id, imageUrl, name, quantity, price} = cartItem;
                // return (
                //     <div key={id} className="checkout-item-container">
                //         <div className="image-container">
                //             <img src={imageUrl} alt="" />
                //         </div>
                //         <h2>{name}</h2>
                //         <span>{quantity}</span>
                //         <span>{price}</span>
                //         <br />
                //         <span onClick={() => { removeItemFromCart(cartItem) }}>decrement</span>
                //         <br />
                //         <span onClick={() => addItemToCart(cartItem)}>increment</span>
                //     </div>
                // )
                )}
            <span className="total">Total : 0</span>
        </div>
    )

}

export default Checkout;