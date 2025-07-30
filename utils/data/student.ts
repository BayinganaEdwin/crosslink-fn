export const currentUser = {
  id: 'stu_001',
  name: 'Aline Uwase',
  email: 'aline@student.university.rw',
  avatar: '',
  role: 'school' as 'student' | 'employer' | 'school',
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

// const studentReflections = [
//   {
//     id: 'ref_001',
//     student_id: 'stu_001',
//     week_number: 1,
//     content:
//       'I set up my local dev environment and read company documentation.',
//     created_at: '2025-06-08',
//   },
//   {
//     id: 'ref_002',
//     student_id: 'stu_001',
//     week_number: 2,
//     content:
//       'Worked on implementing login UI. Learned how to use component props.',
//     created_at: '2025-06-15',
//   },
//   {
//     id: 'ref_003',
//     student_id: 'stu_001',
//     week_number: 3,
//     content: 'Started using TailwindCSS for layout. Practiced flex and grid.',
//     created_at: '2025-06-22',
//   },
// ];
