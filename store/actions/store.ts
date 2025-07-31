import { GenericResponse, Params } from '@/utils/types/global';
import { baseAPI } from '../api';

const storeApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getStores: builder.query<GenericResponse<void>, { params?: Params }>({
      query: ({ params }) => ({
        url: 'store',
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const { useGetStoresQuery } = storeApi;
