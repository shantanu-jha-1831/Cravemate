import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Recommendations from './pages/Recommendations';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Header from './components/Header';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import Signup from './pages/Signup';

function App() {
  return (
    <CartProvider>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#f9f9f9'
      }}>
        {/* Header */}
        <Header />
        
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
      
        
        {/* Footer */}
        <Footer />
      </Box>
    </CartProvider>
  );
}

export default App;
