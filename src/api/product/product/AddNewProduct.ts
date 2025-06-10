// import axios from 'axios';
// import {CreateProductForm} from '../../../entity/Product';
// import {apiServer} from '../../config';
// import {ParseJSON} from '../../ParseJSON';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const AddProductUrl = apiServer + '/products';

// export const AddProduct = async (data: CreateProductForm) => {
//   const accessToken = await AsyncStorage.getItem('access_token');
//   const formData = new FormData();

//   // Append productRequest fields
//   formData.append('product_Name', data.productRequest.product_Name);
//   formData.append('description', data.productRequest.description);
//   formData.append('price', data.productRequest.price.toString());
//   formData.append('category', data.productRequest.category);
//   formData.append('branch', data.productRequest.branch);

//   data.productRequest.productItemRequests.forEach((item, index) => {
//     formData.append(`productItemRequests[${index}].size`, item.size.toString());
//     formData.append(
//       `productItemRequests[${index}].color`,
//       item.color.toString(),
//     );
//   });

//   // Append images
//   for (let i = 0; i < data.image.length; i++) {
//     console.log(data.image[i]);
//     formData.append('images', data.image[i]);
//   }

//   console.log(formData);

//   if (!accessToken) {
//     throw new Error('No access token found');
//   }

//   const parseToken = ParseJSON(accessToken);

//   const response = await axios.post(AddProductUrl, formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//       Authorization: `Bearer ${parseToken}`,
//     },
//   });

//   return response.data;
// };

// api/createProduct.ts
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
    data.append(`ProductVariants[${index}].colorId`, variant.colorId);
    data.append(
      `ProductVariants[${index}].length`,
      (variant?.length ?? 0).toString(),
    );
    data.append(
      `ProductVariants[${index}].width`,
      (variant?.width ?? 0).toString(),
    );
    data.append(
      `ProductVariants[${index}].height`,
      (variant.height ?? 0).toString(),
    );
    data.append(
      `ProductVariants[${index}].quantity`,
      variant.quantity.toString(),
    );
    data.append(`ProductVariants[${index}].price`, variant.price.toString());
    variant.images?.forEach(image =>
      data.append(`ProductVariants[${index}].images`, [image]),
    );
  });
  console.log('AddProduct data:', data);
  console.log('AddProduct url:', AddProductUrl);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${parseToken}`,
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
