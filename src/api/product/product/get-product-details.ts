import axios, {AxiosResponse} from 'axios';
import {apiServer} from '../../config';
import {ParseJSON} from '../../ParseJSON';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProductGet} from '../../../entity/Product';

export const GetDetailProduct = async (
  productId: string,
): Promise<ProductGet[]> => {
  const cleanProductId = productId.replace(/['"]/g, '');
  const ProductURL = apiServer + `/product/${cleanProductId}`;
  const accessToken = await AsyncStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('No access token found');
  }

  const parseToken = ParseJSON(accessToken);

  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: ProductURL,
      headers: {
        Authorization: `Bearer ${parseToken}`,
      },
    };

    const response = await axios.request(config);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error('Get all products failed');
  }
};
