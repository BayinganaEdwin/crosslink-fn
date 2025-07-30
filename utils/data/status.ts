export const status = {
  goalSubmitted: true, // true
  currentWeek: 4, // assume we're in week 4
  lastReflectionWeek: 3,
  employerFeedbackWeek: 2,

  reflectionMissing: 3 < 4, // true → student hasn't submitted week 4
  awaitingFeedback: 3 > 2, // true → no employer feedback for latest reflection
};
