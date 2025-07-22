import { Container, Box, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Welcome to CraveMate
        </Typography>
        <Typography variant="h5" gutterBottom>
          Food delivery tailored to your mood
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/recommendations"
            sx={{ mr: 2 }}
          >
            Get Recommendations
          </Button>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            to="/menu"
          >
            Browse Full Menu
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Home