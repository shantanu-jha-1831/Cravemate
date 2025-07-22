import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Menu from '../pages/Menu';
import Recommendations from '../pages/Recommendations';
import Checkout from '../pages/Checkout';
import OrderConfirmation from '../pages/OrderConfirmation';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/recommendations" element={<Recommendations />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-confirmation" element={<OrderConfirmation />} />
    </Routes>
  );
};

export default AppRoutes;