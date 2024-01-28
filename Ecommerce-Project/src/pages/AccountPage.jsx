import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import accountStyles from './AccountPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faSignOutAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { getAccountDetails, getOrders, updateAccount, logout } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const AccountPage = () => {
    const navigate = useNavigate();
    const [view, setView] = useState('account');
    const [accountDetails, setAccountDetails] = useState(null);
    const [orders, setOrders] = useState(null);
    const [error, setError] = useState('');
    const { logOut } = useAuth();

    const viewNames = {
        'account': 'Account Details',
        'orders': 'My Orders',
        'edit': 'Edit Account'
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setError(''); // Clear any previous errors

                const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

                if (view === 'account') {
                    const details = await getAccountDetails(token);
                    setAccountDetails(details);
                } else if (view === 'orders') {
                    const orderHistory = await getOrders(token);
                    setOrders(orderHistory);
                }
            } catch (err) {
                setError(err.message || 'An error occurred');
            }
        };

        fetchData();
    }, [view]);

    const handleLogout = async () => {
        logOut(); // Use logOut function from AuthContext
        setOrders([]); // Clear the orders
        navigate('/login');
    };

    const renderAccountDetails = () => {
        if (error) return <div>Error: {error}</div>;
        if (!accountDetails) return <div>Loading account details...</div>;
        return <pre>{JSON.stringify(accountDetails, null, 2)}</pre>;
    };

    const renderOrders = () => {
        if (error) return <div>Error: {error}</div>;
        if (!orders) return <div>Loading orders...</div>;
        if (orders.length === 0) return <div>No orders have been made.</div>; // Add this line
    
        // Sort orders by date in descending order (recent orders first)
        const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return (
            <div style={{ padding: '20px' }}>
                <h2 style={{ marginBottom: '20px' }}>Your Orders</h2>
                {sortedOrders.map(order => (
                    <div key={order._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
                        <p><strong>Order ID:</strong> {order._id}</p>
                        {order.products.map(product => (
                            <div key={product._id} style={{ marginBottom: '10px' }}>
                                <p><strong>Product Name:</strong> {product.product.name}</p>
                                <p><strong>Quantity:</strong> {product.quantity}</p>
                                <p><strong>Price:</strong> {product.product.price} kr</p>
                            </div>
                        ))}
                        <p><strong>Total Price:</strong> {order.totalPrice} kr</p>
                        <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        );
    };

    const EditAccount = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const handleSubmit = (event) => {
            event.preventDefault();
            updateAccount({ email, password });
        };

        return (
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Update Account</button>
            </form>
        );
    };

    return (
        <div className={accountStyles.container}>
            <div className={accountStyles.leftPanel}>
                <button onClick={() => setView('account')} className={`${accountStyles.loginRegisterButton} ${view === 'account' ? accountStyles.active : ''}`}>
                    <FontAwesomeIcon icon={faUserEdit} /> Account Details
                </button>
                <button onClick={() => setView('orders')} className={`${accountStyles.loginRegisterButton} ${view === 'orders' ? accountStyles.active : ''}`}>
                    <FontAwesomeIcon icon={faShoppingCart} /> Orders
                </button>
                <button onClick={() => setView('edit')} className={`${accountStyles.loginRegisterButton} ${view === 'edit' ? accountStyles.active : ''}`}>
                    <FontAwesomeIcon icon={faUserEdit} /> Edit Account
                </button>
                <button onClick={handleLogout} className={accountStyles.loginRegisterButton}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
                </button>
            </div>
            <div className={accountStyles.rightPanel}>
                <h1>{viewNames[view]}</h1>
                {view === 'account' && renderAccountDetails()}
                {view === 'orders' && renderOrders()}
                {view === 'edit' && <EditAccount />}
            </div>
        </div>
    );
};

export default AccountPage;