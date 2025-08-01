'use client';

import { SidebarInset } from '@/components/ui/sidebar';
import { SiteHeader } from '@/components/site-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  IconUsers,
  IconTargetArrow,
  IconReportAnalytics,
  IconEdit,
  IconMessageCircle,
  IconCalendarEvent,
} from '@tabler/icons-react';
import {
  useGetDashboardActivitiesQuery,
  useGetDashboardStatsQuery,
} from '@/store/actions/school';
import { JSX } from 'react';

const iconMap: Record<string, JSX.Element> = {
  'Goal Completed': <IconTargetArrow className="size-4 text-primary" />,
  'New Goal': <IconEdit className="size-4 text-blue-500" />,
  Comment: <IconMessageCircle className="size-4 text-green-600" />,
  Reflection: <IconCalendarEvent className="size-4 text-purple-600" />,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RecentFeedbackCard = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Goal Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {data?.map((item: any, index: number) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex items-center justify-center bg-muted rounded-full p-2">
              {iconMap[item.type] ?? (
                <IconEdit className="size-4 text-muted-foreground" />
              )}
            </div>
            <div className="flex flex-col text-sm">
              <span className="font-medium">{item.message}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(item.time).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default function SchoolDashboard() {
  const { data: dashboardStats } = useGetDashboardStatsQuery();
  const { data: dashboardActivities } = useGetDashboardActivitiesQuery();
  const stats = [
    {
      title: 'Students Placed',
      value: String(dashboardStats?.studentsPlaced || 0),
      icon: <IconUsers className="size-5 text-muted-foreground" />,
    },
    {
      title: 'Goals Completed',
      value: `${dashboardStats?.goalsCompletedPercentage || 0}%`,
      icon: <IconTargetArrow className="size-5 text-muted-foreground" />,
    },
    {
      title: 'Pending Feedback',
      value: String(dashboardStats?.pendingFeedback || 0),
      icon: <IconReportAnalytics className="size-5 text-muted-foreground" />,
    },
  ];

  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col gap-6 px-4 py-6 lg:px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="my-4" />

        <RecentFeedbackCard data={dashboardActivities} />
      </div>
    </SidebarInset>
  );
}
