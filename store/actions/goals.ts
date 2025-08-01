import { baseAPI } from '../api';

const goalsEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    createGoal: builder.mutation<any, any>({
      query: (body) => ({
        url: 'api/goals',
        method: 'POST',
        body,
      }),
    }),
    getAllGoals: builder.query<any, void>({
      query: () => ({
        url: 'api/goals',
        method: 'GET',
      }),
    }),
    updateGoal: builder.mutation<any, any>({
      query: ({ body, goalId }) => ({
        url: `api/goals/${goalId}`,
        method: 'PATCH',
        body,
      }),
    }),
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
