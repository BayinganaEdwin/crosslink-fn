'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import * as React from 'react';

const students = [
  {
    id: 'stu_001',
    name: 'Aline Uwase',
    email: 'aline@student.university.rw',
    status: 'On Track',
    goalsCompleted: 3,
    reflections: 4,
    feedbackPending: 1,
  },
  {
    id: 'stu_002',
    name: 'John Mukasa',
    email: 'john@student.university.rw',
    status: 'Needs Attention',
    goalsCompleted: 1,
    reflections: 2,
    feedbackPending: 3,
  },
];

export default function SchoolStudentsPage() {
  const [search, setSearch] = React.useState('');

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-1 flex-col p-4 lg:p-6 gap-6">
      <Input
        placeholder="Search students..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {filtered.map((student, index) => (
          <Card
            className="cursor-pointer hover:shadow-md transition-shadow"
            key={`${student.id}-${index}`}
          >
            <CardHeader>
              <CardTitle>{student.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <div>{student.email}</div>
              <div>
                Status:{' '}
                <Badge
                  className={`${
                    student.status === 'On Track'
                      ? 'bg-green-600'
                      : 'bg-red-500'
                  }`}
                >
                  {student.status}
                </Badge>
              </div>
              <div>Goals Completed: {student.goalsCompleted}</div>
              <div>Reflections: {student.reflections}</div>
              <div>Pending Feedback: {student.feedbackPending}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
