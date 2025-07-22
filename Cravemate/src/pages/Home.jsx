import { Container, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import wallpaper from '/images/wallpaper.jpg';

const Home = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: 'calc(100vh - 64px - 56px)', // Subtracts header and footer heights
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
      }}
    >
      {/* Background image with overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${wallpaper})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1,
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)',
          },
        }}
      />
      
      {/* Content Container */}
      <Container
        maxWidth="md"
        sx={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          color: 'white',
          py: 0, // Removes vertical padding
          my: 0, // Removes margin
        }}
      >
        <Box sx={{ 
          p: 3, // Internal padding only
          backdropFilter: 'blur(2px)',
        }}>
          <Typography variant="h3" gutterBottom sx={{ 
            fontWeight: 'bold', 
            textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
            mt: 0, // Removes top margin
          }}>
            Welcome to CraveMate
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ 
            textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
            mb: 0, // Removes bottom margin
          }}>
            Food delivery tailored to your mood
          </Typography>
          <Box sx={{ 
            mt: 4,
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
          }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/recommendations"
            >
              Get Recommendations
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/menu"
              sx={{ 
                color: 'white', 
                borderColor: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                }
              }}
            >
              Browse Full Menu
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;