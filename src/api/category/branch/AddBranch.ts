import axios from 'axios';
import { apiServer } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Branch } from '../../../types/Category';
import { ParseJSON } from '../../ParseJSON';

const AddBranchUrl = apiServer + "/branch";

export const AddBranch = async (branchName: string) => {
    const accessToken  = await AsyncStorage.getItem('access_token')
    if (!accessToken) {
        throw new Error("No access token found");
    }
    
    const parseToken = ParseJSON(accessToken);

    try {
        const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: AddBranchUrl,
            headers: {
                "Authorization": `Bearer ${parseToken}`,
                "Content-Type": "application/json",
            },
            data: JSON.stringify({ name: branchName }),
        };
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Add branch failed");
    }
    
    
};
