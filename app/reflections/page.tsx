'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { currentUser } from '@/utils/data/student';
import { EmployerReflectionsList } from './EmployerReflectionSection';
import { StudentReflectionSection } from './StudentReflectionSection';

export default function ReflectionsPage() {
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
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {currentUser.role === 'student' && <StudentReflectionSection />}
              <div className="px-4">
                {currentUser.role === 'employer' && <EmployerReflectionsList />}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
