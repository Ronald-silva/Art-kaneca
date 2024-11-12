
import React, { useState } from 'react';
import { Grid, Container, Typography, TextField, Box } from '@mui/material';
import ProductCard from '../../components/ProductCard';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Exemplo de produtos - posteriormente será substituído por uma API
  const products = [
    {
      id: '1',
      name: 'Caneca Personalizada',
      description: 'Caneca de cerâmica 325ml',
      price: 29.90,
      imageUrl: '/images/mug-template.png',
      category: 'mugs',
      customizationOptions: {
        allowImage: true,
        allowText: true,
        allowColors: true
      }
    },
    // Adicione mais produtos conforme necessário
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Nossos Produtos
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Buscar produtos"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;