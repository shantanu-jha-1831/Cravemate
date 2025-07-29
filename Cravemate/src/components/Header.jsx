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
  ListItemIcon,
  ListItemText,
  Divider,
  alpha
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  ShoppingCart,
  Menu,
  Search,
  RestaurantMenu,
  Recommend,
  PersonAdd,
  DeliveryDining
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cartItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const navItems = [
    { text: 'Menu', path: '/menu', icon: <RestaurantMenu /> },
    { text: 'Recommendations', path: '/recommendations', icon: <Recommend /> },
    { text: 'Sign Up', path: '/signup', icon: <PersonAdd /> },
    { text: 'Delivery Partner', path: '/delPart', icon: <DeliveryDining /> },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography 
        variant="h6" 
        sx={{ 
          my: 2, 
          fontWeight: 'bold', 
          color: 'primary.main',
          fontSize: '1.5rem'
        }}
      >
        CRAVEMATE
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              component={Link} 
              to={item.path}
              sx={{ 
                px: 4,
                '&:hover': {
                  backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1)
                }
              }}
            >
              <ListItemIcon sx={{ color: 'primary.main' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton 
            component={Link} 
            to="/checkout"
            sx={{ 
              px: 4,
              '&:hover': {
                backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1)
              }
            }}
          >
            <ListItemIcon sx={{ color: 'primary.main' }}>
              <Badge 
                badgeContent={totalItems} 
                color="primary"
                sx={{
                  '& .MuiBadge-badge': {
                    right: -5,
                    top: 0
                  }
                }}
              >
                <ShoppingCart />
              </Badge>
            </ListItemIcon>
            <ListItemText 
              primary="Cart" 
              primaryTypographyProps={{ fontWeight: 500 }}
            />
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
          height: { xs: 70, md: 80 },
          background: 'linear-gradient(to right, #ffffff 30%, #3a7bd5)',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ 
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2, sm: 3 }
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
            <Menu />
          </IconButton>

          {/* Logo/Brand */}
          <Typography 
            variant="h5"
            component={Link} 
            to="/"
            sx={{ 
              fontWeight: 'bold',
              textDecoration: 'none',
              color: 'primary.main',
              letterSpacing: 1,
              fontSize: { xs: '1.3rem', sm: '1.5rem' },
              flexGrow: { xs: 1, md: 0 },
              '&:hover': {
                opacity: 0.9
              }
            }}
          >
            CRAVEMATE
          </Typography>
          
          {/* Search Box */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              backgroundColor: 'background.paper',
              borderRadius: 20,
              px: 2,
              py: 0.8,
              width: '40%',
              maxWidth: 500,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              mx: 2
            }}
          >
            <Search color="disabled" sx={{ mr: 1 }} />
            <InputBase
              placeholder="Search menu items..."
              sx={{
                flex: 1,
                fontSize: '0.95rem'
              }}
              inputProps={{ 'aria-label': 'search menu items' }}
            />
          </Box>
          
          {/* Desktop Navigation */}
          <Stack 
            direction="row" 
            spacing={1}
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center'
            }}
          >
            {navItems.map((item) => (
              <Button 
                key={item.text}
                component={Link}
                to={item.path}
                startIcon={item.icon}
                sx={{ 
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  color: 'text.primary',
                  textTransform: 'none',
                  px: 2,
                  '&:hover': {
                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1)
                  }
                }}
              >
                {item.text}
              </Button>
            ))}

            {/* Cart Icon */}
            <IconButton 
              component={Link} 
              to="/checkout"
              size="medium"
              sx={{ 
                color: 'text.primary',
                ml: 1,
                '&:hover': {
                  backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1)
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
                <ShoppingCart fontSize="medium" />
              </Badge>
            </IconButton>
          </Stack>

          {/* Mobile Cart Icon */}
          <IconButton 
            component={Link} 
            to="/checkout"
            size="medium"
            sx={{ 
              color: 'text.primary',
              display: { xs: 'flex', md: 'none' },
              ml: 'auto',
              '&:hover': {
                backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1)
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
              <ShoppingCart fontSize="medium" />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
            borderTopRightRadius: 12,
            borderBottomRightRadius: 12
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Header;