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

export const sidebarDataByRole = {
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
