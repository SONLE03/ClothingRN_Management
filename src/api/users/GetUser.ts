import axios, {AxiosResponse} from 'axios';
import {apiServer} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserProps} from '../../entity/User';
import {ParseJSON} from '../ParseJSON';

export const GetUser = async (): Promise<UserProps[]> => {
  const GetUserURL = apiServer + `/staff`;
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
