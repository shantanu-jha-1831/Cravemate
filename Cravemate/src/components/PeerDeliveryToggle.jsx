import { Typography, FormControlLabel, Switch, Box } from '@mui/material';

const PeerDeliveryToggle = ({ deliveryMode, setDeliveryMode }) => {
  return (
    <Box sx={{ mb: 3, p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
      <FormControlLabel
        control={
          <Switch
            checked={deliveryMode === 'peer'}
            onChange={(e) => setDeliveryMode(e.target.checked ? 'peer' : 'restaurant')}
          />
        }
        label={
          <Typography>
            {deliveryMode === 'peer' 
              ? 'Peer Delivery (Faster!)' 
              : 'Restaurant Delivery'}
          </Typography>
        }
      />
      <Typography variant="body2" color="text.secondary">
        {deliveryMode === 'peer'
          ? 'A nearby peer may deliver your order in 15-20 mins.'
          : 'Standard delivery time: 30-45 mins.'}
      </Typography>
    </Box>
  );
};

export default PeerDeliveryToggle;