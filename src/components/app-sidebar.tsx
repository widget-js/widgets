'use client'

import {
  User,
} from 'lucide-react'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '@/assets/images/logo.png'
import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { useAppRuntimeInfo } from '@/hooks/use-app-runtime-info'
import { useUser } from '@/hooks/use-user'
import { routes } from '@/router'

interface RouteHandle {
  title: string
  icon?: any
  sidebarGroup?: boolean
  sidebarMenu?: boolean
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const { simpleInfo } = useAppRuntimeInfo()
  const { user, nickname, avatar } = useUser()

  const userData = {
    name: nickname,
    email: user?.email ?? '',
    avatar: user ? (avatar || logo) : undefined,
    icon: !user ? User : undefined,
  }

  const rootRoute = routes[0]

  const sidebarGroups = rootRoute.children
    ?.filter(route => (route.handle as RouteHandle | undefined)?.sidebarGroup)
    .map((route) => {
      const handle = route.handle as RouteHandle
      // Handle nested routes logic
      const groupPath = route.path === '/' ? '' : route.path || ''

      const items = route.children
        ?.filter(child => (child.handle as RouteHandle | undefined)?.sidebarMenu)
        .map((child) => {
          const childHandle = child.handle as RouteHandle
          // Handle child path: '/' as root of group
          const childPath = child.path === '/' ? '' : child.path || ''
          const url = `/${groupPath}${childPath ? `/${childPath}` : ''}`.replace(/\/+/g, '/')

          return {
            title: t(childHandle.title),
            url,
            icon: childHandle.icon,
            isActive: location.pathname === url,
          }
        }) || []

      return {
        label: t(handle.title),
        items,
      }
    }) || []

  return (
    <>
      <Sidebar collapsible="none" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                onClick={() => navigate('/settings/info')}
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <img src={logo} alt="Widget Hub" className="size-8" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{t('sidebar.widgetHub')}</span>
                  <span className="truncate text-xs">{(simpleInfo?.app as any)?.version ?? (simpleInfo?.app ? String(simpleInfo.app) : t('sidebar.loading'))}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          {sidebarGroups.map((group, index) => (
            <NavMain key={index} label={group.label} items={group.items} />
          ))}
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={userData} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  )
}
