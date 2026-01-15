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
    icon: 'Folders',
    children: [
      {
        name: 'All Posts',
        path: '/posts',
        icon: 'Files',
      },
      {
        name: 'Create New',
        path: '/posts/create',
        icon: 'FilePlus',
      },
    ],
  },
]
