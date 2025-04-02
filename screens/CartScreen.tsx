// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import { useCart } from '../contexts/CartContext'; // Cart context
// import { useNavigation } from '@react-navigation/native';
// import { auth } from '../firebaseConfig';
// import { onAuthStateChanged } from 'firebase/auth';
// import { User } from 'firebase/auth';
// import { RootStackParamList } from '../navigation/types';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';


// interface CartItem {
//   id: number;
//   name: string;
//   price: number;
//   cartQuantity: number;
// }

// type CartScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cart'>;


// export default function CartScreen() {
//   const { cart, removeFromCart, totalPrice } = useCart(); // Cart context
//   const [user, setUser] = useState(null); // Firebase auth state
//   const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
//   const [currentUser, setCurrentUser] = useState<User | null>(null); // Allow User | null
//   const navigation = useNavigation();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user); // Sets the user if logged in
//     });
//     return () => unsubscribe(); // Cleanup subscription
//   }, []);

//   const handleRemove = (id: number) => {
//     Alert.alert('Remove Item', 'Are you sure you want to remove this item from your cart?', [
//       { text: 'Cancel', style: 'cancel' },
//       { text: 'Remove', onPress: () => removeFromCart(id) },
//     ]);
//   };

//   const handleCheckout = () => {
//     if (!currentUser) {
//       // If user not logged in, navigate to login
//       Alert.alert(
//         'Authentication Required',
//         'You need to log in to proceed to checkout.',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Login', onPress: () => navigation.navigate('Login') },
//         ]
//       );
//     } else if (selectedPayment === 'Online Payment') {
//       // Navigate to online payment
//       navigation.navigate('OnlinePayment'); // Replace with your Online Payment screen
//     } else if (selectedPayment === 'Cash on Delivery') {
//       // Confirm cash on delivery order
//       Alert.alert('Order Confirmed', 'Your order will be paid on delivery.');
//     } else {
//       // No payment method selected
//       Alert.alert('Select Payment Method', 'Please choose a payment method to proceed.');
//     }
//   };

//   const renderCartItem = ({ item }: { item: CartItem }) => (
//     <View style={styles.cartItem}>
//       <Text style={styles.itemText}>{item.name}</Text>
//       <Text style={styles.itemText}>Quantity: {item.cartQuantity}</Text>
//       <Text style={styles.itemText}>Price: ₹{item.price.toFixed(2)}</Text>
//       <TouchableOpacity onPress={() => handleRemove(item.id)} style={styles.removeButton}>
//         <Text style={styles.removeButtonText}>Remove</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Your Cart</Text>
//       {cart.length === 0 ? (
//         <Text style={styles.emptyCartText}>Your cart is empty.</Text>
//       ) : (
//         <>
//           <FlatList
//             data={cart}
//             renderItem={renderCartItem}
//             keyExtractor={(item) => item.id.toString()}
//           />
//           <View style={styles.paymentContainer}>
//             <Text style={styles.paymentTitle}>Select Payment Method:</Text>
//             <TouchableOpacity
//               style={[
//                 styles.paymentOption,
//                 selectedPayment === 'Cash on Delivery' && styles.selectedOption,
//               ]}
//               onPress={() => setSelectedPayment('Cash on Delivery')}
//             >
//               <Text style={styles.paymentText}>Cash on Delivery</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[
//                 styles.paymentOption,
//                 selectedPayment === 'Online Payment' && styles.selectedOption,
//               ]}
//               onPress={() => setSelectedPayment('Online Payment')}
//             >
//               <Text style={styles.paymentText}>Online Payment</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.summaryContainer}>
//             <Text style={styles.summaryText}>Total Price: ₹{totalPrice.toFixed(2)}</Text>
//             <TouchableOpacity onPress={handleCheckout} style={styles.checkoutButton}>
//               <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
//             </TouchableOpacity>
//           </View>
//         </>
//       )}
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
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   cartItem: {
//     marginBottom: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//     paddingBottom: 10,
//   },
//   itemText: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   removeButton: {
//     marginTop: 10,
//     backgroundColor: '#FF6347',
//     padding: 10,
//     borderRadius: 5,
//   },
//   removeButtonText: {
//     color: '#fff',
//     textAlign: 'center',
//   },
//   emptyCartText: {
//     fontSize: 18,
//     color: 'gray',
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   paymentContainer: {
//     marginTop: 20,
//     padding: 10,
//   },
//   paymentTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   paymentOption: {
//     padding: 15,
//     marginVertical: 5,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   selectedOption: {
//     borderColor: '#4CAF50',
//     backgroundColor: '#e8f5e9',
//   },
//   paymentText: {
//     fontSize: 16,
//   },
//   summaryContainer: {
//     marginTop: 20,
//     padding: 15,
//     borderTopWidth: 1,
//     borderTopColor: '#ddd',
//     backgroundColor: '#fff',
//     borderRadius: 5,
//   },
//   summaryText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   checkoutButton: {
//     marginTop: 10,
//     backgroundColor: '#4CAF50',
//     padding: 15,
//     borderRadius: 5,
//   },
//   checkoutButtonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontSize: 18,
//   },
// });



import React, { useContext ,useEffect, useState  } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  // Modal,
  ScrollView,
  Animated,
  ActivityIndicator
} from 'react-native';
import { useCart } from '../contexts/CartContext'; // Cart context
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { User } from 'firebase/auth';
import { RootStackParamList } from '../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import { Platform } from 'react-native';
import * as Location from 'expo-location';
import haversine from 'haversine-distance';


// Owner's Fixed Address (Fruit Shop Location)
const SHOP_LOCATION = {
  latitude: 25.5437, // Katihar , Bihar
  longitude: 87.5716,
};

export interface CartItem {
  id: number;
  name: string;
  price: number;
  cartQuantity: number;
}

type CartScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cart'>;

export default function CartScreen() {
  const { cart, removeFromCart, totalPrice } = useCart(); // Cart context
  const [currentUser, setCurrentUser] = useState<User | null>(null); // Firebase auth state
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  // const [isModalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [isExpanded, setIsExpanded] = useState(true); // State to track if the list is expanded
  const [animatedHeight] = useState(new Animated.Value(0)); // Animated value for height transition
  const navigation = useNavigation<CartScreenNavigationProp>();

  const [userDetails, setUserDetails] = useState<any>(null); 
  const [distance, setDistance] = useState<any>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  // Fetch user details (including address if available)
  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const db = getFirestore();
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserDetails(userDoc.data());
            setAddress(userDoc.data().address || ''); // Set saved address
            setName(userDoc.data().name || '');
            setContactNumber(userDoc.data().mobile || '');
          }
        } catch (error) {
          console.error('Error fetching user details: ', error);
        }
      }
    };
    fetchUserDetails();
  }, []);


  const showAlert = (title: string, message: string, onRemove: () => void) => {
    if (Platform.OS === 'web') {
      const confirmation = window.confirm(`${title}: ${message}`);
      if (confirmation) {
        onRemove();
      }
    } else {
      Alert.alert(
        title,
        message,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Ok', onPress: onRemove },
        ]
      );
    }
  };


  const calculateDistance = (lat:number, lng:number) => {
    const userLocation = { latitude: lat, longitude: lng };
    const distanceInMeters = haversine(SHOP_LOCATION, userLocation);
    console.log(userLocation)
    const distanceInKm = distanceInMeters / 1000;
    setDistance(distanceInKm.toFixed(2));

    if (distanceInKm > 5) {
      Alert.alert('Out of Delivery Range', 'Sorry, delivery is only available within 5km.');
    }
  };

  const openGoogleMaps = () => {
    Linking.openURL('https://www.google.com/maps/search/?api=1&query=current+location');
  };


