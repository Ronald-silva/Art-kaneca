
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Container, Paper, Button } from '@mui/material';
import { useCart } from '../../context/CartContext';
import CustomizationForm from './CustomizationForm';
import CustomizationPreview from './CustomizationPreview';

const Customize = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [customization, setCustomization] = useState({
    text: '',
    textColor: '#000000',
    image: null,
    position: 'center'
  });

  const handleCustomizationChange = (updates) => {
    setCustomization(prev => ({ ...prev, ...updates }));
  };

  const handleAddToCart = () => {
    const product = {
      id: productId,
      // Temporary product data - should come from API
      name: 'Caneca Personalizada',
      price: 29.90,
      // ...other product details
    };

    addToCart(product, customization);
    navigate('/cart');
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <CustomizationPreview
              productId={productId}
              customization={customization}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <CustomizationForm
              customization={customization}
              onChange={handleCustomizationChange}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleAddToCart}
              sx={{ mt: 2 }}
            >
              Adicionar ao Carrinho
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Customize;