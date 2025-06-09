import { ImageFile } from "../api/auth/change-avatar";

export interface Brand {
    Id: string;
    BrandName: string;
    Description: string | null;
    ImageSource: string | null;   
}

export interface CreateBrand {
    BrandName: string;
    Description?: string | null;
    Image?: ImageFile | null;
}

export interface FurnitureType {
    Id: string;
    Name: string;
    Description: string | null;
    ImageSource: string | null;
}
export interface Gender {
    id: string;
    name: string;
    
}
export interface Category {
    Id: string;
    FurnitureTypeId: string;
    Description: string | null;
    Image: string | null;
}