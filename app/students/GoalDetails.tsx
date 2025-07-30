'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useIsMobile } from '@/hooks/use-mobile';

type Goal = {
  id: number;
  studentName: string;
  title: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
};

export function GoalDetailsDrawer({
  goal,
  onClose,
}: {
  goal: Goal;
  onClose: () => void;
}) {
  const isMobile = useIsMobile();

  return (
    <Drawer
      open
      onOpenChange={(open) => !open && onClose()}
      direction={isMobile ? 'bottom' : 'right'}
    >
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{goal.title}</DrawerTitle>
          <DrawerDescription>Goal by {goal.studentName}</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 px-4 py-2 text-sm">
          <div className="flex flex-col gap-2">
            <Label>Status</Label>
            <span>{goal.status}</span>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <span>{goal.description}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Start Date</Label>
              <span>{goal.startDate}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Label>End Date</Label>
              <span>{goal.endDate}</span>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
