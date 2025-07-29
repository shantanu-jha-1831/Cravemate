import { Box, Typography, Stepper, Step, StepLabel, Paper } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PersonIcon from '@mui/icons-material/Person';

const OrderTracker = ({ deliveryMode, orderId }) => {
  const peerSteps = [
    'Order Placed',
    'Peer Assigned',
    'Peer Preparing',
    'On the Way',
    'Delivered'
  ];

  const restaurantSteps = [
    'Order Placed',
    'Restaurant Preparing',
    'Driver Assigned',
    'On the Way',
    'Delivered'
  ];

  const steps = deliveryMode === 'peer' ? peerSteps : restaurantSteps;
  const activeStep = 1; // Mock: change to 2, 3, etc. for demo

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Order #{orderId}
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              icon={
                index === 1 ? (
                  deliveryMode === 'peer' ? (
                    <PersonIcon color="primary" />
                  ) : (
                    <RestaurantIcon color="primary" />
                  )
                ) : index === 2 ? (
                  <LocalShippingIcon color="primary" />
                ) : null
              }
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
        {deliveryMode === 'peer'
          ? 'John D. is preparing your order (0.3 miles away)'
          : 'Flavor Town Restaurant is preparing your order'}
      </Typography>
    </Paper>
  );
};

export default OrderTracker;