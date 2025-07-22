import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Tabs,
  Tab,
  Chip,
  CircularProgress,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FoodCard from '../components/FoodCard';
import FilterListIcon from '@mui/icons-material/FilterList';

const menuItems = [
  {
    id: 1,
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce and mozzarella cheese',
    price: 12.99,
    image: '/images/pizza.jpg',
    category: 'Italian',
    tags: ['vegetarian', 'popular']
  },
  {
    id: 2,
    name: 'Pepperoni Pizza',
    description: 'Classic pizza with spicy pepperoni and extra cheese',
    price: 14.99,
    image: '/images/pepperoni-pizza.jpg',
    category: 'Italian',
    tags: ['popular']
  },
  {
    id: 3,
    name: 'Veggie Burger',
    description: 'Plant-based patty with lettuce, tomato, and special sauce',
    price: 8.99,
    image: '/images/veggie-burger.jpg',
    category: 'American',
    tags: ['vegetarian', 'vegan']
  },
  {
    id: 4,
    name: 'Cheeseburger',
    description: 'Beef patty with cheese, lettuce, and fries',
    price: 9.99,
    image: '/images/cheeseburger.jpg',
    category: 'American',
    tags: ['popular']
  },
  {
    id: 5,
    name: 'Chicken Tikka Masala',
    description: 'Grilled chicken chunks in spiced curry sauce',
    price: 14.99,
    image: '/images/tikka-masala.jpg',
    category: 'Indian',
    tags: ['spicy']
  },
  {
    id: 6,
    name: 'Vegetable Biryani',
    description: 'Fragrant rice dish with mixed vegetables and spices',
    price: 12.99,
    image: '/images/biryani.jpg',
    category: 'Indian',
    tags: ['vegetarian']
  },
  {
    id: 7,
    name: 'Sushi Platter',
    description: 'Assorted sushi with salmon, tuna, and California rolls',
    price: 16.99,
    image: '/images/sushi.jpg',
    category: 'Japanese',
    tags: ['popular']
  },
  {
    id: 8,
    name: 'Ramen',
    description: 'Japanese noodle soup with pork broth and toppings',
    price: 11.99,
    image: '/images/ramen.jpg',
    category: 'Japanese'
  },
  {
    id: 9,
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with caesar dressing',
    price: 7.99,
    image: '/images/salad.jpg',
    category: 'Healthy',
    tags: ['vegetarian']
  },
  {
    id: 10,
    name: 'Greek Salad',
    description: 'Cucumbers, tomatoes, olives, and feta cheese',
    price: 8.99,
    image: '/images/greek-salad.jpg',
    category: 'Healthy',
    tags: ['vegetarian']
  },
  {
    id: 11,
    name: 'Chocolate Brownie',
    description: 'Warm chocolate brownie with ice cream',
    price: 5.99,
    image: '/images/brownie.jpg',
    category: 'Dessert',
    tags: ['vegetarian', 'popular']
  },
  {
    id: 12,
    name: 'Tiramisu',
    description: 'Italian coffee-flavored dessert',
    price: 6.99,
    image: '/images/tiramisu.jpg',
    category: 'Dessert',
    tags: ['vegetarian']
  }
];

const categories = ['All', ...new Set(menuItems.map(item => item.category))];
const tags = [...new Set(menuItems.flatMap(item => item.tags || []))];

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesTags = selectedTags.length === 0 || 
                       (item.tags && selectedTags.every(tag => item.tags.includes(tag)));
    
    return matchesSearch && matchesCategory && matchesTags;
  });

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4
      }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Our Menu
        </Typography>
        <Button 
          startIcon={<FilterListIcon />}
          onClick={() => setShowFilters(!showFilters)}
          sx={{ display: { xs: 'flex', md: 'none' } }}
        >
          Filters
        </Button>
      </Box>

      {/* Search and Filter Section */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search menu items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />
          }}
          sx={{ mb: 3 }}
        />

        {(showFilters || window.innerWidth >= 900) && (
          <>
            <Tabs
              value={selectedCategory}
              onChange={(e, newValue) => setSelectedCategory(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{ mb: 2 }}
            >
              {categories.map((category) => (
                <Tab 
                  key={category} 
                  label={category} 
                  value={category}
                  sx={{ textTransform: 'none' }}
                />
              ))}
            </Tabs>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onClick={() => handleTagToggle(tag)}
                  color={selectedTags.includes(tag) ? 'primary' : 'default'}
                  variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
                />
              ))}
            </Box>
          </>
        )}

        {searchTerm && (
          <Chip
            label={`Search: "${searchTerm}"`}
            onDelete={() => setSearchTerm('')}
            sx={{ mr: 1, mb: 2 }}
          />
        )}
        {selectedCategory !== 'All' && (
          <Chip
            label={`Category: ${selectedCategory}`}
            onDelete={() => setSelectedCategory('All')}
            color="primary"
            sx={{ mr: 1, mb: 2 }}
          />
        )}
        {selectedTags.length > 0 && (
          <Chip
            label={`Tags: ${selectedTags.join(', ')}`}
            onDelete={() => setSelectedTags([])}
            color="secondary"
            sx={{ mb: 2 }}
          />
        )}
      </Box>

      {/* Menu Items */}
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}>
          <CircularProgress size={60} />
        </Box>
      ) : filteredItems.length > 0 ? (
        <Grid container spacing={3}>
          {filteredItems.map((food) => (
            <Grid 
              item 
              key={food.id} 
              xs={12} 
              sm={6} 
              md={4} 
              lg={3}
              sx={{ display: 'flex' }}
            >
              <FoodCard food={food} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', my: 10 }}>
          <Typography variant="h5" gutterBottom>
            No items found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Try adjusting your search or filter criteria
          </Typography>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedTags([]);
            }}
          >
            Clear Filters
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Menu;