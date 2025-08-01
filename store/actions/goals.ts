import { baseAPI } from '../api';

const goalsEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createGoal: builder.mutation<any, any>({
      query: (body) => ({
        url: 'api/goals',
        method: 'POST',
        body,
      }),
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getAllGoals: builder.query<any, void>({
      query: () => ({
        url: 'api/goals',
        method: 'GET',
      }),
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateGoal: builder.mutation<any, any>({
      query: ({ body, goalId }) => ({
        url: `api/goals/${goalId}`,
        method: 'PATCH',
        body,
      }),
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deleteGoal: builder.mutation<any, any>({
      query: (goalId) => ({
        url: `api/goals/${goalId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateGoalMutation,
  useGetAllGoalsQuery,
  useUpdateGoalMutation,
  useDeleteGoalMutation,
} = goalsEndpoints;
