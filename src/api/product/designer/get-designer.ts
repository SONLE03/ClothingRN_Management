import axios, {AxiosResponse} from 'axios';
import {apiServer} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Designer} from '../../../entity/Category';
import {ParseJSON} from '../../ParseJSON';

const DesignerURL = apiServer + '/designer';
export const GetAllDesigner = async (): Promise<Designer[]> => {
  const accessToken = await AsyncStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('No access token found');
  }

  const parseToken = ParseJSON(accessToken);

  try {
    const config = {
      method: 'GET',
      maxBodyLength: Infinity,
      url: DesignerURL,
      headers: {
        Authorization: `Bearer ${parseToken}`,
      },
    };

    const response = await axios.request(config);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error('Get all designer failed');
  }
};
