'use client';

import * as React from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import {
  IconChevronDown,
  IconChevronUp,
  IconEdit,
  IconPlus,
} from '@tabler/icons-react';
import { useIsMobile } from '@/hooks/use-mobile';

type Reflection = {
  id: number;
  week: string;
  content: string;
};

export function StudentReflectionSection() {
  const [reflections, setReflections] = React.useState<Reflection[]>([
    {
      id: 1,
      week: 'Week 1',
      content: 'Worked on onboarding and read through the codebase.',
    },
    {
      id: 2,
      week: 'Week 2',
      content: 'Implemented the login page and connected to backend auth.',
    },
  ]);

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [expandedId, setExpandedId] = React.useState<number | null>(null);
  const [editingReflection, setEditingReflection] =
    React.useState<Reflection | null>(null);
  const [form, setForm] = React.useState({ week: '', content: '' });

  function openNewReflection() {
    setForm({ week: '', content: '' });
    setEditingReflection(null);
    setDrawerOpen(true);
  }

  function openEdit(reflection: Reflection) {
    setEditingReflection(reflection);
    setForm({ week: reflection.week, content: reflection.content });
    setDrawerOpen(true);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editingReflection) {
      setReflections((prev) =>
        prev.map((r) =>
          r.id === editingReflection.id ? { ...r, ...form } : r,
        ),
      );
    } else {
      const newReflection: Reflection = {
        id: Date.now(),
        ...form,
      };
      setReflections((prev) => [...prev, newReflection]);
    }
    setDrawerOpen(false);
  }

  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center px-4 lg:px-6">
        <h2 className="text-lg font-semibold">Weekly Reflections</h2>
        <Drawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          direction={isMobile ? 'bottom' : 'right'}
        >
          <DrawerTrigger asChild>
            <Button variant="outline" size="sm" onClick={openNewReflection}>
              <IconPlus className="mr-2 size-4" />
              Add Reflection
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
                {editingReflection ? 'Edit Reflection' : 'New Reflection'}
              </DrawerTitle>
              <DrawerDescription>
                Write what you worked on this week.
              </DrawerDescription>
            </DrawerHeader>
            <form
              className="flex flex-col gap-4 px-4 text-sm"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-3">
                <Label htmlFor="week">Week</Label>
                <Input
                  id="week"
                  value={form.week}
                  onChange={handleChange}
                  placeholder="e.g. Week 3"
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="content">Reflection</Label>
                <Textarea
                  id="content"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="Describe what you did this week..."
                  required
                />
              </div>
              <DrawerFooter>
                <Button type="submit">
                  {editingReflection ? 'Update' : 'Create'}
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="flex flex-col gap-4 px-4 lg:px-6">
        {reflections.length === 0 ? (
          <div className="text-muted-foreground text-sm">
            No reflections added yet.
          </div>
        ) : (
          reflections
            .slice()
            .reverse()
            .map((reflection) => (
              <Card key={reflection.id} className="p-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    setExpandedId((id) =>
                      id === reflection.id ? null : reflection.id,
                    )
                  }
                >
                  <h3 className="text-md font-medium">{reflection.week}</h3>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEdit(reflection);
                      }}
                    >
                      <IconEdit className="size-4" />
                    </Button>
                    {expandedId === reflection.id ? (
                      <IconChevronUp className="size-4" />
                    ) : (
                      <IconChevronDown className="size-4" />
                    )}
                  </div>
                </div>
                {expandedId === reflection.id && (
                  <div className="mt-3 text-sm text-muted-foreground whitespace-pre-wrap">
                    {reflection.content}
                  </div>
                )}
              </Card>
            ))
        )}
      </div>
    </div>
  );
}
