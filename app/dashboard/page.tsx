import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import StudentDashboard from './StudentDashboard';
import { currentUser } from '@/utils/data/student';
import EmployerDashboard from './EmployerDashboard';
import SchoolDashboard from './SchoolDashboard';

export default function Page() {
  console.log('currentUser?.role', currentUser.role);
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

      {currentUser?.role === 'student' && <StudentDashboard />}
      {currentUser.role === 'employer' && <EmployerDashboard />}
      {currentUser.role === 'school' && <SchoolDashboard />}
    </SidebarProvider>
  );
}
