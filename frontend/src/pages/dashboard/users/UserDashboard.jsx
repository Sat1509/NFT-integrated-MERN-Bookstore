import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useGetOrderByEmailQuery } from '../../../redux/features/orders/ordersApi';
import './UserDashboard.css';

const UserDashboard = () => {
    const { currentUser } = useAuth();
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);

    if (isLoading) return <div className="loading-message">Loading...</div>;
    if (isError) return <div className="error-message">Error getting orders data</div>;

    return (
        <div className="user-dashboard-container">
            <div className="user-dashboard-content">
                <h1 className="dashboard-title">User Dashboard</h1>
                <p className="welcome-message">Welcome, {currentUser?.name || 'User'}! Here are your recent orders:</p>

                <div className="orders-section">
                    <h2 className="orders-title">Your Orders</h2>
                    {orders.length > 0 ? (
                        <ul className="orders-list">
                            {orders.map((order) => (
                                <li key={order._id} className="order-item">
                                    <p className="order-id">Order ID: {order._id}</p>
                                    <p className="order-date">Date: {new Date(order?.createdAt).toLocaleDateString()}</p>
                                    <p className="order-total">Total: ${order.totalPrice}</p>
                                    {order.productIds.map((productId) => (
                                        <p key={productId} className="product-id">{productId}</p>
                                    ))}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-orders-message">You have no recent orders.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
