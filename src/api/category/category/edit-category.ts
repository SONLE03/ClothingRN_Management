import axios from 'axios';
import {apiServer} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CreateCategory} from '../../../entity/Category';
import {ParseJSON} from '../../ParseJSON';

// multipart/form-data for editing a Category
export const EditCategory = async (
  categoryId: string,
  data: CreateCategory,
) => {
  const accessToken = await AsyncStorage.getItem('access_token');
  const formData = new FormData();

  // Append fields
  formData.append('CategoryName', data.CategoryName);
  formData.append('Description', data.Description);
  formData.append('FurnitureTypeId', data.FurnitureTypeId);

  // Append images if available
  if (data.Image) {
    formData.append('Image', {
      uri: data.Image.uri,
      type: data.Image.type,
      name: data.Image.name,
    });
  }

  if (!accessToken) {
    throw new Error('No access token found');
  }

  const parseToken = ParseJSON(accessToken);
  const itemIdCleaned = categoryId.replace(/['"]/g, '');
  const EditBranchUrl = apiServer + `/category/${itemIdCleaned}`;

  const response = await axios.put(EditBranchUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${parseToken}`,
    },
  });

  return response.data;
};
