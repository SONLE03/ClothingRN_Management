import axios from 'axios';
import { apiServer } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Gender } from '../../../types/Category';
import { ParseJSON } from '../../ParseJSON';


export const EditPG = async (id: string, name: string) => {
    const accessToken  = await AsyncStorage.getItem('access_token')
    const EditBranchUrl = apiServer + `/productGender/${id}`;

    if (!accessToken) {
        throw new Error("No access token found");
    }

    const parseToken = ParseJSON(accessToken);

    try {
        const config = {
            method: "put",
            maxBodyLength: Infinity,
            url: EditBranchUrl,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${parseToken}`,
            },
            data: JSON.stringify({ name }),
        };
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
