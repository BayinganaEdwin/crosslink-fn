import { USER_DATA } from '../constants';

export const getLoggedInUser = () => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem(USER_DATA);
    if (userData) {
      return JSON.parse(userData);
    }
  }
  return null;
};

const loggedInUser = getLoggedInUser();

export const currentUser = loggedInUser || {
  id: 'stu_001',
  name: 'User',
  email: 'user@example.com',
  avatar: '',
  role: 'student' as 'student' | 'employer' | 'school',
};

export const studentGoals = [
  {
    id: 1,
    student_id: 'stu_001',
    title: 'Improve Frontend Development Skills',
    description:
      'Build a responsive UI using React and Tailwind CSS by the end of the internship.',
    startDate: '2025-06-01',
    endDate: '2025-08-30',
    status: 'In Progress',
  },
  {
    id: 2,
    student_id: 'stu_002',
    title: '...Improve Frontend Development Skills',
    description:
      'Build a responsive UI using React and Tailwind CSS by the end of the internship.',
    startDate: '2025-06-01',
    endDate: '2025-08-30',
    status: 'In Progress',
  },
  {
    id: 3,
    student_id: 'stu_003',
    title: '--- Improve Frontend Development Skills',
    description:
      'Build a responsive UI using React and Tailwind CSS by the end of the internship.',
    startDate: '2025-06-01',
    endDate: '2025-08-30',
    status: 'Done',
  },
];

export const sampleGoals = [
  {
    id: '1',
    student_id: 'stu1',
    student_name: 'Jane Doe',
    title: 'Improve communication skills',
    description: 'Work on public speaking and feedback skills.',
    status: 'In Progress',
    start_date: '2025-01-01',
    end_date: '2025-03-01',
    comment: '',
    previousComments: [],
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: '2',
    student_id: 'stu2',
    student_name: 'Mucyo Prince',
    title: 'Improve communication skills',
    description: 'Work on public speaking and feedback skills.',
    status: 'In Progress',
    start_date: '2025-01-01',
    end_date: '2025-03-01',
    comment: '',
    previousComments: [],
    created_at: '2025-01-01T00:00:00Z',
  },
];
