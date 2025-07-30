'use client';

import { SidebarInset } from '@/components/ui/sidebar';
import { SiteHeader } from '@/components/site-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  IconUsers,
  IconTargetArrow,
  IconReportAnalytics,
  IconCheck,
  IconMessage,
  IconClock12,
} from '@tabler/icons-react';

const feedbackItems = [
  {
    icon: <IconCheck className="text-blue-600 size-4" />,
    label: `Employer reviewed John Mukasa's goals`,
    timestamp: '2 hours ago',
  },
  {
    icon: <IconMessage className="text-green-600 size-4" />,
    label: `New comment on Aline Uwase's reflection`,
    timestamp: '4 hours ago',
  },
  {
    icon: <IconClock12 className="text-purple-600 size-4" />,
    label: 'Weekly update submitted by Sarah Imanzi',
    timestamp: '1 day ago',
  },
];

export function RecentFeedbackCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Goal Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {feedbackItems.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex items-center justify-center bg-muted rounded-full p-2">
              {item.icon}
            </div>
            <div className="flex flex-col text-sm">
              <span className="font-medium">{item.label}</span>
              <span className="text-xs text-muted-foreground">
                {item.timestamp}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default function SchoolDashboard() {
  const stats = [
    {
      title: 'Students Placed',
      value: '42',
      icon: <IconUsers className="size-5 text-muted-foreground" />,
    },
    {
      title: 'Goals Completed',
      value: '78%',
      icon: <IconTargetArrow className="size-5 text-muted-foreground" />,
    },
    {
      title: 'Pending Feedback',
      value: '12',
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

        <RecentFeedbackCard />
      </div>
    </SidebarInset>
  );
}
