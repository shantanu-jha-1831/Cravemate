import { AppBar, Toolbar, Typography, Button, Box, IconButton, Stack, InputBase, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <AppBar 
      position="static"
      elevation={0}
      sx={{
        height: 90,
        background: 'linear-gradient(to right, #ffffff 30%, #3a7bd5)',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ 
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo/Brand - Left aligned */}
        <Typography 
          variant="h5"
          component={Link} 
          to="/"
          sx={{ 
            fontWeight: 'bold',
            textDecoration: 'none',
            color: 'primary.main',
            letterSpacing: 1,
            fontSize: { xs: '1.25rem', sm: '1.5rem' }
          }}
        >
          CRAVEMATE
        </Typography>
        
        {/* Search Box - Centered */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'background.paper',
            borderRadius: 20,
            px: 2,
            py: 0.5,
            width: '40%',
            maxWidth: 500,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}
        >
          <InputBase
            placeholder="Search menu items..."
            sx={{
              ml: 1,
              flex: 1,
              fontSize: '0.9rem'
            }}
            inputProps={{ 'aria-label': 'search menu items' }}
          />
        </Box>
        
        {/* Navigation Links - Right aligned */}
        <Stack 
          direction="row" 
          spacing={2}
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center'
          }}
        >
          <Button 
            component={Link}
            to="/menu"
            sx={{ 
              fontSize: '1rem',
              fontWeight: 500,
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.05)'
              }
            }}
          >
            Menu
          </Button>
          
          <Button 
            component={Link}
            to="/recommendations"
            sx={{ 
              fontSize: '1rem',
              fontWeight: 500,
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.05)'
              }
            }}
          >
            Recommendations
          </Button>

          {/* Signup Button - White text on blue background */}
          <Button 
            component={Link}
            to="/signup"
            variant="contained"
            sx={{ 
              fontSize: '1rem',
              fontWeight: 600,
              color: '#fff',
              backgroundColor: 'transparent',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
                boxShadow: 'none'
              }
            }}
          >
            Sign Up
          </Button>

          {/* Cart Icon */}
          <IconButton 
            component={Link} 
            to="/checkout"
            size="medium"
            sx={{ 
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.05)'
              }
            }}
          >
            <Badge 
              badgeContent={totalItems} 
              color="primary"
              overlap="circular"
              sx={{
                '& .MuiBadge-badge': {
                  right: -3,
                  top: 8,
                  border: '2px solid',
                  borderColor: 'background.paper'
                }
              }}
            >
              <ShoppingCartIcon fontSize="medium" />
            </Badge>
          </IconButton>
        </Stack>

        {/* Mobile Menu Button (optional) */}
        <IconButton
          sx={{ display: { md: 'none' }, ml: 2 }}
          color="inherit"
          aria-label="menu"
        >
          {/* Add your mobile menu icon here */}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;