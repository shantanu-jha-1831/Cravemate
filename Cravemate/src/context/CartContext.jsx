import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [deliveryMode, setDeliveryMode] = useState('restaurant'); // 'peer' or 'restaurant'
  const [orderStatus, setOrderStatus] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [peerDetails, setPeerDetails] = useState(null);

  // Add item to cart
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Update item quantity
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Generate random order ID
  const generateOrderId = () => {
    const newOrderId = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    setOrderId(newOrderId);
    return newOrderId;
  };

  // Assign a peer for delivery (mock function)
  const assignPeer = () => {
    const peers = [
      { name: 'John D.', distance: '0.3 miles', rating: '4.8' },
      { name: 'Sarah M.', distance: '0.5 miles', rating: '4.9' },
      { name: 'Alex T.', distance: '0.7 miles', rating: '4.7' }
    ];
    const randomPeer = peers[Math.floor(Math.random() * peers.length)];
    setPeerDetails(randomPeer);
    return randomPeer;
  };

  // Complete order placement
  const placeOrder = () => {
    const newOrderId = generateOrderId();
    setOrderStatus('preparing');
    
    if (deliveryMode === 'peer') {
      assignPeer();
    }
    
    return newOrderId;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        deliveryMode,
        setDeliveryMode,
        orderStatus,
        setOrderStatus,
        orderId,
        setOrderId,
        peerDetails,
        placeOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);