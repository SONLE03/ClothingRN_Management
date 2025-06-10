import axios from 'axios';
import {apiServer} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ParseJSON} from '../../ParseJSON';

export const DeleteFType = async (id: string) => {
  const accessToken = await AsyncStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('No access token found');
  }

  const parseToken = ParseJSON(accessToken);

  const DeleteURL = apiServer + `/furnitureType/${id}`;
  const config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: DeleteURL,
    headers: {
      Authorization: `Bearer ${parseToken}`,
    },
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
