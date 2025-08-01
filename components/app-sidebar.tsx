'use client';

import * as React from 'react';
import { IconLink } from '@tabler/icons-react';
import { NavMain } from '@/components/nav-main';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { sidebarDataByRole } from '@/utils/data/sidebar';
import { usePathname } from 'next/navigation';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { role } = useLoggedInUser();
  const sidebarConfig = sidebarDataByRole[role];

  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <IconLink className="!size-7" />
                <span className="text-base font-semibold">
                  CrossLink{' '}
                  <span className="text-neutral-400 dark:text-neutral-500 text-sm">
                    ({role})
                  </span>
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="mt-4">
        <NavMain
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          items={sidebarConfig?.navMain.map((item: any) => ({
            ...item,
            isActive: pathname === item.url,
          }))}
        />
      </SidebarContent>
    </Sidebar>
  );
}
