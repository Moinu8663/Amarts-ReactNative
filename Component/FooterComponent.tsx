import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

const FooterComponent = () => {
   const navigation = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <View style={styles.footer}>
      {/* <Text style={styles.footerText}>{text}</Text> */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
        <Text style={styles.buttontext}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Categories')} style={styles.button}>
        <Text style={styles.buttontext}>Categories</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.button}>
        <Text style={styles.buttontext}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    justifyContent: 'space-between',
    height: 60,
    paddingTop: 10,
    backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 0,
    position:'absolute',
  },
  // footerText: {
  //   color: 'white',
  //   fontSize: 16,
  // },
  button: {
    padding: 0
  },
  buttontext: {
    color: 'white',
    fontSize: 20,
    marginBottom: 5
  }
});

export default FooterComponent;
