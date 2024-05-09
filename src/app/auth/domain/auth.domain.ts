export interface IUser {
  name: string;
  email: string;
  isLogged: boolean;
}

export interface User {
  uid: string;
  name: string;
}

export type typeStatus = "checking" | "authenticated" | "not-authenticated";