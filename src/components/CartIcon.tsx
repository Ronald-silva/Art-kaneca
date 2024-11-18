// src/components/CartIcon.tsx
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const CartIcon = () => {
  const { itemsCount } = useCart();

  return (
    <Link to="/cart" className="relative">
      <ShoppingCart className="h-6 w-6 text-secondary" />
      {itemsCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-secondary w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
          {itemsCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;