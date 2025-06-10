import axios from 'axios';
import FormData from 'form-data';
import {Product} from '../../../entity/Product';
import {ParseJSON} from '../../ParseJSON';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiServer} from '../../config';

const AddProductUrl = apiServer + '/product';

export const AddProduct = async (product: Product): Promise<void> => {
  const accessToken = await AsyncStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('No access token found');
  }
  const parseToken = ParseJSON(accessToken);
  const data = new FormData();

  data.append('ProductName', product.ProductName);
  data.append('Unit', product.Unit);
  data.append('Description', product.Description);
  data.append('Thumbnail', product.Thumbnail);
  data.append('BrandId', product.BrandId);
  data.append('CategoryId', product.CategoryId);

  product?.DesignersId.forEach((id, index) =>
    data.append(`DesignersId[${index}]`, id),
  );
  product?.MaterialsId.forEach((id, index) =>
    data.append(`MaterialsId[${index}]`, id),
  );

  if (product.Discount) {
    data.append('Discount', product.Discount.toString());
  }

  product.ProductVariants?.forEach((variant, index) => {
    data.append(`ProductVariants[${index}].ColorId`, variant.ColorId);
    data.append(
      `ProductVariants[${index}].Length`,
      (variant?.Length ?? 1).toString(),
    );
    data.append(
      `ProductVariants[${index}].Width`,
      (variant?.Width ?? 1).toString(),
    );
    data.append(
      `ProductVariants[${index}].Height`,
      (variant.Height ?? 1).toString(),
    );
    data.append(
      `ProductVariants[${index}].Quantity`,
      variant.Quantity.toString(),
    );
    data.append(`ProductVariants[${index}].price`, variant.Price.toString());
    variant.Images?.forEach(image =>
      data.append(`ProductVariants[${index}].Images`, image),
    );
  });
  console.log('AddProduct data:', data);
  console.log('AddProduct url:', AddProductUrl);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    const response = await axios.post(AddProductUrl, data, config);
    return response.data;
  } catch (error) {
    console.error('Create product failed:', error);
    throw error;
  }
};
