export interface User {
  uid: string;
  name: string;
}

export type typeStatus = "checking" | "authenticated" | "not-authenticated";

export interface AuthState {
  status: typeStatus;
  user: User;
  errorMessage: string | null;
}

// Parameters
export interface LoginData {
  email: string;
  password: string;
}
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Responses
export interface LoginResponse {
  data: {
    uid: string;
    name: string;
    token: string;
  };
  ok: boolean;
}

export interface RenewTokenResponse {
  data: {
    uid: string;
    name: string;
    token: string;
  };
  ok: boolean;
}

export interface RegisterResponse {
  data: {
    uid: string;
    name: string;
    token: string;
  };
  ok: boolean;
}