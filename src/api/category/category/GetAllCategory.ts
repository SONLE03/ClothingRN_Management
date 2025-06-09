import axios, {AxiosResponse} from 'axios';
import {apiServer} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Category} from '../../../entity/Category';
import {ParseJSON} from '../../ParseJSON';

const GetCategoryURL = apiServer + '/category';
export const GetAllCategory = async (): Promise<Category[]> => {
  const accessToken = await AsyncStorage.getItem('access_token');

  if (!accessToken) {
    throw new Error('No access token found');
  }

  const parseToken = ParseJSON(accessToken);

  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: GetCategoryURL,
      headers: {
        Authorization: `Bearer ${parseToken}`,
      },
    };

    const response: AxiosResponse<Category[]> = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Get all Category failed');
  }
};
