export interface MenuItem {
  name: string
  path: string
  icon: string // Icon name as string
  children?: MenuItem[]
}

/**
 * Panel sidebar menu items configuration
 */
export const panelMenuItems: MenuItem[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: 'LayoutDashboard',
  },
  {
    name: 'Posts',
    path: '/posts',
    icon: 'FileText',
    children: [
      {
        name: 'All Posts',
        path: '/posts',
        icon: 'FileText',
      },
      {
        name: 'Create New',
        path: '/posts/create',
        icon: 'FileText',
      },
    ],
  },
  {
    name: 'Settings',
    path: '/dashboard/settings',
    icon: 'Settings',
  },
]
