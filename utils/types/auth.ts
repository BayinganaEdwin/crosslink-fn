import { GenericResponse } from './global';

export type AuthResponse = GenericResponse<{
  user: {
    id: string;
    name: string;
    email: string;
    phone: string | number;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
}>;

export type LoginPayload = {
  email: string;
  password: string;
};

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
};
