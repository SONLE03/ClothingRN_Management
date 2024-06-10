import { ProductItem } from "./Product"
export interface ImportInvoice{
    createdAt: string,
    updatedAt: string,
    createdBy:string,
    updatedBy: string,
    id: string,
    total: number
}

export interface ImportResponse{
    id: string,
    total: number
}

export interface ImportItem{
    productItem: string, 
    productName: String,
    quantity: number,
    price: number,
    total: number
}

export interface ImportDetailResponse{
    importResponse: ImportResponse,
    importItemResponseList: ImportItem[]
}

export interface AddImportItem {
    productItemId: string;
    quantity: number;
    price: number;
    total: number;
}

export interface ImportDetail {
    id: {
        importId: string;
        productItemId: string;
    };
    importInvoice: ImportInvoice;
    productItem: ProductItem[];
    quantity: number;
    price: number;
    total: number;
}