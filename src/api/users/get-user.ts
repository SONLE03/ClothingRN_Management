import axios, {AxiosResponse} from 'axios';
import {apiServer} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserPropsDetail} from '../../entity/User';
import {ParseJSON} from '../ParseJSON';

export const GetUser = async (isCustomer: boolean): Promise<UserPropsDetail[]> => {
  const GetUserURL = apiServer + (isCustomer ? '/customer' : `/staff`);
  const accessToken = await AsyncStorage.getItem('access_token');

  if (!accessToken) {
    throw new Error('No access token found');
  }

  const parseToken = ParseJSON(accessToken);

  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: GetUserURL,
      headers: {
        Authorization: `Bearer ${parseToken}`,
      },
    };

    const response = await axios.request(config);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error('Get all user failed');
  }
};
