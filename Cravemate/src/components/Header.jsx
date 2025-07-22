import { AppBar, Toolbar, Typography, Button, Badge, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useCart } from '../context/CartContext'

const Header = () => {
  const { cartItems } = useCart()

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CraveMate
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/menu">
          Menu
        </Button>
        <Button color="inherit" component={Link} to="/recommendations">
          Get Recommendations
        </Button>
        <IconButton color="inherit" component={Link} to="/checkout">
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Header