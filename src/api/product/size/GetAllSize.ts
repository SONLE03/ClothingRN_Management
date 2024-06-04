import axios from 'axios';
import { apiServer } from '../../config';
import { ParseJSON } from '../../ParseJSON';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Size } from '../../../types/Product'

export const GetAllSize = async (): Promise<Size[]> => {
    const SizeURL = apiServer + '/size';
    const accessToken = await AsyncStorage.getItem('access_token')
    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);

    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: SizeURL,
        headers: {
            'Authorization': `Bearer ${parseToken}`
        }
    };
    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Get all size failed');
    }
}