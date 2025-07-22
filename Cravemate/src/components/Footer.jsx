import { Box, Container, Grid, Typography, Link } from '@mui/material'
import { Facebook, Instagram, Twitter, LinkedIn } from '@mui/icons-material'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              CraveMate
            </Typography>
            <Typography variant="body2">
              Delivering happiness through food tailored to your mood.
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Link href="#" color="inherit">
                <Facebook />
              </Link>
              <Link href="#" color="inherit">
                <Instagram />
              </Link>
              <Link href="#" color="inherit">
                <Twitter />
              </Link>
              <Link href="#" color="inherit">
                <LinkedIn />
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" underline="hover" display="block">
              Home
            </Link>
            <Link href="/menu" color="inherit" underline="hover" display="block">
              Menu
            </Link>
            <Link href="/recommendations" color="inherit" underline="hover" display="block">
              Recommendations
            </Link>
            <Link href="/checkout" color="inherit" underline="hover" display="block">
              Cart
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              123 Food Street, Flavor Town
            </Typography>
            <Typography variant="body2">
              Phone: (123) 456-7890
            </Typography>
            <Typography variant="body2">
              Email: info@cravemate.com
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Opening Hours
            </Typography>
            <Typography variant="body2">
              Monday - Friday: 9am - 10pm
            </Typography>
            <Typography variant="body2">
              Saturday - Sunday: 10am - 11pm
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} CraveMate. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer