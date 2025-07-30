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

import { currentUser } from '@/utils/data/student'; // should be dynamic

const sidebarConfig = sidebarDataByRole[currentUser.role];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const role = currentUser.role;
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
          items={sidebarConfig.navMain.map((item) => ({
            ...item,
            isActive: pathname === item.url,
          }))}
        />
      </SidebarContent>
    </Sidebar>
  );
}
