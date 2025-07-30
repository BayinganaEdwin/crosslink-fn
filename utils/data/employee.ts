const employerUser = {
  id: 'emp_001',
  name: 'Eric Mugisha',
  email: 'eric@techcompany.rw',
  role: 'employer',
};

const employerAssignments = [
  {
    id: 'assign_001',
    student_id: 'stu_001',
    employer_id: 'emp_001',
    assigned_at: '2025-06-01',
    student_name: 'Aline Uwase',
  },
];

const employerFeedback = [
  {
    id: 'fb_001',
    assignment_id: 'assign_001',
    week_number: 1,
    rating: 4,
    comment: 'Aline is proactive and quick to ask questions when stuck.',
    created_at: '2025-06-08',
  },
  {
    id: 'fb_002',
    assignment_id: 'assign_001',
    week_number: 2,
    rating: 5,
    comment: 'Excellent improvement in UI design. Very clean code.',
    created_at: '2025-06-15',
  },
];
