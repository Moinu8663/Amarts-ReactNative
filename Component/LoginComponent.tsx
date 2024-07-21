import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Button,Text,StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserService from "../Service/UserService";

const LoginComponent =()=>{
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const [MobileNo, setmobileno] = useState('');
    const [Password, setPassword] = useState('');
    const validateInputs = () => {
        if ( !MobileNo || !Password ) {
            Alert.alert('Error', 'All fields are required.');
            return false;
        }

        const mobilePattern = /^[0-9]{10}$/;
        if (!mobilePattern.test(MobileNo)) {
            Alert.alert('Error', 'Invalid mobile number.');
            return false;
        }


        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(Password)) {
            Alert.alert('Error', 'Password must be at least 8 characters long and  at least one uppercase letter, one lowercase letter, one digit, one special character.');
            return false;
        }

        return true;
    };

    const handleLogin = async () => {
        if (!validateInputs()) {
            return;
          }
          try{
                const response = await UserService.login(MobileNo,Password);
                const token = response.data;
                console.log(token);
                 // Assuming the response contains a token
                
                 await AsyncStorage.setItem('token', token);
                 await AsyncStorage.setItem('mobileno', MobileNo);
                const storeToken = await AsyncStorage.getItem('token');
                const storeMobileNo  = await AsyncStorage.getItem('mobileno');
                console.log(storeMobileNo,storeToken);
                Alert.alert('Success', 'User Login successfully!');


                setmobileno('');
                setPassword('');

                navigation.navigate('Profile'); // Navigate to Profile component  
          }catch(error:any){
            Alert.alert('Login Failed',error.message);
          }         
    };
return(
    <View style ={Styles.Container}>
            <Text style ={Styles.title}>Login</Text>
            <View style ={Styles.FormContainer}>
            <TextInput
                placeholder="Mobile No"
                onChangeText={setmobileno}
                value={MobileNo}
                style={Styles.input}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                onChangeText={setPassword}
                value={Password}
                style={Styles.input}
            />
            <TouchableOpacity onPress={handleLogin} style={Styles.button}>
                <Text style={Styles.buttontext}>Login</Text>
            </TouchableOpacity>
            </View>
            <View style={Styles.buttoncontainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={Styles.button}>
                <Text style={Styles.buttontext}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={Styles.button}>
                <Text style={Styles.buttontext}>Home</Text>
            </TouchableOpacity>
            </View>
            
        </View>
)
};
const Styles = StyleSheet.create({
    Container:{
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
   title:{
       paddingTop:10,
       //justifyContent:'center',
       //alignItems:'center',
       color: 'black',
       fontSize: 30,
       textAlign:'center'
       //fontWeight: 'bold'
   },
   button:{
       backgroundColor:'green',
       padding:5,
       marginVertical:10,
   },
   buttontext:{
       color: 'white',
       fontSize: 16,
       textAlign:'center'
   },
   FormContainer:{
    marginTop:20,
    justifyContent: 'center',
    paddingHorizontal: 20,
   },
   input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5
},
buttoncontainer:{
    justifyContent:'space-between',
    flexDirection: 'row',
    alignContent:'center',
    paddingVertical:20,
    paddingHorizontal:20
}
});
export default LoginComponent;