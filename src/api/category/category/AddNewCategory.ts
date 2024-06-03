import axios from 'axios';
import { apiServer } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Category } from '../../../types/Category';
import { ParseJSON } from '../../ParseJSON';


const CreateCategoryURL = apiServer + '/category';

export const CreateCategory = async (name : string, productGender : string) => {
    const accessToken  = await AsyncStorage.getItem('access_token')
    if (!accessToken) {
        throw new Error('No access token found');
    }
    
    const parseToken = ParseJSON(accessToken);

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: CreateCategoryURL,
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${parseToken}`
        },
        data: JSON.stringify({ name, productGender })
    };

    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to create category');
    }
};