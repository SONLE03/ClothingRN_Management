export interface UserProps {
  createdAt: string;
  Id: string;
  FullName: string;
  Email: string;
  DateOfBirth: string;
  PhoneNumber: string | null;
  ImageSource: string | null;
  Role: string;
  IsDeleted: boolean;
  IsLocked: boolean;
}
export interface UserPropsDetail {
  createdAt: string;
  Id: string;
  FullName: string;
  Email: string;
  DateOfBirth: string;
  PhoneNumber: string | null;
  ImageSource: string | null;
  Role: string;
  IsDeleted: boolean;
  IsLocked: boolean;
}
