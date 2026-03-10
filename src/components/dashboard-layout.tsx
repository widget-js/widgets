import { WindowControls } from '@widget-js/react'
import { useTranslation } from 'react-i18next'
import { Outlet, useMatches } from 'react-router-dom'
import { AppSidebar } from '@/components/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar'

export function DashboardLayout() {
  const { t } = useTranslation()
  const matches = useMatches()

  // Get title from the last match that has a handle with a title
  const currentMatch = matches.findLast(match => (match.handle as any)?.title)
  const titleKey = (currentMatch?.handle as any)?.title
  const title = titleKey ? t(titleKey) : t('dashboard.dashboard')

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        <header className="draggable-region flex h-[54px] shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>{title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <WindowControls />
        </header>
        <div className="flex flex-1 flex-col gap-4 pt-0 overflow-y-auto">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
