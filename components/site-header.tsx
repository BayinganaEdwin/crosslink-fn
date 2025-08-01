'use client';

import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ThemeSelector } from './theme-selector';
import { ModeSwitcher } from './mode-switcher';
import { NavUser } from './nav-user';
import { usePathname } from 'next/navigation';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';

export function SiteHeader() {
  const pathname = usePathname();
  const formattedPathname = pathname?.split('/')[1] || '';

  const { user: currentUser } = useLoggedInUser();

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium capitalize">
          {formattedPathname}
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <ThemeSelector />
          <ModeSwitcher />
          <NavUser user={currentUser} />
        </div>
      </div>
    </header>
  );
}
