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
    ImageSource: string | null;
    CategoryName: string;
}

export interface CreateCategory {
    FurnitureTypeId?: string;
    Description?: string | null;
    Image?: ImageFile | null;
    CategoryName: string;
}

export interface FurnitureType {
    Id: string;
    FurnitureTypeName: string;
    Description: string | null;
    ImageSource: string | null;
}

export interface CreateFurnitureType {
    FurnitureTypeName: string;
    Description?: string | null;
    Image?: ImageFile | null;
    RoomSpaceId?: string;
}

export interface RoomSpace {
    Id: string;
    RoomSpaceName: string;
    Description: string | null;
    ImageSource: string | null;
}

export interface Material {
    Id: string;
    MaterialName: string;
    Description: string | null;
    ImageSource: string | null;
}

export interface Designer {
    Id: string;
    DesignerName: string;
    Description: string | null;
    ImageSource: string | null;
}