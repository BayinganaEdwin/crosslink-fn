'use client';

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Reflection = {
  id: string;
  studentId: string;
  studentName: string;
  week: number;
  content: string;
  status: 'Pending' | 'Reviewed';
  employerComment?: string;
};

const mockReflections: Reflection[] = [
  {
    id: 'r1',
    studentId: 'stu_001',
    studentName: 'Aline Uwase',
    week: 1,
    content: 'This week, I learned how to build reusable components in React.',
    status: 'Pending',
  },
  {
    id: 'r2',
    studentId: 'stu_002',
    studentName: 'John Mukasa',
    week: 1,
    content: 'Worked on integrating API calls for project tracking.',
    status: 'Reviewed',
    employerComment: 'Great initiative and progress!',
  },
  {
    id: 'r3',
    studentId: 'stu_001',
    studentName: 'Aline Uwase',
    week: 2,
    content: 'Improved my CSS and responsive layout skills.',
    status: 'Reviewed',
    employerComment: 'Good job. Keep improving the design consistency.',
  },
];

export function EmployerReflectionsList() {
  const [reflections, setReflections] =
    React.useState<Reflection[]>(mockReflections);

  const grouped = reflections.reduce((acc, item) => {
    if (!acc[item.week]) acc[item.week] = [];
    acc[item.week].push(item);
    return acc;
  }, {} as Record<number, Reflection[]>);

  const handleCommentChange = (id: string, value: string) => {
    setReflections((prev) =>
      prev.map((r) => (r.id === id ? { ...r, employerComment: value } : r)),
    );
  };

  const handleSubmitComment = (id: string) => {
    setReflections((prev) =>
      prev.map((r) =>
        r.id === id && r.employerComment?.trim()
          ? { ...r, status: 'Reviewed' }
          : r,
      ),
    );
  };

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([week, weekReflections]) => (
        <div key={week} className="space-y-3">
          <h2 className="text-lg font-semibold">Week {week}</h2>
          {weekReflections.map((reflection) => (
            <Card key={reflection.id}>
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="text-base">
                  {reflection.studentName}
                </CardTitle>
                <Badge
                  variant={
                    reflection.status === 'Reviewed' ? 'default' : 'secondary'
                  }
                >
                  {reflection.status}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Reflection</Label>
                  <p className="text-muted-foreground">{reflection.content}</p>
                </div>

                <div className="space-y-2">
                  <Label>Employer Comment</Label>
                  <Input
                    value={reflection.employerComment || ''}
                    onChange={(e) =>
                      handleCommentChange(reflection.id, e.target.value)
                    }
                    placeholder="Write your comment..."
                  />
                  <Button
                    size="sm"
                    onClick={() => handleSubmitComment(reflection.id)}
                    variant="secondary"
                  >
                    Submit Comment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}
