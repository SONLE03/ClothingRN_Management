import axios from 'axios';
import { apiServer } from '../../config';
import { ParseJSON } from '../../ParseJSON';
import { CreateColor } from '../../../entity/Product';
import AsyncStorage from '@react-native-async-storage/async-storage';

// multipart/form-data for adding a new color
export const AddColors = async (data: CreateColor) => {
    const accessToken = await AsyncStorage.getItem('access_token');
    const formData = new FormData();

    // Append color fields
    formData.append('ColorName', data.ColorName);
    formData.append('ColorCode', data.ColorCode);

    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);
    const AddColorUrl = apiServer + '/color';

    const response = await axios.post(AddColorUrl, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${parseToken}`,
        },
    });

    return response.data;
}