import axios, { AxiosResponse } from "axios";
import { apiServer } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Branch } from '../../../types/Category';
import { ParseJSON } from '../../ParseJSON';

const BranchURL = apiServer + '/branch';

export const GetAllBranch = async (): Promise<Branch[]> => {
    const accessToken  = await AsyncStorage.getItem('access_token')
    if (!accessToken) {
        throw new Error('No access token found');
    }

    const parseToken = ParseJSON(accessToken);
    
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: BranchURL,
            headers: {
              "Authorization": `Bearer ${parseToken}`,
            }
          };
        
          const response: AxiosResponse<Branch[]> = await axios.request(config);
          return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Get all branch failed');
    }
};
    