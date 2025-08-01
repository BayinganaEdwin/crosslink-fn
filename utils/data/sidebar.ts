import {
  IconBuildingSkyscraper,
  IconDashboard,
  IconFileDescription,
  IconFileWord,
  IconListDetails,
  IconReport,
  IconReportAnalytics,
  IconUsers,
} from '@tabler/icons-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sidebarDataByRole: any = {
  student: {
    navMain: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: IconDashboard,
      },
      {
        title: 'Reflections',
        url: '/reflections',
        icon: IconFileDescription,
      },
    ],
    documents: [],
  },
  employer: {
    navMain: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: IconDashboard,
      },
      {
        title: 'Students',
        url: '/students',
        icon: IconUsers,
      },
      {
        title: 'Reflections',
        url: '/reflections',
        icon: IconFileWord,
      },
    ],
    documents: [],
  },
  school: {
    navMain: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: IconDashboard,
      },
      {
        title: 'Students',
        url: '/students',
        icon: IconUsers,
      },
      {
        title: 'Employers',
        url: '/employers',
        icon: IconBuildingSkyscraper,
      },
      {
        title: 'Reports',
        url: '/reports',
        icon: IconReportAnalytics,
      },
    ],
    documents: [],
  },
};
