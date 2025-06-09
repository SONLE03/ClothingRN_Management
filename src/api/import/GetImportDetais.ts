import axios from 'axios';
import {apiServer} from '../config';
import {ParseJSON} from '../ParseJSON';
import {ImportDetail} from '../../entity/Import';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetImportById = async (id: string) => {
  const GetImportByIdUrl = apiServer + `/imports/${id}`;

  const accessToken = await AsyncStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('No access token found');
  }

  const parseToken = ParseJSON(accessToken);

  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: GetImportByIdUrl,
      headers: {
        Authorization: `Bearer ${parseToken}`,
      },
    };

    return axios.request(config);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
