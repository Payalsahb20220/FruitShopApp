import { CartItem } from '../screens/CartScreen';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  Products: undefined;
  Cart: undefined;
  OnlinePayment: {
    name: string;
    contactNumber: string;
    totalPrice: number;
    cart: CartItem[];
    address:string;
  };
  Wishlist:undefined;

};
  
  