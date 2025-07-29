import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Avatar,
  Chip,
  Divider
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  LocalShipping as ShippingIcon,
  Restaurant as RestaurantIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';

const OrderConfirmation = () => {
  const { deliveryMode, orderId, peerDetails, orderStatus, setOrderStatus } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(deliveryMode === 'peer' ? 15 : 30);

  // Mock order progress
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < 3) return prev + 1;
        return prev;
      });

      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));

      // Update order status in context
      if (activeStep === 0) setOrderStatus('preparing');
      if (activeStep === 1) setOrderStatus('in-transit');
      if (activeStep === 2) setOrderStatus('delivered');
    }, 5000); // Update every 5 seconds for demo

    return () => clearInterval(timer);
  }, [activeStep, setOrderStatus]);

  const steps = deliveryMode === 'peer' 
    ? [
        'Order Confirmed',
        'Peer Preparing',
        'On the Way',
        'Delivered'
      ] 
    : [
        'Order Confirmed',
        'Restaurant Preparing',
        'Driver Assigned',
        'Delivered'
      ];

  const getStepIcon = (index) => {
    if (deliveryMode === 'peer') {
      switch(index) {
        case 0: return <CheckCircleIcon color="primary" />;
        case 1: return <PersonIcon color="primary" />;
        case 2: return <ShippingIcon color="primary" />;
        default: return <CheckCircleIcon color="success" />;
      }
    } else {
      switch(index) {
        case 0: return <CheckCircleIcon color="primary" />;
        case 1: return <RestaurantIcon color="primary" />;
        case 2: return <ShippingIcon color="primary" />;
        default: return <CheckCircleIcon color="success" />;
      }
    }
  };

  const getStatusMessage = () => {
    switch(activeStep) {
      case 0:
        return deliveryMode === 'peer'
          ? `${peerDetails?.name || 'Your peer'} is preparing your order`
          : 'The restaurant is preparing your order';
      case 1:
        return deliveryMode === 'peer'
          ? `${peerDetails?.name || 'Your peer'} is on the way to you`
          : 'Our driver is on the way to you';
      case 2:
        return 'Your order is almost there!';
      case 3:
        return 'Order delivered! Enjoy your meal!';
      default:
        return 'Your order is being processed';
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, my: 4, borderRadius: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <CheckCircleIcon color="success" sx={{ fontSize: 80 }} />
          <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
            Order #{orderId}
          </Typography>
          <Chip 
            label={deliveryMode === 'peer' ? 'Peer Delivery' : 'Restaurant Delivery'} 
            color="primary" 
            sx={{ mb: 2 }}
          />
        </Box>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel icon={getStepIcon(index)}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ 
          textAlign: 'center', 
          p: 3, 
          bgcolor: 'background.paper', 
          borderRadius: 2,
          mb: 4
        }}>
          <Typography variant="h6" gutterBottom>
            {getStatusMessage()}
          </Typography>
          
          {activeStep < 3 && (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
              <ScheduleIcon color="action" sx={{ mr: 1 }} />
              <Typography variant="body1">
                Estimated time remaining: <strong>{timeRemaining} mins</strong>
              </Typography>
            </Box>
          )}

          {deliveryMode === 'peer' && peerDetails && activeStep < 3 && (
            <Box sx={{ mt: 3 }}>
              <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 1 }} />
              <Typography variant="subtitle1">
                {peerDetails.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {peerDetails.distance} away • ⭐ {peerDetails.rating}
              </Typography>
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            component={Link}
            to="/menu"
            sx={{ mr: 2 }}
          >
            Order Again
          </Button>
          <Button
            variant="outlined"
            component={Link}
            to="/"
          >
            Back to Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderConfirmation;