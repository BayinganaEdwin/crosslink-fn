'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import * as React from 'react';
import { useGetDashboardStudentsQuery } from '@/store/actions/school';
import { LoaderIcon } from 'react-hot-toast';

export default function SchoolStudentsPage() {
  const { data, isLoading } = useGetDashboardStudentsQuery();
  const [search, setSearch] = React.useState('');
  const [students, setStudents] = React.useState(data);

  React.useEffect(() => {
    if (data) setStudents(data);
  }, [data]);

  const filtered = students?.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (s: any) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoaderIcon />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col p-4 lg:p-6 gap-6">
      <Input
        placeholder="Search students..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {filtered &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          filtered?.map((student: any, index: number) => (
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
                <div>Pending Feedback: {student.pendingFeedback}</div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
