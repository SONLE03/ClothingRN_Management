import axios from 'axios';
import { apiServer } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Branch } from '../../../types/Category';
import { ParseJSON } from '../../ParseJSON';

export const DeleteBranch = async (id: string) => {
    const accessToken  = await AsyncStorage.getItem('access_token')
    const DeleteURL = apiServer + `/branch/${id}`;

    if (!accessToken) {
        throw new Error("No access token found");
    }

    const parseToken = ParseJSON(accessToken);

    const config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: DeleteURL,
        headers: {
            "Authorization": `Bearer ${parseToken}`,
        },
    };
    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        //console.error(error);
        return false;
    }
};

