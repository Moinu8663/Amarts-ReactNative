import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthService, { getMobileNo } from './AuthService';

const API_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:AmartsUser';

const UserService = {
    registerUser: async (UserData) => {
        try {
          const response =  axios.post(`${API_BASE_URL}/user`, UserData);
          return response.data;
        } 
        catch (error) {
          throw error;
        }
      },
      //https://x8ki-letl-twmt.n7.xano.io/api:AmartsUser/user/9876543211?MobileNo=9876543211
      checkUserExists: async (MobileNo) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/user/${MobileNo}`);
            return response.data.exists;  // Adjust based on actual response format
        } catch (error) {
            console.error('Error checking user existence:', error);
            throw error;
        }
    },
    login:async(MobileNo,Password)=>{
      try {
        const response =  axios.post(`${API_BASE_URL}/auth/login`,{MobileNo,Password});
        return response;
      } 
      catch (error) {
        throw error;
      }
    },
    profile:async() =>{
        try {
          const MobileNo = await AsyncStorage.getItem('mobileno')
          console.log(MobileNo);
          if (!MobileNo) {
            throw new Error('Mobile number not found in storage');
          }
      
          const response = await axios.get(`${API_BASE_URL}/user/${MobileNo}`);
          return response.data;  // Adjust based on actual response format
        } catch (error) {
          console.error('Error fetching user profile:', error);
          throw error;
        }
      }
};
export default UserService;