'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { Goal } from '@/utils/types/types';
import {
  useGetAllGoalsQuery,
  useUpdateGoalMutation,
} from '@/store/actions/goals';
import toast, { LoaderIcon } from 'react-hot-toast';

export function EmployerGoalsTable() {
  const [filter, setFilter] = React.useState<string>('');
  const [selectedGoal, setSelectedGoal] = React.useState<Goal | null>(null);
  const { data, isLoading } = useGetAllGoalsQuery();
  const [updateGoal, { isLoading: isUpdating }] = useUpdateGoalMutation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [goals, setGoals] = React.useState<any[]>(data?.data || []);

  React.useEffect(() => {
    if (data?.data) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const initialGoals = data.data.map((goal: any) => ({
        ...goal,
        comment: goal.comment || '',
      }));
      setGoals(initialGoals);
    }
  }, [data]);

  const filtered = goals.filter(
    (goal) =>
      goal.student_name?.toLowerCase().includes(filter.toLowerCase()) ||
      goal.title?.toLowerCase().includes(filter.toLowerCase()),
  );

  const handleCommentChange = (value: string) => {
    if (selectedGoal) {
      setGoals((prev) =>
        prev.map((g) =>
          g.id === selectedGoal.id ? { ...g, comment: value } : g,
        ),
      );
    }
  };

  const handleCommentSubmit = async (goalId: string) => {
    const goalToUpdate = goals.find((g) => g.id === goalId);
    if (goalToUpdate && goalToUpdate.comment?.trim()) {
      await updateGoal({
        body: { comment: goalToUpdate.comment },
        goalId: goalToUpdate.id,
      }).unwrap();

      toast.success('Comment saved!');
    }
  };

  const isMobile = useIsMobile();

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search by student or goal title..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="max-w-sm"
      />
      {isLoading ? (
        <div className="flex justify-center p-10">
          <LoaderIcon />
        </div>
      ) : (
        <div className="overflow-auto border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Goal Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start</TableHead>
                <TableHead>End</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((goal) => (
                <TableRow key={goal.id}>
                  <TableCell>{goal.User.name}</TableCell>
                  <TableCell>{goal.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{goal.status}</Badge>
                  </TableCell>
                  <TableCell>{goal.startDate}</TableCell>
                  <TableCell>{goal.endDate}</TableCell>
                  <TableCell>
                    <Drawer
                      open={selectedGoal?.id === goal.id}
                      onOpenChange={(open) =>
                        setSelectedGoal(open ? goal : null)
                      }
                      direction={isMobile ? 'bottom' : 'right'}
                    >
                      <DrawerTrigger asChild>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent>
                        <DrawerHeader>
                          <DrawerTitle>{goal.title}</DrawerTitle>
                          <DrawerDescription>
                            Goal details and comment
                          </DrawerDescription>
                        </DrawerHeader>
                        <div className="px-4 py-2 space-y-4 text-sm">
                          <div>
                            <Label>Status</Label>
                            <div>{goal.status}</div>
                          </div>
                          <div>
                            <Label>Start Date</Label>
                            <div>{goal.start_date}</div>
                          </div>
                          <div>
                            <Label>End Date</Label>
                            <div>{goal.end_date}</div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="new-comment">
                                Leave a Comment
                              </Label>
                              <Input
                                id="new-comment"
                                value={goal.comment || ''}
                                onChange={(e) =>
                                  handleCommentChange(e.target.value)
                                }
                                placeholder="Write your feedback..."
                                className="my-2"
                              />
                              <Button
                                size="sm"
                                className="mt-2"
                                onClick={() => handleCommentSubmit(goal.id)}
                                disabled={isUpdating}
                              >
                                {isUpdating ? 'Loading...' : 'Submit Comment'}
                              </Button>
                            </div>

                            {goal.comment ? (
                              <div className="space-y-1 mt-5">
                                <Label>Comments</Label>
                                <ul className="text-muted-foreground text-sm list-disc list-inside">
                                  {goal.comment}
                                </ul>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </DrawerContent>
                    </Drawer>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
