// src/pages/Signup.jsx
import { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Link, 
  Divider,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup form submitted:', formData);
    // Add your signup logic here (API call, etc.)
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box sx={{ 
        textAlign: 'center',
        mb: 4
      }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Create Your Account
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Join CraveMate to get personalized food recommendations
        </Typography>
      </Box>

      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{
          mt: 4,
          p: 4,
          borderRadius: 2,
          boxShadow: 1,
          backgroundColor: 'background.paper'
        }}
      >
        <TextField
          fullWidth
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          sx={{
            mt: 3,
            py: 1.5,
            fontWeight: 'bold'
          }}
        >
          Sign Up
        </Button>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" align="center">
          Already have an account?{' '}
          <Link component={RouterLink} to="/login" underline="hover">
            Log in
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Signup;