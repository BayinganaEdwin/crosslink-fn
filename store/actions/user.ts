import { baseAPI } from '../api';

const userEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getAllStudents: builder.query<any, void>({
      query: () => ({
        url: 'api/students',
        method: 'GET',
      }),
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getAllEmployers: builder.query<any, void>({
      query: () => ({
        url: 'api/employers',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllStudentsQuery, useGetAllEmployersQuery } =
  userEndpoints;
