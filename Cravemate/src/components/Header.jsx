import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  Stack, 
  InputBase, 
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider
} from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cartItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', width: 250 }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold', color: 'primary.main' }}>
        CRAVEMATE
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/menu" sx={{ textAlign: 'center' }}>
            <ListItemText primary="Menu" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/recommendations" sx={{ textAlign: 'center' }}>
            <ListItemText primary="Recommendations" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/signup" sx={{ textAlign: 'center' }}>
            <ListItemText primary="Sign Up" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/checkout" sx={{ textAlign: 'center' }}>
            <ListItemText primary={`Cart (${totalItems})`} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar 
        position="static"
        elevation={0}
        sx={{
          height: { xs: 70, md: 90 },
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
          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2, 
              display: { md: 'none' },
              color: 'primary.main'
            }}
          >
            <MenuIcon />
          </IconButton>

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
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              flexGrow: { xs: 1, md: 0 }
            }}
          >
            CRAVEMATE
          </Typography>
          
          {/* Search Box - Centered (hidden on mobile) */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              backgroundColor: 'background.paper',
              borderRadius: 20,
              px: 2,
              py: 0.5,
              width: '40%',
              maxWidth: 500,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              mx: 2
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
          
          {/* Navigation Links - Right aligned (hidden on mobile) */}
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

          {/* Mobile Cart Icon (visible only on mobile) */}
          <IconButton 
            component={Link} 
            to="/checkout"
            size="medium"
            sx={{ 
              color: 'text.primary',
              display: { xs: 'flex', md: 'none' },
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
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Header;