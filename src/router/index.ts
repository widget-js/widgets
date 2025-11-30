import type { RouteRecordRaw } from 'vue-router'
import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'
import WidgetRouter from '@/widgets/widget-router'

/**
 * 组件路由都以 /widget/开头，e.g. /widget/countdown
 * 组件设置路由都以 /widget/config/开头，e.g. /widget/config/countdown
 * webpackChunkName: 和路由名称保持一致
 */
const routes: RouteRecordRaw[] = [
  ...WidgetRouter,
  {
    path: '/countdown/list',
    component: () => import(/* webpackChunkName: "com.wisdom.widgets.quick_search" */ '../countdown/CountdownList.vue'),
  },

  {
    path: '/',
    name: 'home',
    component: import('@/views/add/AddWidgetView.vue'),
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('@/views/settings/SettingView.vue'),
  },
  {
    path: '/setting/app/runtime',
    name: 'AppRunTime',
    component: () => import('@/views/settings/AppRuntimeView.vue'),
  },
  {
    path: '/manager',
    name: 'manager',
    component: () => import('@/views/manager/ManagerView.vue'),
  },
  {
    path: '/package/manager',
    name: 'package-manager',
    component: () => import('@/views/manager/WidgetPackageManagerView.vue'),
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('../views/add/AddWidgetView.vue'),
  },
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('../views/auth/LoginView.vue'),
  },
  {
    path: '/auth/register',
    name: 'register',
    component: () => import('../views/auth/RegisterView.vue'),
  },
  {
    path: '/auth/reset',
    name: 'reset_password',
    component: () => import('../views/auth/ResetPasswordView.vue'),
  },
  {
    path: '/user/profile',
    name: 'profile',
    component: () => import('../views/user/ProfileView.vue'),
  },
  {
    path: '/failed',
    name: 'failed',
    component: () => import('../views/desktop/WidgetFailed.vue'),
  },
  {
    path: '/loading',
    name: 'loading',
    component: () => import('../views/desktop/Loading.vue'),
  },
  {
    path: '/desktop/grid',
    name: 'grid',
    component: () => import('../views/desktop/Grid.vue'),
  },
  {
    path: '/desktop/tray',
    name: 'tray',
    component: () => import('../views/desktop/TrayGuide.vue'),
  },
  {
    path: '/tray/menu',
    name: 'TrayMenu',
    component: () => import('../views/tray/TrayMenuView.vue'),
  },
  {
    path: '/check-update',
    name: 'check-update',
    component: () =>
      import('../views/update/CheckUpdateView.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router
