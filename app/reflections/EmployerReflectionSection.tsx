'use client';

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  useGetAllReflectionsQuery,
  useUpdateReflectionMutation,
} from '@/store/actions/reflections';
import { LoaderIcon } from 'react-hot-toast';

export function EmployerReflectionsList() {
  const { data, isLoading: isLoadingReflections } = useGetAllReflectionsQuery();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [reflections, setReflections] = React.useState<any[]>(data?.data);
  const [updateReflection] = useUpdateReflectionMutation();

  React.useEffect(() => {
    if (data) setReflections(data?.data);
  }, [data]);

  const grouped = reflections?.reduce((acc, item) => {
    if (!acc[item.week]) acc[item.week] = [];
    acc[item.week].push(item);
    return acc;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {} as Record<number, any[]>);

  const handleCommentChange = (id: string, value: string) => {
    setReflections((prev) =>
      prev.map((r) => (r.id === id ? { ...r, employerComment: value } : r)),
    );
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmitComment = async (reflection: any) => {
    await updateReflection({
      body: {
        ...reflection,
        status: 'Reviewed',
        feedback: reflection.employerComment,
      },
      reflectionId: reflection.id,
    }).unwrap();
    setReflections((prev) =>
      prev.map((r) =>
        r.id === reflection.id && r.employerComment?.trim()
          ? { ...r, status: 'Reviewed', feedback: r.employerComment }
          : r,
      ),
    );
  };

  if (isLoadingReflections) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoaderIcon />
      </div>
    );
  }

  if (!isLoadingReflections && grouped && !Object.entries(grouped).length) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>No reflections yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {grouped &&
        Object.entries(grouped).map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ([week, weekReflections]: [week: any, weekReflectinos: any]) => (
            <div key={week} className="space-y-3">
              <h2 className="text-lg font-semibold">Week {week}</h2>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {weekReflections.map((reflection: any) => (
                <Card key={reflection.id}>
                  <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle className="text-base">
                      {reflection.student.name}
                    </CardTitle>
                    <Badge
                      variant={
                        reflection.status === 'Reviewed'
                          ? 'default'
                          : 'secondary'
                      }
                    >
                      {reflection.status === 'Reviewed'
                        ? 'Reviewed'
                        : 'Pending'}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Reflection</Label>
                      <p className="text-muted-foreground">
                        {reflection.content}
                      </p>
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
                        onClick={() => handleSubmitComment(reflection)}
                        variant="secondary"
                      >
                        {reflection.feedback
                          ? 'Update Comment'
                          : 'Submit Comment'}
                      </Button>
                    </div>

                    {reflection?.feedback && (
                      <div className="mt-6">
                        <Label className="font-bold">💬 Comment</Label>
                        <p className="text-muted-foreground">
                          {reflection.feedback || 'No comment yet'}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ),
        )}
    </div>
  );
}
