import { useState } from 'react';
import { Container, Box, Typography, Button, CircularProgress, Grid } from '@mui/material';
import MoodSelector from '../components/MoodSelector';
import QuestionForm from '../components/QuestionForm';
import FoodCard from '../components/FoodCard';

// Complete food database with mood associations and tags
const foodDatabase = [
  {
    id: 1,
    name: 'Chocolate Fondue',
    description: 'Assorted fruits with rich melted chocolate',
    price: 12.99,
    mood: 'happy',
    tags: ['sweet', 'dessert', 'shareable'],
    image: '/images/fondue.jpg'
  },
  {
    id: 2,
    name: 'Rainbow Smoothie Bowl',
    description: 'Mixed berries, banana, and granola with coconut',
    price: 9.99,
    mood: 'happy',
    tags: ['healthy', 'light', 'breakfast'],
    image: '/images/smoothie-bowl.jpg'
  },
  {
    id: 3,
    name: 'Mac & Cheese',
    description: 'Creamy macaroni with three cheese blend',
    price: 10.99,
    mood: 'sad',
    tags: ['comfort', 'carbs', 'vegetarian'],
    image: '/images/mac-cheese.jpg'
  },
  {
    id: 4,
    name: 'Spicy Chicken Wings',
    description: 'Crispy wings with hot buffalo sauce',
    price: 11.99,
    mood: 'angry',
    tags: ['spicy', 'protein', 'appetizer'],
    image: '/images/spicy-wings.jpg'
  },
  {
    id: 5,
    name: 'Sushi Platter',
    description: 'Assorted fresh sushi with wasabi and ginger',
    price: 15.99,
    mood: 'excited',
    tags: ['fresh', 'special', 'seafood'],
    image: '/images/sushi-platter.jpg'
  },
  {
    id: 6,
    name: 'Herbal Tea Set',
    description: 'Selection of calming herbal teas',
    price: 6.99,
    mood: 'calm',
    tags: ['light', 'drink', 'vegan'],
    image: '/images/herbal-tea.jpg'
  }
];

const moodMap = {
  1: 'happy',
  2: 'calm',
  3: 'sad',
  4: 'angry',
  5: 'excited'
};

const Recommendations = () => {
  const [step, setStep] = useState(1);
  const [selectedMood, setSelectedMood] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleMoodSelect = (moodId) => {
    setSelectedMood(moodId);
    setStep(2);
  };

  const generateRecommendations = (answers) => {
    setIsLoading(true);
    setRecommendations([]); // Clear previous recommendations
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        const moodKey = moodMap[selectedMood];
        
        // 1. First filter by mood
        let results = foodDatabase.filter(food => food.mood === moodKey);
        
        // 2. Apply additional filters based on answers
        if (answers[1] === 'Starving!') {
          results = results.filter(food => food.tags.includes('filling') || food.price > 10);
        } else if (answers[1] === 'Not very') {
          results = results.filter(food => food.tags.includes('light'));
        }
        
        if (answers[2] === 'Sweet') {
          results = results.filter(food => food.tags.includes('sweet'));
        } else if (answers[2] === 'Savory') {
          results = results.filter(food => food.tags.includes('savory') || food.tags.includes('protein'));
        }
        
        if (answers[3] === 'Vegetarian') {
          results = results.filter(food => food.tags.includes('vegetarian') || !food.tags.includes('meat'));
        } else if (answers[3] === 'Vegan') {
          results = results.filter(food => food.tags.includes('vegan'));
        }

        // 3. If no results, fall back to mood-only matches
        if (results.length === 0) {
          results = foodDatabase.filter(food => food.mood === moodKey);
        }

        // 4. Shuffle and select 3 items
        const shuffled = [...results].sort(() => 0.5 - Math.random());
        const finalRecommendations = shuffled.slice(0, 3);

        setRecommendations(finalRecommendations);
      } catch (error) {
        console.error("Error generating recommendations:", error);
        // Fallback to showing all items for the mood if error occurs
        const moodKey = moodMap[selectedMood];
        const fallbackResults = foodDatabase.filter(food => food.mood === moodKey);
        setRecommendations(fallbackResults.slice(0, 3));
      } finally {
        setIsLoading(false);
        setStep(3);
      }
    }, 800);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4, minHeight: '70vh' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
        Personalized Food Recommendations
      </Typography>

      {step === 1 && (
        <MoodSelector onMoodSelect={handleMoodSelect} />
      )}

      {step === 2 && (
        <QuestionForm onSubmit={generateRecommendations} />
      )}

      {step === 3 && (
        <Box sx={{ mt: 4 }}>
          {isLoading ? (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '300px'
            }}>
              <CircularProgress size={60} />
              <Typography variant="h6" sx={{ mt: 3 }}>
                Finding your perfect food matches...
              </Typography>
            </Box>
          ) : (
            <>
              <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                {recommendations.length > 0 ? 'Recommended For You' : 'No Specific Recommendations'}
              </Typography>
              
              {recommendations.length > 0 ? (
                <Grid container spacing={3}>
                  {recommendations.map((food) => (
                    <Grid item key={food.id} xs={12} sm={6} md={4}>
                      <FoodCard food={food} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box sx={{ 
                  textAlign: 'center', 
                  p: 4, 
                  border: '1px dashed', 
                  borderColor: 'divider',
                  borderRadius: 2
                }}>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Couldn't find specific matches for your criteria.
                  </Typography>
                  <Typography variant="body1">
                    Here are some general suggestions:
                  </Typography>
                  <Grid container spacing={3} sx={{ mt: 2 }}>
                    {foodDatabase.slice(0, 3).map((food) => (
                      <Grid item key={food.id} xs={12} sm={6} md={4}>
                        <FoodCard food={food} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button
                  variant="contained"
                  onClick={() => setStep(1)}
                  sx={{ mr: 2, px: 4 }}
                  size="large"
                >
                  Start Over
                </Button>
                <Button
                  variant="outlined"
                  href="/menu"
                  sx={{ px: 4 }}
                  size="large"
                >
                  Browse Full Menu
                </Button>
              </Box>
            </>
          )}
        </Box>
      )}
    </Container>
  );
};

export default Recommendations;