import axios from 'axios';
import {ProductVariant} from '../../../entity/Product';
import {apiServer} from '../../config';
import {ParseJSON} from '../../ParseJSON';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AddExistedProduct = async (
  productId: string,
  ProductVariantRequests: ProductVariant[],
) => {
  const AddExistedProductUrl = apiServer + `/product/${productId}`;
  const accessToken = await AsyncStorage.getItem('access_token');
  const formData = new FormData();
  formData.append(
    'ProductVariantRequests',
    JSON.stringify(ProductVariantRequests),
  );

  if (!accessToken) {
    throw new Error('No access token found');
  }

  const parseToken = ParseJSON(accessToken);

  const response = await axios.post(
    AddExistedProductUrl,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};
