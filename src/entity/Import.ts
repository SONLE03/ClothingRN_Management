// export interface ImportInvoice{
//     createdAt: string,
//     updatedAt: string,
//     createdBy:string,
//     updatedBy: string,
//     id: string,
//     total: number
// }

export interface ImportResponse{
    Id: string,
    Total: number
}

export interface ImportItemResponse{
    ProductVariantId: string,
    ProductName: string | null,
    Quantity: number,
    Price: number,
    Total: number
}

export interface ImportDetailResponse{
    Id: string,
    Total: number
    ImportItemResponse: ImportItemResponse[]
}

export interface AddImportItem {
    productVariantId: string;
    quantity: number;
    price: number;
    total: number;
}

// export interface ImportDetail {
//     id: {
//         importId: string;
//         productItemId: string;
//     };
//     importInvoice: ImportInvoice;
//     productItem: [];
//     quantity: number;
//     price: number;
//     total: number;
// }