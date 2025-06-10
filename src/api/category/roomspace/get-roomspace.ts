import axios, {AxiosResponse} from 'axios';
import {apiServer} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RoomSpace} from '../../../entity/Category';
import {ParseJSON} from '../../ParseJSON';

const RoomSpaceURL = apiServer + '/roomSpace';
export const GetAllRoomSpace = async (): Promise<RoomSpace[]> => {
  const accessToken = await AsyncStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('No access token found');
  }

  const parseToken = ParseJSON(accessToken);

  try {
    const config = {
      method: 'GET',
      maxBodyLength: Infinity,
      url: RoomSpaceURL,
      headers: {
        Authorization: `Bearer ${parseToken}`,
      },
    };

    const response = await axios.request(config);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error('Get all room space failed');
  }
};
