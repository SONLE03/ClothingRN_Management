export interface Branch {
    id: string;
    name: string;
    
}
export interface Gender {
    id: string;
    name: string;
    
}
export interface Category {
    id: string;
    name: string;
    productGender: Gender;
}