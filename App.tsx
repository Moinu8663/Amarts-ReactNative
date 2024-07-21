import React from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderComponent from './Component/HeaderComponent';
import FooterComponent from './Component/FooterComponent';
import HomeComponent from './Component/HomeComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginComponent from './Component/LoginComponent';
import RegisterComponent from './Component/RegisterComponent';
import ProfileComponent from './Component/ProfileComponent';
import CategoriesComponent from './Component/CategoriesComponent';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeComponent} 
            options={{header: () => <HeaderComponent title="Home"/>,
              // footer: () => <FooterComponent />,
            }}/>

            <Stack.Screen name="Login" component={LoginComponent}
              options={{header: () => (<HeaderComponent title="Login" />)}}/>

            <Stack.Screen name="Register" component={RegisterComponent} 
            options={{header: () => (<HeaderComponent title="Registration" />)}}/>

            <Stack.Screen name="Profile" component={ProfileComponent} 
             options={{header: () => (<HeaderComponent title="Profile" />)}}/>

            <Stack.Screen name="Categories" component={CategoriesComponent} 
             options={{header: () => (<HeaderComponent title="Categories" />)}}/>
          </Stack.Navigator>
          <FooterComponent/>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
});

export default App;
