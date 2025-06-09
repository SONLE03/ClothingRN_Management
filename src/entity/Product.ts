export interface Color {
    id: number;
    name: string;
}

export interface Size {
    id: number;
    name: string;
}
//Products
export interface Product {
    id: string;
    product_Name: string;
    description: string;
    price: number;
    category: string;
    branch: string;
    productStatus: string;
    images: string;
}

export interface ProductRequest {
    product_Name: string;
    description: string;
    price: number;
    category: string;
    branch: string;
    productItemRequests: ProductItemRequest[];
  }
  
export interface ProductItemRequest {
    size: number;
    color: number;
}
  
export interface CreateProductForm {
    productRequest: ProductRequest;
    image: File[];
}


//Concrete product
export interface ProductItem {
    id: string;
    sizeName: string;
    colorName: string;
    quantity: number;
    price: number;
}
