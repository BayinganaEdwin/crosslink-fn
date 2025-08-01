import { baseAPI } from '../api';

const userEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getDashboardStats: builder.query<any, void>({
      query: () => ({
        url: 'api/school/dashboard-stats',
        method: 'GET',
      }),
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getDashboardActivities: builder.query<any, void>({
      query: () => ({
        url: 'api/school/dashboard-activities',
        method: 'GET',
      }),
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getDashboardStudents: builder.query<any, void>({
      query: () => ({
        url: 'api/school/dashboard-students',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetDashboardActivitiesQuery,
  useGetDashboardStudentsQuery,
} = userEndpoints;
