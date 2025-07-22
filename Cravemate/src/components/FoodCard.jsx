import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();

  return (
    <motion.div whileHover={{ scale: 1.03 }} style={{ height: '100%' }}>
      <Card sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: 3
      }}>
        <CardMedia
          component="img"
          sx={{
            height: 200,
            objectFit: 'cover',
            width: '100%'
          }}
          image={food.image}
          alt={food.name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {food.name}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              height: '40px',
              mb: 1
            }}
          >
            {food.description}
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold',
              color: 'primary.main'
            }}
          >
            ${food.price.toFixed(2)}
          </Typography>
        </CardContent>
        <Button 
          variant="contained"
          onClick={() => addToCart(food)}
          sx={{ 
            m: 2,
            fontWeight: 'bold'
          }}
        >
          Add to Cart
        </Button>
      </Card>
    </motion.div>
  );
};

export default FoodCard;