import { baseAPI } from '../api';

const reflectionsEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createReflection: builder.mutation<any, any>({
      query: (body) => ({
        url: 'api/reflections',
        method: 'POST',
        body,
      }),
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getAllReflections: builder.query<any, void>({
      query: () => ({
        url: 'api/reflections',
        method: 'GET',
      }),
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateReflection: builder.mutation<any, any>({
      query: ({ body, reflectionId }) => ({
        url: `api/reflections/${reflectionId}`,
        method: 'PATCH',
        body,
      }),
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deleteReflection: builder.mutation<any, any>({
      query: (reflectionId) => ({
        url: `api/reflections/${reflectionId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateReflectionMutation,
  useGetAllReflectionsQuery,
  useUpdateReflectionMutation,
  useDeleteReflectionMutation,
} = reflectionsEndpoints;
