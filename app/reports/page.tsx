'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';

const goalReports = [
  {
    week: 'Week 1',
    completed: 12,
    pending: 3,
  },
  {
    week: 'Week 2',
    completed: 15,
    pending: 1,
  },
  {
    week: 'Week 3',
    completed: 9,
    pending: 4,
  },
];

const feedbackLogs = [
  {
    date: '2025-07-01',
    student: 'Aline Uwase',
    comment: 'Great progress on UI tasks.',
  },
  {
    date: '2025-07-02',
    student: 'Moise Hakizimana',
    comment: 'Needs to improve consistency.',
  },
  {
    date: '2025-07-03',
    student: 'John Mukasa',
    comment: 'Excellent technical documentation.',
  },
];

export default function SchoolReportsPage() {
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
        <div className="flex flex-col gap-6 p-4 lg:p-6">
          <Tabs defaultValue="goals" className="w-full">
            <TabsList>
              <TabsTrigger value="goals">Goal Completion</TabsTrigger>
              <TabsTrigger value="activity">Weekly Activity</TabsTrigger>
              <TabsTrigger value="feedback">Feedback Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="goals" className="grid gap-4">
              {goalReports.map((report) => (
                <Card key={report.week}>
                  <CardHeader>
                    <CardTitle>{report.week}</CardTitle>
                    <CardDescription>Goal progress</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <div>
                      <Label>Completed</Label>
                      <div className="font-medium text-green-600">
                        {report.completed}
                      </div>
                    </div>
                    <div>
                      <Label>Pending</Label>
                      <div className="font-medium text-red-500">
                        {report.pending}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Activity Summary</CardTitle>
                  <CardDescription>
                    Summary of goal updates and submissions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <ul className="list-disc pl-5">
                    <li>18 goals submitted this week</li>
                    <li>6 goals marked as completed</li>
                    <li>12 feedback comments provided</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="feedback" className="grid gap-4">
              {feedbackLogs.map((log, i) => (
                <Card key={i}>
                  <CardHeader className="flex items-center justify-between">
                    <CardTitle>{log.student}</CardTitle>
                    <Badge variant="outline">{log.date}</Badge>
                  </CardHeader>
                  <CardContent>{log.comment}</CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
