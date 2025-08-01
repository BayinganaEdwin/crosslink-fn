import { GenericResponse } from './global';

// User Roles
export type UserRole = 'student' | 'employer' | 'school';

export type LoginResponse = GenericResponse<{
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
  token: string;
}>;
export type SignupResponse = GenericResponse<{
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
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

// Base User
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Student-Specific
export interface Student extends User {
  role: 'student';
}

// Employer-Specific
export interface Employer extends User {
  role: 'employer';
}

// School-Specific
export interface School extends User {
  role: 'school';
}

// Internship Goal
export interface Goal {
  id: string;
  student_id: string;
  student_name: string;
  status: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  created_at: string;
  comment?: string;
  previousComments?: string[];
}

// Weekly Reflection
export type Reflection = {
  id: string;
  studentId: string;
  studentName: string;
  week: number;
  content: string;
  status: 'Pending' | 'Reviewed';
  employerComment?: string;
};

// Student → Employer Assignment
export interface Assignment {
  id: string;
  student_id: string;
  employer_id: string;
  assigned_at: string;
  student_name?: string;
}

// Employer Feedback
export interface Feedback {
  id: string;
  assignment_id: string;
  week_number: number;
  rating: number; // 1 to 5
  comment: string;
  created_at: string; // ISO date
}

// Combined student summary
export interface StudentSummary {
  student: {
    id: string;
    name: string;
    email: string;
  };
  goal: Goal | null;
  reflections: Reflection[];
  feedback: Feedback[];
}

// Status Indicators
export interface InternshipStatus {
  goalSubmitted: boolean;
  currentWeek: number;
  lastReflectionWeek: number;
  employerFeedbackWeek: number;
  reflectionMissing: boolean;
  awaitingFeedback: boolean;
}
