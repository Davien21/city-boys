export interface ISearchableListItem {
  name: string;
  [key: string]: any;
}

export interface Invoice {
  id?: string;
  name: string;
  amount: number;
  date: string;
  status: "Paid" | "Unpaid";
}

export interface IDogDetails {
  _id: string;
  tags: string[]
  location: string;
  description: string;
  name: string;
  breed: string;
  lineage: string;
  gender: string;
  dob: string;
  price: number;
  priceUnit: string;
  breederName: string;
  dogImage: string;
  breederImage: string;
  isFeatured?: boolean;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ISignup {
  email: string;
  password: string;
  otp: string;
}

export interface IAPIResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export type IComponentState = "idle" | "loading" | "success" | "error";

export interface ILoginResponse {
  jwt: string;
  user: { email: string };
}

export type IPlanType =
  | "dog-lover"
  | "passionate-breeder"
  | "expert-breeder"
  | null;
