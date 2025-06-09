import axios from 'axios';
import {apiServer} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Category} from '../../../entity/Category';
import {ParseJSON} from '../../ParseJSON';

export const EditCategory = async (
  id: string,
  name: string,
  productGender: string,
): Promise<void> => {
  const accessToken = await AsyncStorage.getItem('access_token');
  const UpdateURL = apiServer + `/category/${id}`;

  if (!accessToken) {
    throw new Error('No access token found');
  }

  const parseToken = ParseJSON(accessToken);

  const config = {
    method: 'put',
    url: UpdateURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${parseToken}`,
    },
    data: JSON.stringify({name, productGender}),
    maxBodyLength: Infinity,
  };

  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
  } catch (error) {
    console.error(error);
    throw error; // throw the error to be caught in the calling function
  }
};
