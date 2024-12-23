import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../contexts/cart.context";
import CartItem from "../cart-item/cart-item.component";
import Button from "../button/button.component";

import {CartDropdownContainer, EmptyMessageContainer, CartItemsContainer} from "./cart-dropdown.styles"

const CartDropdown = ()=>{
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = ()=>{
        navigate("/checkout");
    }

    return (
        <CartDropdownContainer>
            <CartItemsContainer>
            {
                cartItems.length ? (cartItems.map((item) =>(
                    <CartItem key={item.id} cartItem={item} />
                ))) : (<EmptyMessageContainer>Your Cart is empty</EmptyMessageContainer>)
            }
            </CartItemsContainer>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;