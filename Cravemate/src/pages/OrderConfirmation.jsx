import { Container, Box, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const OrderConfirmation = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ 
        my: 4, 
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Order Confirmed!
        </Typography>
        <Typography variant="h6" gutterBottom>
          Thank you for your order
        </Typography>
        <Typography sx={{ mb: 4 }}>
          Your food is being prepared and will be delivered soon.
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/menu"
          sx={{ mt: 2 }}
        >
          Back to Menu
        </Button>
      </Box>
    </Container>
  )
}

export default OrderConfirmation