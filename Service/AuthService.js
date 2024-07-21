import AsyncStorage from "@react-native-async-storage/async-storage";

  export  const getToken = async() =>{
        await AsyncStorage.getItem('token');
    };
   export const getMobileNo = async () =>{
        await AsyncStorage.getItem('mobileno');
    };
    export const isTokenExpired= async () => {
        const tokenExpiry = await AsyncStorage.getItem('tokenExpiry');
        if (!tokenExpiry) return true;
      
        const currentTime = new Date().getTime();
        return currentTime > parseInt(tokenExpiry, 1);
    };
    export const logout= async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('tokenExpiry');
        await AsyncStorage.removeItem('mobileno')
    }

