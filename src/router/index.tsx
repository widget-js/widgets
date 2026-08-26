import type { RouteObject } from 'react-router-dom'
import {
  Bot,
  Code2,
  Globe,
  Package,
  Palette,
  Plus,
  Settings,
} from 'lucide-react'
import { lazy, Suspense } from 'react'
import { createHashRouter, Navigate } from 'react-router-dom'
import { DashboardLayout } from '@/components/dashboard-layout'
import AddWidgetPage from '@/pages/add/add-widget-page'

const AiPage = lazy(() => import('@/pages/ai/ai-page'))
const AlertDialogPage = lazy(() => import('@/pages/dialog/alert-dialog-page'))
const DevPage = lazy(() => import('@/pages/dev/dev-page'))
const ErrorPage = lazy(() => import('@/pages/error-page'))
const WidgetPackageManagerPage = lazy(() => import('@/pages/packages/widget-package-manager-page'))
const AppInfoPage = lazy(() => import('@/pages/settings/app-info-page'))
const GeneralPage = lazy(() => import('@/pages/settings/general-page'))
const ProxyPage = lazy(() => import('@/pages/settings/proxy-page'))
const ThemePage = lazy(() => import('@/pages/settings/theme-page'))
const SizePage = lazy(() => import('@/pages/size/size-page'))
const TrayPage = lazy(() => import('@/pages/tray/tray-page'))
const ProfilePage = lazy(() => import('@/pages/user/profile-page'))

function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={null}>{element}</Suspense>
}

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <DashboardLayout />,
    errorElement: withSuspense(<ErrorPage />),
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
            element: withSuspense(<WidgetPackageManagerPage />),
            handle: {
              title: 'sidebar.packageManagement',
              icon: Package,
              sidebarMenu: true,
            },
          },
          {
            path: 'dev',
            element: withSuspense(<DevPage />),
            handle: {
              title: 'sidebar.dev',
              icon: Code2,
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
            element: withSuspense(<GeneralPage />),
            handle: {
              title: 'sidebar.generalSettings',
              icon: Settings,
              sidebarMenu: true,
            },
          },
          {
            path: 'theme',
            element: withSuspense(<ThemePage />),
            handle: {
              title: 'sidebar.globalTheme',
              icon: Palette,
              sidebarMenu: true,
            },
          },
          {
            path: 'ai',
            element: withSuspense(<AiPage />),
            handle: {
              title: 'sidebar.ai',
              icon: Bot,
              sidebarMenu: true,
            },
          },
          {
            path: 'proxy',
            element: withSuspense(<ProxyPage />),
            handle: {
              title: 'sidebar.proxySettings',
              icon: Globe,
              group: 'settings',
              sidebarMenu: true,
            },
          },
          {
            path: 'info',
            element: withSuspense(<AppInfoPage />),
            handle: {
              title: 'appInfo.title',
            },
          },
        ],
      },
      {
        path: 'user/profile',
        element: withSuspense(<ProfilePage />),
        handle: { title: 'user.account' },
      },
    ],
  },
  {
    path: '/tray/menu',
    element: withSuspense(<TrayPage />),
  },
  {
    path: '/size',
    element: withSuspense(<SizePage />),
  },
  {
    path: '/dialog/alert',
    element: withSuspense(<AlertDialogPage />),
  },
  {
    path: '*',
    element: withSuspense(<ErrorPage />),
  },
]

export const router = createHashRouter(routes)
