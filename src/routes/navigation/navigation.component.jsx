import { Fragment,useContext } from "react";
import { Outlet} from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import {ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import {NavigationContainer,LogoContainer,NavLinks,NavLink} from"./navigation.styles";

const NavigationBar = ()=>{
    const {currentUser}= useContext(UserContext);
    const {isCartOpen}= useContext(CartContext);

    const signOutHandler = async()=>{
        await signOutUser();
    }

    return(
        <Fragment>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrwnLogo className="logo"/>
                </LogoContainer>
                <NavLinks>
                    <NavLink to="/shop">
                        SHOP
                    </NavLink>
                    <CartIcon />
                    {
                        currentUser ? (<NavLink as="span" onClick={signOutHandler}>SIGN OUT</NavLink>
                        ) : (
                        <NavLink to="/auth">
                            SIGN IN
                        </NavLink>
                    )}
                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    );
}

export default NavigationBar;