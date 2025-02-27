import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Us</Text>
            <Text style={styles.sectionText}>
              Welcome to <Text style={styles.bold}>Fruit Shop App</Text>! We provide the freshest fruits and juices at your doorstep.
              Our goal is to make healthy eating convenient and accessible to everyone.
            </Text>
    </View>
    
  );
}

const styles = StyleSheet.create({
  section: {
    // backgroundColor: "#fff",
    // padding: 15,
    // borderRadius: 10,
    // width: "100%",
    // marginTop: 20,
    // borderWidth: 1,
    // borderColor: "#DDD",
    // shadowColor: "#000",
    // shadowOpacity: 0,
    // shadowRadius: 3,
    // elevation: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFA500",
    marginBottom: 5,
    textAlign: "center",
    
  },
  sectionText: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
  },
  bold: {
    fontWeight: "bold",
    color: "#333",
  },

});
