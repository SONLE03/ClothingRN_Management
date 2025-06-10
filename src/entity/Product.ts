import { ImageFile } from "../api/auth/change-avatar";

export interface Color {
    Id: string;
    ColorName: string;
    ColorCode: string;
}
export interface CreateColor {
    ColorName: string;
    ColorCode: string;
}

export interface Size {
    id: number;
    name: string;
}

export type ProductVariant = {
    colorId: string;
    length?: number;
    width?: number;
    height?: number;
    quantity: number;
    price: number;
    images: ImageFile[];
  };
//Products
export type Product = {
    ProductName: string;
    Unit: string;
    Description: string;
    BrandId: string;
    CategoryId: string;
    DesignersId: string[];
    MaterialsId: string[];
    Discount?: number;
    Thumbnail: ImageFile;
    ProductVariants: ProductVariant[];
  };

export type ProductGet = {
    Id: string;
    ProductName: string;
    Unit: string;
    Description: string; 
    BrandName: string;
    CategoryName: string;
    //Designers?: string[];
    Materials: string[];
    DisplayPrice: string;
    Discount?: number;
    ImageSource: string;
    ProductVariants: ProductVariantGet[];
};


export type ProductVariantGet = {
    Id: string;
    ColorId: string;
    ColorName: string;
    SizeId: string;
    SizeName: string;
    //DisplayDimension: string;
    Quantity: number;
    Price: number;
    ImageSource: string[];
  };
