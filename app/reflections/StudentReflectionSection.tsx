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
import {
  useCreateReflectionMutation,
  useGetAllReflectionsQuery,
  useUpdateReflectionMutation,
} from '@/store/actions/reflections';
import { LoaderIcon } from 'react-hot-toast';
import { currentUser } from '@/utils/data/student';

type Reflection = {
  id: number;
  week: number;
  content: string;
};

export function StudentReflectionSection() {
  const { data, isLoading: isLoadingReflections } = useGetAllReflectionsQuery();
  const [reflections, setReflections] = React.useState<Reflection[]>(
    data?.data,
  );

  React.useEffect(() => {
    if (data) setReflections(data?.data);
  }, [data]);

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [expandedId, setExpandedId] = React.useState<number | null>(null);
  const [editingReflection, setEditingReflection] =
    React.useState<Reflection | null>(null);
  const [form, setForm] = React.useState({ week: 1, content: '' });
  const [createReflection, { isLoading }] = useCreateReflectionMutation();
  const [updateReflection, { isLoading: isUpdating }] =
    useUpdateReflectionMutation();

  function openNewReflection() {
    setForm({ week: 1, content: '' });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingReflection) {
      const editPayload = {
        week: Number(editingReflection.week),
        content: editingReflection.content,
      };
      await updateReflection({
        body: editPayload,
        reflectionId: editingReflection.id,
      }).unwrap();
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
      const payload = {
        week: Number(newReflection.week),
        content: newReflection.content,
      };
      await createReflection(payload).unwrap();
      setReflections((prev) => [...prev, newReflection]);
    }
    setDrawerOpen(false);
  };

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
                  placeholder="e.g. 3"
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
                <Button type="submit" disabled={isLoading || isUpdating}>
                  {isLoading || isUpdating ? (
                    <LoaderIcon />
                  ) : editingReflection ? (
                    'Update'
                  ) : (
                    'Create'
                  )}
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
        {isLoadingReflections ? (
          <div className="flex justify-center">
            <LoaderIcon className="size-6 animate-spin" />
          </div>
        ) : reflections?.length === 0 ? (
          <div className="text-muted-foreground text-sm">
            No reflections added yet.
          </div>
        ) : (
          reflections
            ?.slice()
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
                  <h3 className="text-md font-medium">
                    Week {reflection.week}
                  </h3>
                  <div className="flex items-center gap-2">
                    {currentUser.role === 'employer' && (
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
                    )}
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
