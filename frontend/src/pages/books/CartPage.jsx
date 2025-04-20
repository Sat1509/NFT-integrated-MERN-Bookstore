import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getImgUrl } from '../../utils/getImgUrl';
import { clearCart, removeFromCart } from '../../redux/features/cart/cartSlice';
import './css/CartPage.css';

const CartPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();

    const totalPrice = cartItems.reduce((acc, item) => {
        const price = item.newPrice !== undefined ? item.newPrice : item.price;
        return acc + (price || 0);
      }, 0).toFixed(2);
      

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h2>Shopping Cart</h2>
                <button onClick={handleClearCart} className="clear-cart">Clear Cart</button>
            </div>

            <div className="cart-items">
                {cartItems.length > 0 ? (
                    <ul>
                        {cartItems.map((product) => (
                            <li key={product?._id} className="cart-item">
                                <img src={getImgUrl(product?.coverImage)} alt={product?.title} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h3 className="cart-item-heading">
                                        <Link to='/'>{product?.title}</Link>
                                    </h3>
                                    <p className="cart-item-price"><strong>Price: </strong>₹{product?.newPrice ?? product?.price}</p>

                                    <p className="cart-item-category"><strong>Category: </strong>{product?.category}</p>
                                    <p className="cart-item-qty"><strong>Qty:</strong> 1</p>
                                    <button onClick={() => handleRemoveFromCart(product)} className="remove-item">Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="empty-cart">No products found!</p>
                )}
            </div>

            <div className="cart-footer">
                <div className="cart-subtotal">
                    <p>Subtotal</p>
                    <p>₹{totalPrice ? totalPrice : 0}</p>
                </div>
                <p className="cart-shipping">Shipping and taxes calculated at checkout.</p>
                <Link to="/checkout" className="checkout-btn">Checkout</Link>
                <Link to="/" className="continue-shopping">Continue Shopping →</Link>
            </div>
        </div>
    );
};

export default CartPage;