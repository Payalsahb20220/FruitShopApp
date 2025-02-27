import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ContactScreen() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Contact Us</Text>
      <Text style={styles.sectionText}>
        📍 <Text style={styles.bold}>Address:</Text> Girls School Road, Katihar, Bihar{"\n"}
        📞 <Text style={styles.bold}>Phone:</Text> +91 62057 20019{"\n"}
        ✉️ <Text style={styles.bold}>Email:</Text> support@fruitshop.com
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    // backgroundColor: "#F8F8F8",
    // padding: 15,
    // borderRadius: 10,
    // width: "100%",
    // marginTop: 20,
    // borderWidth: 1,
    // borderColor: "#DDD",
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
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
