import {
  LoginPayload,
  LoginResponse,
  SignupPayload,
  SignupResponse,
} from '@/utils/types/types';
import { baseAPI } from '../api';

const authEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (body) => ({
        url: 'api/auth/login',
        method: 'POST',
        body,
      }),
    }),
    signup: builder.mutation<SignupResponse, SignupPayload>({
      query: (body) => ({
        url: 'api/auth/signup',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authEndpoints;
