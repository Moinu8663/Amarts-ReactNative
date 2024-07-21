import React from "react";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from "react-native";

const HomeComponent = () => {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    return (
        <View style={Styles.homeContainer}>

            <Text style={Styles.title}>Welcome To Our World </Text>
            <Image source={require('../assets/Amlogo.png')} style={Styles.image} />

            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={Styles.button}>
                <Text style={Styles.buttontext}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const Styles = StyleSheet.create({
    homeContainer: {
        paddingTop:50,
        marginRight:10,
        marginLeft:10
    },
    title: {
        paddingTop: 0,
        color: 'black',
        fontSize: 30,
        textAlign: 'center'
    },
    button: {
        backgroundColor: 'green',
        padding: 10,
        marginVertical: 10,
        marginHorizontal:50,
        borderRadius: 5,
    },
    buttontext: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 10,
        marginVertical: 20,
        alignSelf: 'center'
    }
});

export default HomeComponent;
