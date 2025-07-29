// src/pages/DeliveryPartner.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DeliveryPartner = () => {
  const [orders, setOrders] = useState([
    {
      id: 'CM-1001',
      customer: 'Vaishnavi',
      address: '3rd Floor, Seminar-Hall, AUJ',
      amount: 24.99,
      status: 'ready',
      items: ['Soya chap', 'Brownie']
    },
    {
      id: 'CM-1002',
      customer: 'Sambhavi',
      address: '3rd Floor, Seminar-Hall, AUJ',
      amount: 32.50,
      status: 'assigned',
      items: ['Sprouts', 'Rice-Dal']
    },
    {
      id: 'CM-1003',
      customer: 'Apeksha',
      address: '3rd Floor, Seminar-Hall, AUJ',
      amount: 18.75,
      status: 'preparing',
      items: ['Veggie Burger', 'Fries']
    }
  ]);
  
  const [isAvailable, setIsAvailable] = useState(true);

  const handleAcceptOrder = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? {...order, status: 'assigned'} : order
    ));
  };

  const handleCompleteOrder = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  return (
    <div className="delivery-dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Delivery Partner Dashboard</h1>
          
          <div className="header-actions">
            <span className={`status-bubble ${isAvailable ? 'available' : 'unavailable'}`}>
              {isAvailable ? 'Available' : 'Unavailable'}
            </span>
            <button 
              onClick={() => setIsAvailable(!isAvailable)}
              className={`toggle-availability ${isAvailable ? 'offline' : 'online'}`}
            >
              {isAvailable ? 'Go Offline' : 'Go Online'}
              <span className="availability-icon">
                {isAvailable ? '🚫' : '✅'}
              </span>
            </button>
            <Link to="/" className="main-site-link">
              ← Back to Main Site
            </Link>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card pending">
            <h3>Pending Deliveries</h3>
            <p>{orders.filter(o => o.status !== 'delivered').length}</p>
          </div>
          <div className="stat-card completed">
            <h3>Completed Today</h3>
            <p>12</p>
          </div>
          <div className="stat-card earnings">
            <h3>Total Earnings</h3>
            <p>$87.50</p>
          </div>
        </div>
        
        {/* Orders Table */}
        <div className="orders-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>CUSTOMER</th>
                <th>ITEMS</th>
                <th>ADDRESS</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id">#{order.id}</td>
                  <td className="customer">{order.customer}</td>
                  <td className="items">
                    <ul>
                      {order.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="address">{order.address}</td>
                  <td className="amount">${order.amount.toFixed(2)}</td>
                  <td className="status">
                    <span className={`status-badge ${order.status}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="actions">
                    {order.status === 'ready' && (
                      <button
                        onClick={() => handleAcceptOrder(order.id)}
                        className="btn accept-btn"
                      >
                        Accept
                      </button>
                    )}
                    {order.status === 'assigned' && (
                      <button
                        onClick={() => handleCompleteOrder(order.id)}
                        className="btn complete-btn"
                      >
                        Complete
                      </button>
                    )}
                    <button className="btn details-btn">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Map Section */}
        <div className="map-section">
          <h2>Delivery Route</h2>
          <div className="map-placeholder">
            <p>Map integration would go here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPartner;