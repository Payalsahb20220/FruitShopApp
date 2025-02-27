import React , { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet , Modal , Alert , ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { auth } from '../firebaseConfig';
import { getFirestore, doc, getDoc , updateDoc} from 'firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker'; // Import image picker
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

import { Ionicons , MaterialIcons } from '@expo/vector-icons';

import AboutScreen from './AboutScreen';  // ✅ Import About Screen
import ContactScreen from './ContactScreen';  // ✅ Import Contact Screen



type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [userDetails, setUserDetails] = useState<any>(null); // User details state
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const db = getFirestore();
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserDetails(userDoc.data());
          }
        } catch (error) {
          console.error("Error fetching user details: ", error);
        }
      }
    };
    fetchUserDetails();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      Alert.alert("Success", "You have been signed out.");
      setUserDetails(null); // Clear user details
      navigation.navigate('Home'); // Redirect to home screen
    } catch (error) {
      Alert.alert("Error", "Failed to sign out.");
    }
  };

  // Function to handle image upload
const handleImageUpload = async () => {
  
    //  Request permission to access photos
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'You need to allow access to the photo library.');
      return;
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;

      try {
        // Upload image to Firebase Storage
        const storageRef = getStorage();
        const imageRef = ref(storageRef, `profilePhotos/${auth.currentUser?.uid}`);
        const response = await fetch(imageUri);
        const blob = await response.blob();

        await uploadBytes(imageRef, blob);

        // Get the download URL
        const photoUrl = await getDownloadURL(imageRef);

        // Update Firestore with the profile photo URL
        const db = getFirestore();
        const userDocRef = doc(db, 'users', auth.currentUser?.uid!);
        await updateDoc(userDocRef, { profilePhotoUrl: photoUrl });

        // Update local state
        setUserDetails((prev: any) => ({ ...prev, profilePhotoUrl: photoUrl }));
        Alert.alert('Success', 'Profile photo updated successfully!');
      } catch (error) {
        console.error('Error uploading profile photo:', error);
        Alert.alert('Error', 'Failed to upload profile photo.');
      }
    }
  
};

  return (
    // <View style={styles.container}>
    //   {/* Top Right Buttons */}
    //   <View style={styles.topRightButtons}>
    //     <TouchableOpacity
    //       style={styles.linkButton}
    //       onPress={() => navigation.navigate('Login')}
    //     >
    //       <Text style={styles.linkText}>Login</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={styles.linkButton}
    //       onPress={() => navigation.navigate('Signup')}
    //     >
    //       <Text style={styles.linkText}>Signup</Text>
    //     </TouchableOpacity>
    //   </View>
<ScrollView contentContainerStyle={styles.container}>
    {/* <View style={styles.container}> */}
    {/* Top Right Buttons */}
    {/* Wishlist Button */}
    {userDetails && (
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={() => navigation.navigate('Wishlist')}
        >
          <MaterialIcons name="favorite" size={35} color="#FFA500" />
        </TouchableOpacity>
      )}

    <View style={styles.topRightButtons}>
    {userDetails ? (
          <>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <MaterialIcons name="account-circle" size={45} color="#FFA500" />
            </TouchableOpacity>

            {/* Profile Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    {/* Profile Picture Section */}
                    <TouchableOpacity onPress={handleImageUpload}>
                      {userDetails?.profilePhotoUrl ? (
                        <Image
                          source={{ uri: userDetails.profilePhotoUrl }}
                          style={styles.profileImage}
                        />
                      ) : (
                        <View style={styles.placeholderImage}>
                          <MaterialIcons name="person" size={50} color="#aaa" />
                        </View>
                      )}
                    </TouchableOpacity>
                    <Text style={styles.imageHint}>Tap to upload a profile photo</Text>

                    {/* User Details */}
                    <Text style={styles.profileTitle}>Profile Details</Text>
                    <Text style={styles.profileText}>Name: {userDetails.name}</Text>
                    <Text style={styles.profileText}>Email: {userDetails.email}</Text>
                    <Text style={styles.profileText}>Mobile: {userDetails.mobile}</Text>
                    <Text style={styles.profileText}>Address: {userDetails.address}</Text>

                    {/* Buttons */}
                    <TouchableOpacity
                      style={[styles.button, { marginTop: 20 }]}
                      onPress={handleSignOut}
                    >
                      <Text style={styles.buttonText}>Sign Out</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setModalVisible(false)}
                      style={styles.closeButton}
                    >
                      <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
          </>
      ) : (
        <>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.linkText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.linkText}>Signup</Text>
          </TouchableOpacity>
        </>
      )}
    </View>


      {/* Main Content */}
      <Image source={require('../assets/logo.webp')} style={styles.logo} />
      <Text style={styles.title}>Welcome to Fruit Shop App</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Products')}
      >
        <Text style={styles.buttonText}>View Products</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cart')}
      >
        <Text style={styles.buttonText}>Go to Cart</Text>
      </TouchableOpacity>

      

      {/* ✅ Add About and Contact Sections at Bottom */}
      {/* Navigation Buttons for About and Contact Screens */}
      {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("About")}>
        <Text style={styles.buttonText}>About Us</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Contact")}>
        <Text style={styles.buttonText}>Contact Us</Text>
      </TouchableOpacity> */}

      {/* About Section */}
      <AboutScreen/>
      {/* Contact Section */}
      <ContactScreen/>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    
  },
  topRightButtons: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
  },
  linkButton: {
    marginLeft: 15,
    padding: 10,
  },
  linkText: {
    color: '#FFA500',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    marginTop:70,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  
  profileText: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
  },
  closeButtonText: {
    color: '#FFA500',
    fontSize: 16,
    textDecorationLine: 'underline',
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageHint: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  wishlistButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },

  
  
  
});


