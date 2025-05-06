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
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity , Platform, ScrollView , Linking} from 'react-native';
import { WebView } from 'react-native-webview';
// import * as Linking from 'expo-linking';

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
      <View style={styles.successContainer}>
        <Text style={styles.successTitle}>🎉 Payment Successful!</Text>
        <Text style={styles.successMessage}>Thank you for your payment. Your order is on its way!</Text>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Go to Orders</Text>
        </TouchableOpacity>
      </View>

    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>Online Payment</Text>

    <View style={styles.infoBox}>
      <Text style={styles.label}><Text style={styles.bold}>Name:</Text> {name}</Text>
      <Text style={styles.label}><Text style={styles.bold}>Contact:</Text> {contactNumber}</Text>
      <Text style={styles.label}><Text style={styles.bold}>Total:</Text> ₹{totalPrice.toFixed(2)}</Text>
    </View>

    <Text style={styles.sectionTitle}>Cart Items</Text>
    <View style={styles.cartBox}>
      {cart.map((item: any, index: number) => (
        <Text key={index} style={styles.cartItem}>
          🧺 {item.name} (Quantity: {item.cartQuantity}) - ₹{item.price.toFixed(2)}
        </Text>
      ))}
    </View>

    <Text style={styles.note}>Redirecting to PayPal for payment...</Text>

    <View style={styles.webViewContainer}>
    {Platform.OS === 'web' ? (
  <View style={styles.webViewContainer}>
    <Text style={styles.note}>
      WebView is not supported on web.{' '}
      <Text style={{ color: 'blue' }} onPress={() => window.open(paypalUrl, '_blank')}>
        Click here
      </Text>{' '}
      to open PayPal in a new tab.
    </Text>
  </View>
) : (
  <View style={styles.webViewContainer}>
    <WebView
      source={{ uri: paypalUrl }}
      onNavigationStateChange={handleNavigationStateChange}
      startInLoadingState
      renderLoading={() => <ActivityIndicator size="large" color="#FFA500" />}
    />
  </View>
)}
    </View>
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff8f0',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FF8C00',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#fff3e0',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FFD180',
  },
  label: {
    fontSize: 16,
    marginVertical: 4,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
    color: '#000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 6,
    color: '#FF8C00',
  },
  cartBox: {
    backgroundColor: '#fff3e0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FFD180',
  },
  cartItem: {
    fontSize: 15,
    marginBottom: 6,
    color: '#555',
  },
  note: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 10,
  },
  webViewContainer: {
    height: Platform.OS === 'web' ? 500 : 400,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff8f0',
    padding: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 10,
  },
  successMessage: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
