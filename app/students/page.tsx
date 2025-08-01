'use client';

import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset } from '@/components/ui/sidebar';
import { EmployerGoalsTable } from './EmployerGoalsTable';
import SchoolStudentsPage from './SchoolStudentsList';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';

export default function EmployerGoalsPage() {
  const { user: currentUser } = useLoggedInUser();
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
        <div className="flex flex-1 flex-col p-6">
          {currentUser?.role === 'employer' && <EmployerGoalsTable />}
          {currentUser?.role === 'school' && <SchoolStudentsPage />}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
