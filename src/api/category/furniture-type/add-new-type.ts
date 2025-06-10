import axios from 'axios';
import {apiServer} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CreateFurnitureType} from '../../../entity/Category';
import {ParseJSON} from '../../ParseJSON';

const AddFurnitureTypeUrl = apiServer + '/furnitureType';

// Multipart/form-data for adding a new furniture type
export const CreateNewFurnitureType = async (data: CreateFurnitureType) => {
  const accessToken = await AsyncStorage.getItem('access_token');
  const formData = new FormData();

  // Append fields
  formData.append('FurnitureTypeName', data.FurnitureTypeName);
  formData.append('Description', data.Description);
  if (data.RoomSpaceId) {
    formData.append('RoomSpaceId', data.RoomSpaceId);
  }

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

  const response = await axios.post(AddFurnitureTypeUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${parseToken}`,
    },
  });

  return response.data;
};
