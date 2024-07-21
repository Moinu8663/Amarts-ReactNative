import { useState } from "react";
import { Text, View, StyleSheet, Alert, Button, TextInput, TouchableOpacity, ScrollView } from "react-native";
import UserService from "../Service/UserService";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";

const RegisterComponent = () => {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const [FirstName, setfirstname] = useState('');
    const [LastName, setlastname] = useState('');
    const [MobileNo, setmobileno] = useState('');
    const [EmailId, setemail] = useState('');
    const [Address, setaddress] = useState('');
    const [Password, setPassword] = useState('');
    const [conpassword, setconPassword] = useState('');


    const validateInputs = () => {
        if (!FirstName || !LastName || !MobileNo || !EmailId || !Address || !Password || !conpassword) {
            Alert.alert('Error', 'All fields are required.');
            return false;
        }

        const mobilePattern = /^[0-9]{10}$/;
        if (!mobilePattern.test(MobileNo)) {
            Alert.alert('Error', 'Invalid mobile number.');
            return false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(EmailId)) {
            Alert.alert('Error', 'Invalid email.');
            return false;
        }

        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(Password)) {
            Alert.alert('Error', 'Password must be at least 8 characters long and  at least one uppercase letter, one lowercase letter, one digit, one special character.');
            return false;
        }

        if (Password !== conpassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return false;
        }

        return true;
    };

    const handleRegister = async () => {
        if (!validateInputs()) {
            return;
          }
            try {
                const user = await UserService.checkUserExists(MobileNo);
                if (!user) {
                    Alert.alert('Error', 'Mobile number already exists');
                    return;
                }
                const userData = { FirstName, LastName, MobileNo, EmailId, Address, Password };
                const response = await UserService.registerUser(userData);
                Alert.alert('success', 'registered successfully');
                setfirstname('');
                setlastname('');
                setmobileno('');
                setemail('');
                setaddress('');
                setPassword('');
                setconPassword('');
                navigation.navigate('Login'); // Navigate to Login component
            } catch (error:any) {
                Alert.alert('Registration Failed',error.message);
            }
        
    };
    return (
        <ScrollView>
            <View style={Style.container}>
                <Text style={Style.text}>
                    Registration
                </Text>
                <TextInput
                    placeholder="First Name"
                    onChangeText={setfirstname}
                    value={FirstName}
                    style={Style.input}
                />
                <TextInput
                    placeholder="Last Name"
                    onChangeText={setlastname}
                    value={LastName}
                    style={Style.input}
                />
                <TextInput
                    placeholder="Mobile No"
                    onChangeText={setmobileno}
                    value={MobileNo}
                    style={Style.input}
                />
                <TextInput
                    placeholder="Email Id"
                    onChangeText={setemail}
                    value={EmailId}
                    style={Style.input}
                />
                <TextInput
                    placeholder="Address"
                    onChangeText={setaddress}
                    value={Address}
                    style={Style.input}
                />
                <TextInput
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={setPassword}
                    value={Password}
                    style={Style.input}
                />
                <TextInput
                    placeholder="Confirm Password"
                    secureTextEntry
                    onChangeText={setconPassword}
                    value={conpassword}
                    style={Style.input}
                />
                <TouchableOpacity onPress={handleRegister} style={Style.button}>
                    <Text style={Style.buttontext}>Register</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
};
const Style = StyleSheet.create({
    container: {
        flex: 1,
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
    button: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
    },
    buttontext: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    text: {
        color: 'black',
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20,

    },

});
export default RegisterComponent;