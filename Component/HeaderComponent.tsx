import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native"

const HeaderComponent =({title}:any) =>{
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    return(
        <View style ={Styles.headerContainer}>
            <Text style ={Styles.title}>{title}</Text>
        </View>
    )
};
const Styles = StyleSheet.create({
    headerContainer:{
        width: '100%',
        height: 70,
        paddingTop: 20,
        backgroundColor: 'green',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position:'static'
    },
    title:{
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold'
    },
});

export default HeaderComponent;

