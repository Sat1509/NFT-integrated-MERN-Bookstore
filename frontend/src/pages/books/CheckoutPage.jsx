import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';
import './css/CheckoutPage.css';

const CheckoutPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => {
        const price = item.newPrice !== undefined ? item.newPrice : item.price;
        return acc + (price || 0);
      }, 0).toFixed(2);
      
    const { currentUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const navigate = useNavigate();
    const [showUPIPayment, setShowUPIPayment] = useState(false);

    const onSubmit = async (data) => {
        if (!showUPIPayment) {
            setShowUPIPayment(true);
            return;
        }
    
        // Categorize cart items
        const productIds = cartItems
            .filter(item => !item.nftMetadata)
            .map(item => item._id);
    
        const specialEditionIds = cartItems
            .filter(item => item.nftMetadata)
            .map(item => item._id);
    
        const newOrder = {
            name: data.name,
            email: currentUser?.email,
            upiId: data.upiId,
            address: {
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode,
            },
            phone: data.phone,
            productIds,
            specialEditionIds,
            totalPrice: totalPrice,
            paymentMethod: "UPI",
        };
    
        try {
            await createOrder(newOrder).unwrap();
            //await refetch();
            Swal.fire({
                title: "Payment Successful",
                text: "Your order was placed successfully!",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Okay!",
            });
            navigate("/orders");
            window.location.reload();
        } catch (error) {
            console.error("Error placing the order", error);
            alert("Failed to place the order");
        }
    };
    

    if (isLoading) return <div className="loading">Loading...</div>;

    return (
        <section className="checkout-container">
            <div className="checkout-wrapper">
                <div>
                    <h2 className="checkout-title">Checkout</h2>
                    <p className="checkout-text">Total Price: ₹{totalPrice}</p>
                    <p className="checkout-text">Items: {cartItems.length > 0 ? cartItems.length : 0}</p>
                </div>

                <div className="checkout-form-container">
                    {!showUPIPayment ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="checkout-form">
                            <div className="form-header">
                                <p className="form-title">Personal Details</p>
                                <p>Please fill out all the fields.</p>
                            </div>

                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input {...register("name", { required: true })} type="text" id="name" className="input-field" />
                            </div>



                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input {...register("phone", { required: true })} type="number" id="phone" className="input-field" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <input {...register("city", { required: true })} type="text" id="city" className="input-field" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <input {...register("country", { required: true })} type="text" id="country" className="input-field" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="state">State / Province</label>
                                <input {...register("state", { required: true })} type="text" id="state" className="input-field" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="zipcode">Zipcode</label>
                                <input {...register("zipcode", { required: true })} type="text" id="zipcode" className="input-field" />
                            </div>

                            <div className="terms">
                                <input type="checkbox" id="terms" required />
                                <label htmlFor="terms">
                                    I agree to the <Link to="/terms" className="link">Terms & Conditions</Link> and <Link to="/policy" className="link">Shopping Policy</Link>.
                                </label>
                            </div>

                            <button className="checkout-button">Proceed to Payment</button>
                        </form>
                    ) : (
                        <div className="upi-payment-container">
                            <h2>UPI Payment</h2>
                            <div className="form-group">
                                <label>Total Amount (₹)</label>
                                <input type="text" className="input-field" value={totalPrice} disabled />
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <label htmlFor="upiId">UPI ID</label>
                                    <input {...register("upiId", { required: true })} type="text" id="upiId" className="input-field" placeholder="example@upi" />
                                </div>
                                <button type="submit" className="checkout-button">Pay Now</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CheckoutPage;
