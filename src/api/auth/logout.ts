import axios from 'axios';
import { apiServer } from '../config';
import { ParseJSON } from '../ParseJSON';
import AsyncStorage from '@react-native-async-storage/async-storage';

const envLogout = apiServer + "/auth/logout"

const logoutUser = async (): Promise<void> => {
    const accessToken  = await AsyncStorage.getItem('access_token')

  if (!accessToken) {
    throw new Error('No access token found');
    
  }

  const parseToken = ParseJSON(accessToken);

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: envLogout,
    headers: {
      'Authorization': `Bearer ${parseToken}`,
      
    }
  };

  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
  } catch (error) {
    console.error(error);
    //throw new Error('Logout failed');
    //return false;
  }
};

export default logoutUser;