import axios from 'axios';
import { apiServer } from '../../config';
import { ParseJSON } from '../../ParseJSON';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Color } from '../../../types/Product';


export const GetAllColor = async (): Promise<Color[]> => {
    const ColorURL = apiServer + '/color';
    const accessToken = await AsyncStorage.getItem('access_token')
    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);
    
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: ColorURL,
            headers: {
              "Authorization": `Bearer ${parseToken}`,
            }
          };
        
          const response = await axios.request<Color[]>(config);
          return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Get all color failed');
    }
}