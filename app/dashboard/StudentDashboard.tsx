import { DataTable } from '@/components/data-table';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset } from '@/components/ui/sidebar';
import { studentGoals } from '@/utils/data/student';
import React from 'react';

const StudentDashboard = () => {
  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6"></div>
            <DataTable data={studentGoals} />
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};

export default StudentDashboard;
