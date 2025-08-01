import { baseAPI } from '../api';

const reflectionsEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    createReflection: builder.mutation<any, any>({
      query: (body) => ({
        url: 'api/reflections',
        method: 'POST',
        body,
      }),
    }),
    getAllReflections: builder.query<any, void>({
      query: () => ({
        url: 'api/reflections',
        method: 'GET',
      }),
    }),
    updateReflection: builder.mutation<any, any>({
      query: ({ body, reflectionId }) => ({
        url: `api/reflections/${reflectionId}`,
        method: 'PATCH',
        body,
      }),
    }),
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
