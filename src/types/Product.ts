
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'mugs' | 'shirts' | 'custom';
  customizationOptions: {
    allowImage: boolean;
    allowText: boolean;
    allowColors: boolean;
  };
}