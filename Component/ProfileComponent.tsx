import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import UserService from '../Service/UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';



const Profile = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await UserService.profile();
        setData(response);
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Session expire login again !');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
console.log(data);
  const handleLogout = async () => {
      await AsyncStorage.removeItem('mobileno');
      await AsyncStorage.removeItem('token');
      setData(null);
      navigation.navigate('Login');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.itemContainer}>
        {data ? (
                <>
                <Text style={styles.item}>First Name : {data.FirstName}</Text>
                <Text style={styles.item}>Last Name : {data.LastName}</Text>
                <Text style={styles.item}>Mobile No : {data.MobileNo}</Text>
                <Text style={styles.item}>Email Id : {data.EmailId}</Text>
                <Text style={styles.item}>Address : {data.Address}</Text>
                <TouchableOpacity onPress={handleLogout} style={styles.button}>
                  <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
                </>
        ) : (
          <Text style={styles.errorText}>Failed to load profile data.</Text>
        )}
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  itemContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  item: {
    fontSize: 16,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  button: {
    backgroundColor: 'green',
    padding: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});

export default Profile;
{/* <Text style={styles.item}>First Name: {data.FirstName}</Text>
<Text style={styles.item}>Last Name: {data.LastName}</Text>
<Text style={styles.item}>Mobile No: {data.MobileNo}</Text>
<Text style={styles.item}>Email: {data.EmailId}</Text>
<Text style={styles.item}>Address: {data.Address}</Text> */}