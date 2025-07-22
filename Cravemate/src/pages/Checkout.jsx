import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Grid,
  IconButton,
  Paper,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Payment as PaymentIcon,
  LocalShipping as ShippingIcon,
  Done as DoneIcon
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const steps = ['Cart', 'Delivery', 'Payment', 'Confirmation'];

const Checkout = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart
  } = useCart();

  const [activeStep, setActiveStep] = useState(0);
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: '',
    phone: '',
    address: '',
    instructions: '',
    method: 'delivery'
  });
  const [paymentInfo, setPaymentInfo] = useState({
    method: 'cash',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const deliveryFee = deliveryInfo.method === 'delivery' ? 5.99 : 0;
  const total = subtotal + tax + deliveryFee;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleDeliveryChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    // In a real app, you would send the order to your backend
    console.log('Order placed:', {
      items: cartItems,
      delivery: deliveryInfo,
      payment: paymentInfo,
      total
    });
    clearCart();
    handleNext(); // Move to confirmation step
  };

  const renderCartStep = () => (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" gutterBottom>
        Your Order
      </Typography>
      {cartItems.length === 0 ? (
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography variant="h6">Your cart is empty</Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => navigate('/menu')}
          >
            Browse Menu
          </Button>
        </Box>
      ) : (
        <>
          <List>
            {cartItems.map((item) => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={item.name}
                  secondary={`$${item.price.toFixed(2)} each`}
                />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                    type="number"
                    inputProps={{ min: 1 }}
                    sx={{ width: 60, mx: 1 }}
                  />
                  <IconButton
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <AddIcon />
                  </IconButton>
                  <Typography sx={{ mx: 2 }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                  <IconButton
                    onClick={() => removeFromCart(item.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <Typography>Subtotal: ${subtotal.toFixed(2)}</Typography>
            <Typography>Tax (10%): ${tax.toFixed(2)}</Typography>
            <Typography>Delivery: ${deliveryFee.toFixed(2)}</Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
              Total: ${total.toFixed(2)}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );

  const renderDeliveryStep = () => (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" gutterBottom>
        Delivery Information
      </Typography>
      <FormControl component="fieldset" sx={{ mb: 3 }}>
        <FormLabel component="legend">Delivery Method</FormLabel>
        <RadioGroup
          row
          name="method"
          value={deliveryInfo.method}
          onChange={handleDeliveryChange}
        >
          <FormControlLabel value="delivery" control={<Radio />} label="Delivery" />
          <FormControlLabel value="pickup" control={<Radio />} label="Pickup" />
        </RadioGroup>
      </FormControl>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Full Name"
            name="name"
            value={deliveryInfo.name}
            onChange={handleDeliveryChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone Number"
            name="phone"
            value={deliveryInfo.phone}
            onChange={handleDeliveryChange}
            fullWidth
            required
          />
        </Grid>
        {deliveryInfo.method === 'delivery' && (
          <Grid item xs={12}>
            <TextField
              label="Delivery Address"
              name="address"
              value={deliveryInfo.address}
              onChange={handleDeliveryChange}
              fullWidth
              required
              multiline
              rows={3}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            label="Special Instructions"
            name="instructions"
            value={deliveryInfo.instructions}
            onChange={handleDeliveryChange}
            fullWidth
            multiline
            rows={2}
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderPaymentStep = () => (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" gutterBottom>
        Payment Method
      </Typography>
      <FormControl component="fieldset" sx={{ mb: 3 }}>
        <RadioGroup
          name="method"
          value={paymentInfo.method}
          onChange={handlePaymentChange}
        >
          <FormControlLabel
            value="cash"
            control={<Radio />}
            label="Cash on Delivery"
          />
          <FormControlLabel
            value="card"
            control={<Radio />}
            label="Credit/Debit Card"
          />
        </RadioGroup>
      </FormControl>

      {paymentInfo.method === 'card' && (
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Card Number"
                name="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={handlePaymentChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Expiry Date"
                name="expiry"
                value={paymentInfo.expiry}
                onChange={handlePaymentChange}
                placeholder="MM/YY"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="CVV"
                name="cvv"
                value={paymentInfo.cvv}
                onChange={handlePaymentChange}
                type="password"
                fullWidth
                required
              />
            </Grid>
          </Grid>
        </Paper>
      )}

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Order Summary</Typography>
        <List dense>
          {cartItems.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={`${item.quantity} x ${item.name}`}
                secondary={`$${(item.price * item.quantity).toFixed(2)}`}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Typography>Subtotal:</Typography>
          <Typography>${subtotal.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Tax:</Typography>
          <Typography>${tax.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Delivery:</Typography>
          <Typography>${deliveryFee.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="h6">Total:</Typography>
          <Typography variant="h6">${total.toFixed(2)}</Typography>
        </Box>
      </Box>
    </Box>
  );

  const renderConfirmationStep = () => (
    <Box sx={{ 
      my: 4,
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <DoneIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
      </motion.div>
      <Typography variant="h4" gutterBottom>
        Order Confirmed!
      </Typography>
      <Typography variant="h6" gutterBottom>
        Thank you for your order
      </Typography>
      <Typography sx={{ mb: 4 }}>
        {deliveryInfo.method === 'delivery' 
          ? 'Your food is being prepared and will be delivered soon.' 
          : 'Your food is being prepared and will be ready for pickup soon.'}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Order #{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate('/menu')}
        sx={{ mt: 2 }}
      >
        Back to Menu
      </Button>
    </Box>
  );

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, my: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && renderCartStep()}
        {activeStep === 1 && renderDeliveryStep()}
        {activeStep === 2 && renderPaymentStep()}
        {activeStep === 3 && renderConfirmationStep()}

        {activeStep < 3 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              onClick={activeStep === 0 ? () => navigate('/menu') : handleBack}
              disabled={activeStep === 0 && cartItems.length === 0}
            >
              {activeStep === 0 ? 'Back to Menu' : 'Back'}
            </Button>
            {activeStep < 2 ? (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={cartItems.length === 0 || 
                  (activeStep === 1 && (!deliveryInfo.name || !deliveryInfo.phone || 
                    (deliveryInfo.method === 'delivery' && !deliveryInfo.address)))}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                endIcon={<PaymentIcon />}
                onClick={handlePlaceOrder}
                disabled={cartItems.length === 0}
              >
                Place Order
              </Button>
            )}
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Checkout;