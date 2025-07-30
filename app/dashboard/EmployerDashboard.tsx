import { SiteHeader } from '@/components/site-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarInset } from '@/components/ui/sidebar';
import React from 'react';
import {
  IconClipboardText,
  IconMessage,
  IconCalendarEvent,
  IconCheck,
} from '@tabler/icons-react';

const activityItems = [
  {
    icon: <IconClipboardText className="text-blue-600 size-4" />,
    label: 'John Mukasa submitted a new goal',
    timestamp: '2 hours ago',
  },
  {
    icon: <IconCheck className="text-green-600 size-4" />,
    label: 'Aline Uwase completed a goal',
    timestamp: '4 hours ago',
  },
  {
    icon: <IconMessage className="text-purple-600 size-4" />,
    label: 'Feedback left for Sarah Imanzi',
    timestamp: '1 day ago',
  },
  {
    icon: <IconCalendarEvent className="text-yellow-600 size-4" />,
    label: 'New reflection added by Moise Hakizimana',
    timestamp: '3 days ago',
  },
];

export function RecentGoalActivityCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Goal Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activityItems.map((item, index) => (
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

function EmployerDashboard() {
  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Total Interns</CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-2xl font-semibold">12</span>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-2xl font-semibold">34</span>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pending Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-2xl font-semibold">6</span>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity Feed */}
            <div className="mt-4">
              <RecentGoalActivityCard />
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}

export default EmployerDashboard;