// Get User's Current Location
const getCurrentLocation = async () => {
  setLoadingLocation(true);

  if (Platform.OS === "web") {
    // Web: Use browser's built-in Geolocation API
    if (!navigator.geolocation) {
      showAlert("Error", "Geolocation is not supported in this browser.", () => {});
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Reverse geocode to get address
        try {
          let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
          if (geocode.length > 0) {
            let formattedAddress = `${geocode[0].name} , ${geocode[0].street}, ${geocode[0].city}, ${geocode[0].region}, ${geocode[0].country}`;
            setAddress(formattedAddress);
            calculateDistance(latitude, longitude);
          }
        } catch (error) {
          console.error("Error getting address:", error);
        }
        setLoadingLocation(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        showAlert("Error", "Unable to fetch your location. Try again.", () => {});
        setLoadingLocation(false);
      }
    );
  } else {
    // Mobile: Use Expo Location
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        showAlert("Permission Denied", "Allow location access to autofill your address.", () => {});
        setLoadingLocation(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let { latitude, longitude } = location.coords;

      let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });

      if (geocode.length > 0) {
        let formattedAddress = `${geocode[0].name} , ${geocode[0].street}, ${geocode[0].city}, ${geocode[0].region}, ${geocode[0].country}`;
        setAddress(formattedAddress);
        calculateDistance(latitude, longitude);
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      showAlert("Error", "Unable to fetch your location. Try again.", () => {});
    }
    setLoadingLocation(false);
  }
};


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Sets the user if logged in
    });
    return () => unsubscribe(); // Cleanup subscription
  }, []);

  const handleRemove = (id: number) => {
    showAlert('Remove Item', 'Are you sure you want to remove this item from your cart?', () => removeFromCart(id));
  };

  const sendOrderMessage = (paymentType: string) => {
    const orderDetails = cart
      .map((item) => `${item.name} x${item.cartQuantity}`)
      .join(', ');
    const message = `Order Details:\nName: ${name}\nContact: ${contactNumber}\nProducts: ${orderDetails}\nTotal Price: ₹${totalPrice.toFixed(
      2
    )}\nPayment Method: ${paymentType}`;


    // Send message to the customer
    Linking.openURL(`sms:${contactNumber}?body=${encodeURIComponent(message)}`);
    Linking.openURL(`whatsapp://send?phone=${contactNumber}&text=${encodeURIComponent(message)}`);

    // Send message to the owner
    const ownerNumber = '+916205720019';
    Linking.openURL(`sms:${ownerNumber}?body=${encodeURIComponent(message)}`);
    Linking.openURL(`whatsapp://send?phone=${ownerNumber}&text=${encodeURIComponent(message)}`);
  

  };

  const handleCheckout = () => {
    if (!currentUser) {
      // If user not logged in, navigate to login
      showAlert(
        'Authentication Required',
        'You need to log in to proceed to checkout.',
        () => navigation.navigate('Login')
      );
    } else if (!name || !contactNumber || !address) {
      showAlert('Missing Information', 'Please provide your name , contact number and address.' , () => {});
    } else if (selectedPayment === 'Cash on Delivery') {
      // Confirm Cash on Delivery order
      showAlert('Order Confirmed', 'Your order has been placed and will be paid on delivery.', () => {
        sendOrderMessage('Cash on Delivery'); // ✅ Automatically send message after confirming order
      });      
    } else if (selectedPayment === 'Online Payment') {
      // Navigate to Online Payment
      navigation.navigate('OnlinePayment', {
        name,
        contactNumber,
        totalPrice,
        cart,
        address,
      });
      sendOrderMessage('Online Payment'); // ✅ Automatically send message for online payment
    } else {
      showAlert('Select Payment Method', 'Please choose a payment method to proceed.' , () => {});
    }
  };

  // const toggleModal = () => {
  //   setModalVisible(!isModalVisible);
  // };

  useEffect(() => {
    // Animate the height change
    Animated.timing(animatedHeight, {
      toValue: isExpanded ? 300 : 0, // Adjust the height value as needed
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };



  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>Quantity: {item.cartQuantity}</Text>
      <Text style={styles.itemText}>Price: ₹{item.price.toFixed(2)}</Text>
      <TouchableOpacity onPress={() => handleRemove(item.id)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      
      {cart.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id.toString()}
          />

            <Animated.View style={{ height: animatedHeight, overflow: 'hidden' }}>
              <FlatList
                data={cart} // Show the remaining items in the expanded section
                renderItem={renderCartItem}
                keyExtractor={(item) => item.id.toString()}
              />
            </Animated.View>
            <TouchableOpacity onPress={toggleExpand} style={styles.toggleButton}>
              <Text style={styles.toggleButtonText}>{isExpanded ? 'View Less' : 'View All Items'}</Text>
            </TouchableOpacity>

          {/* <TouchableOpacity onPress={toggleModal} style={styles.showItemsButton}>
            <Text style={styles.showItemsText}>View All Items</Text>
          </TouchableOpacity> */}

          {/* Modal for displaying all cart items */}
          {/* <Modal
            visible={isModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={toggleModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Cart Items</Text>
                <ScrollView>
                  {cart.map((item) => (
                    <View key={item.id} style={styles.modalItem}>
                      <Text style={styles.itemText}>{item.name}</Text>
                      <Text style={styles.itemText}>Quantity: {item.cartQuantity}</Text>
                      <Text style={styles.itemText}>Price: ₹{item.price.toFixed(2)}</Text>
                    </View>
                  ))}
                </ScrollView>
                <TouchableOpacity onPress={toggleModal} style={styles.closeModalButton}>
                  <Text style={styles.closeModalText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal> */}
          
          <View style={styles.addressContainer}>
            <Text style={styles.inputLabel}>Name:</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
            />
            <Text style={styles.inputLabel}>Contact Number:</Text>
            <TextInput
              style={styles.input}
              value={contactNumber}
              onChangeText={setContactNumber}
              placeholder="Enter your contact number"
              keyboardType="phone-pad"
            />
            <Text style={styles.inputLabel}>Address:</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Enter your address"
              // returnKeyType="done"
              // onSubmitEditing={() => Keyboard.dismiss()}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={getCurrentLocation}>
                {loadingLocation ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Use Current Location</Text>}
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={openGoogleMaps}>
                <Text style={styles.buttonText}>Select from Map</Text>
              </TouchableOpacity>
            </View>
            {distance && <Text style={styles.distanceText}>Distance: {distance} km</Text>}
            
          </View>
          <View style={styles.paymentContainer}>
            <Text style={styles.paymentTitle}>Select Payment Method:</Text>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                selectedPayment === 'Cash on Delivery' && styles.selectedOption,
              ]}
              onPress={() => setSelectedPayment('Cash on Delivery')}
            >
              <Text style={styles.paymentText}>Cash on Delivery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                selectedPayment === 'Online Payment' && styles.selectedOption,
              ]}
              onPress={() => setSelectedPayment('Online Payment')}
            >
              <Text style={styles.paymentText}>Online Payment</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>Total Price: ₹{totalPrice.toFixed(2)}</Text>
            <TouchableOpacity onPress={handleCheckout} style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f7f7f7' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  cartItem: { marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#ddd', paddingBottom: 10 },
  itemText: { fontSize: 16, marginBottom: 5 },
  removeButton: { marginTop: 10, backgroundColor: '#FF6347', padding: 10, borderRadius: 5 },
  removeButtonText: { color: '#fff', textAlign: 'center' },
  emptyCartText: { fontSize: 18, color: 'gray', textAlign: 'center', marginTop: 20 },
  showItemsButton: { marginTop: 10, backgroundColor: '#4CAF50', padding: 10, borderRadius: 5 },
  showItemsText: { color: '#fff', textAlign: 'center', fontSize: 16 },
  // modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  // modalContent: { backgroundColor: '#fff', padding: 20, marginHorizontal: 20, borderRadius: 10 },
  // modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  // modalItem: { marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#ddd', paddingBottom: 10 },
  // closeModalButton: { marginTop: 10, backgroundColor: '#FF6347', padding: 10, borderRadius: 5 },
  // closeModalText: { color: '#fff', textAlign: 'center', fontSize: 16 },
  addressContainer: { marginVertical: 20 },
  inputLabel: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 },
  paymentContainer: { marginTop: 20, padding: 10 },
  paymentTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  paymentOption: { padding: 15, marginVertical: 5, borderRadius: 5, borderWidth: 1, borderColor: '#ddd' },
  selectedOption: { borderColor: '#4CAF50', backgroundColor: '#e8f5e9' },
  paymentText: { fontSize: 16 },
  summaryContainer: { marginTop: 20, padding: 15, borderTopWidth: 1, borderTopColor: '#ddd', backgroundColor: '#fff', borderRadius: 5 },
  summaryText: { fontSize: 18, fontWeight: 'bold' },
  checkoutButton: { marginTop: 10, backgroundColor: '#FFA500', padding: 15, borderRadius: 5 },
  checkoutButtonText: { color: '#fff', textAlign: 'center', fontSize: 18 },
  toggleButton: { marginTop: 10, backgroundColor: '#FFA500', padding: 10, borderRadius: 5 },
  toggleButtonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 0 },
  button: { flex: 1, marginHorizontal: 5, backgroundColor: '#FFA500', padding: 4, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 14 },
  distanceText: { fontSize: 13, fontWeight: 'bold', color: 'red', marginTop: 10, textAlign: 'center' },

});


