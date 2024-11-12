
import React from 'react';
import { Box, AppBar, Toolbar, Typography, Container, Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Layout = ({ children }) => {
  const { items } = useCart();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
          >
            Art Kaneca
          </Typography>
          <Box component={Link} to="/products" sx={{ color: 'inherit', mx: 2 }}>
            Produtos
          </Box>
          <Badge badgeContent={items.length} color="secondary">
            <Box component={Link} to="/cart" sx={{ color: 'inherit' }}>
              <ShoppingCart />
            </Box>
          </Badge>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ flex: 1, py: 4 }}>
        {children}
      </Container>

      <Box component="footer" sx={{ py: 3, backgroundColor: 'primary.main', color: 'white' }}>
        <Container>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Art Kaneca. Todos os direitos reservados.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;