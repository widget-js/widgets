import type { RouteObject } from 'react-router-dom'
import {
  Bot,
  Globe,
  Package,
  Palette,
  Plus,
  Settings,
} from 'lucide-react'
import { createHashRouter, Navigate } from 'react-router-dom'
import { DashboardLayout } from '@/components/dashboard-layout'
import AddWidgetPage from '@/pages/add/add-widget-page'
import AiPage from '@/pages/ai/ai-page'
import WidgetPackageManagerPage from '@/pages/packages/widget-package-manager-page'
import AppInfoPage from '@/pages/settings/app-info-page'
import GeneralPage from '@/pages/settings/general-page'
import ProxyPage from '@/pages/settings/proxy-page'
import ThemePage from '@/pages/settings/theme-page'
import TrayPage from '@/pages/tray/tray-page'
import ProfilePage from '@/pages/user/profile-page'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/widget/search" replace />,
      },
      {
        path: 'widget',
        handle: {
          title: 'sidebar.widgetManagement',
          sidebarGroup: true,
        },
        children: [
          {
            index: true,
            path: 'search',
            element: <AddWidgetPage />,
            handle: {
              title: 'sidebar.addWidget',
              icon: Plus,
              sidebarMenu: true,
            },
          },
          {
            path: 'package',
            element: <WidgetPackageManagerPage />,
            handle: {
              title: 'sidebar.packageManagement',
              icon: Package,
              sidebarMenu: true,
            },
          },
        ],
      },
      {
        path: 'setting',
        handle: {
          title: 'sidebar.generalSettings',
          sidebarGroup: true,
        },
        children: [
          {
            path: 'common',
            element: <GeneralPage />,
            handle: {
              title: 'sidebar.generalSettings',
              icon: Settings,
              sidebarMenu: true,
            },
          },
          {
            path: 'theme',
            element: <ThemePage />,
            handle: {
              title: 'sidebar.globalTheme',
              icon: Palette,
              sidebarMenu: true,
            },
          },
          {
            path: 'ai',
            element: <AiPage />,
            handle: {
              title: 'sidebar.ai',
              icon: Bot,
              sidebarMenu: true,
            },
          },
          {
            path: 'proxy',
            element: <ProxyPage />,
            handle: {
              title: 'sidebar.proxySettings',
              icon: Globe,
              group: 'settings',
              sidebarMenu: true,
            },
          },
          {
            path: 'info',
            element: <AppInfoPage />,
            handle: {
              title: 'appInfo.title',
            },
          },
        ],
      },
      {
        path: 'user/profile',
        element: <ProfilePage />,
        handle: { title: 'user.account' },
      },
    ],
  },
  {
    path: '/tray/menu',
    element: <TrayPage />,
  },
]

export const router = createHashRouter(routes)
