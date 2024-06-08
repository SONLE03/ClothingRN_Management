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
    quantity: number,
    price: number,
    total: number
}

export interface ImportDetailResponse{
    importResponse: ImportResponse,
    importItemResponseList: ImportItem[]
}