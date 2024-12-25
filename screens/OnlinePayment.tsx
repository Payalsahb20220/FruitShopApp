// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function OnlinePayment({ route }: any) {
//   const { name, contactNumber, totalPrice, cart } = route.params;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Online Payment</Text>
//       <Text style={styles.text}>Name: {name}</Text>
//       <Text style={styles.text}>Contact: {contactNumber}</Text>
//       <Text style={styles.text}>Total Price: ₹{totalPrice.toFixed(2)}</Text>
//       <Text style={styles.text}>Cart Items:</Text>
//       {cart.map((item: any, index: number) => (
//         <Text key={index} style={styles.cartItem}>
//           - {item.name} (x{item.cartQuantity}): ₹{item.price.toFixed(2)}
//         </Text>
//       ))}
//       {/* Add actual payment gateway integration here */}
//       <Text style={styles.note}>Payment functionality is under development.</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f7f7f7',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   text: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   cartItem: {
//     fontSize: 14,
//     marginLeft: 10,
//   },
//   note: {
//     marginTop: 20,
//     fontSize: 14,
//     color: 'gray',
//     textAlign: 'center',
//   },
// });



import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Linking from 'expo-linking';

export default function OnlinePayment({ route }: any) {
  const { name, contactNumber, totalPrice, cart } = route.params;
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  // PayPal configurations
  const PAYPAL_CLIENT_ID = 'ATQXO8R9iQ_dyBJYRh4UI8bO7XDknVIRNgQw-k2Bxu74pV619B7jAydBPn4wAtTd2N7r4D90H5pg_9tJ'; // Replace with your PayPal client ID
  const PAYPAL_ENV = 'sandbox'; // Use 'live' for production

  // PayPal redirect URL
  const REDIRECT_URL = 'https://fruitsshop-bf9a7.web.app/success.html'; // Replace with your custom success page URL
  // const REDIRECT_URL = Linking.createURL('https://fruitsshop-bf9a7.web.app/success');
  
  // Generate the PayPal URL for payment
  const paypalUrl = `https://www.sandbox.paypal.com/checkoutnow?client_id=${PAYPAL_CLIENT_ID}&currency=USD&amount=${totalPrice}`;

  const handleNavigationStateChange = (event: any) => {
    if (event.url.includes(REDIRECT_URL)) {
      setPaymentStatus('success');
    }
  };

  if (paymentStatus === 'success') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Payment Successful</Text>
        <Text style={styles.text}>Thank you for your payment! Your order is being processed.</Text>
        <TouchableOpacity style={styles.button} onPress={() => {/* Navigate to another screen */}}>
          <Text style={styles.buttonText}>Go to Orders</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Online Payment</Text> */}
      <Text style={styles.subTitle}>Your Order Summary</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.text}><Text style={styles.bold}>Name:</Text> {name}</Text>
        <Text style={styles.text}><Text style={styles.bold}>Contact:</Text> {contactNumber}</Text>
        <Text style={styles.text}><Text style={styles.bold}>Total Price:</Text> ₹{totalPrice.toFixed(2)}</Text>
      </View>

      <Text style={styles.subTitle}>Cart Items:</Text>
      <View style={styles.cartList}>
        {cart.map((item: any, index: number) => (
          <Text key={index} style={styles.cartItem}>{item.name} (x{item.cartQuantity}): ₹{item.price.toFixed(2)}
          </Text>
        ))}
      </View>

      <Text style={styles.note}>Redirecting to PayPal for payment...</Text>

      <View style={styles.webViewContainer}>
        <WebView
          source={{ uri: paypalUrl }}
          onNavigationStateChange={handleNavigationStateChange}
          startInLoadingState={true}
          renderLoading={() => <ActivityIndicator size="large" color="#4CAF50" />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 20,
    color: '#555',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
    color: '#000',
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cartList: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cartItem: {
    fontSize: 14,
    marginLeft: 10,
    color: '#555',
  },
  note: {
    marginTop: 20,
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  webViewContainer: {
    flex: 1,
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
