import axios from 'axios';
import {apiServer} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ParseJSON} from '../../ParseJSON';

export const DeleteBranch = async (id: string) => {
  const accessToken = await AsyncStorage.getItem('access_token');
  // Remove quotes from id if they exist
  const cleanedId = id.replace(/['"]/g, '');
  const DeleteURL = apiServer + `/brand/${cleanedId}`;

  if (!accessToken) {
    throw new Error('No access token found');
  }

  const parseToken = ParseJSON(accessToken);

  const config = {
    method: 'DELETE',
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
    //console.error(error);
    return false;
  }
};
