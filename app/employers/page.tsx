'use client';

import * as React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { useGetAllEmployersQuery } from '@/store/actions/user';
import { LoaderIcon } from 'react-hot-toast';

export default function SchoolEmployersPage() {
  const { data, isLoading } = useGetAllEmployersQuery();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [fetchedEmployers, setFetchedEmployers] = React.useState<any[]>(
    data?.data,
  );
  React.useEffect(() => {
    if (data) setFetchedEmployers(data.data);
  }, [data]);

  const [search, setSearch] = React.useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedEmployer, setSelectedEmployer] = React.useState<any>(null);
  const isMobile = useIsMobile();

  const filteredEmployers = fetchedEmployers?.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoaderIcon />
      </div>
    );
  }

  if (!filteredEmployers) return;

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="space-y-6 px-4 lg:px-6 py-6">
          <div className="flex justify-between items-center">
            <Input
              placeholder="Search employers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {filteredEmployers?.map((emp) => (
              <Drawer
                key={emp.id}
                open={selectedEmployer?.id === emp.id}
                onOpenChange={(open) => setSelectedEmployer(open ? emp : null)}
                direction={isMobile ? 'bottom' : 'right'}
              >
                <DrawerTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle>{emp.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      <p>1 student(s)</p>
                      <p>{emp.contact}</p>
                    </CardContent>
                  </Card>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>{emp.name}</DrawerTitle>
                    <DrawerDescription>
                      Employer Details and Feedback Summary
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="px-4 py-2 text-sm space-y-4">
                    <div>
                      <Label>Email</Label>
                      <div>{emp.contact}</div>
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <div>{emp.phone}</div>
                    </div>
                    <div>
                      <Label>Students</Label>
                      <ul className="list-disc list-inside">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {emp.students?.map((student: any) => (
                          <li key={student}>{student}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <Label>Feedback Summary</Label>
                      <p className="text-muted-foreground">
                        {emp.feedbackSummary}
                      </p>
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
