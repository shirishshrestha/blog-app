'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, LayoutDashboard, FileText, Settings } from 'lucide-react'
import type { MenuItem } from '@/src/config/menu'

interface UnifiedSidebarProps {
  menuItems: MenuItem[]
}

/**
 * Icon map for rendering icons from string names
 */
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  FileText,
  Settings,
}

/**
 * Get icon component from string name
 */
function getIcon(iconName: string) {
  return iconMap[iconName] || FileText
}

/**
 * Check if a menu item or any of its children is active
 */
function isMenuItemActive(item: MenuItem, pathname: string) {
  // Check if current path matches item path
  const directMatch = pathname === item.path || pathname.startsWith(item.path + '/')

  // Check if any child is active
  const childMatch = item.children?.some(
    (child) => pathname === child.path || pathname.startsWith(child.path + '/')
  )

  return directMatch || childMatch
}

export function UnifiedSidebar({ menuItems }: UnifiedSidebarProps) {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r bg-background">
      <SidebarContent className="bg-background">
        {/* Logo Section */}
        <div className="flex justify-center items-center px-6 py-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">Blog App</span>
          </Link>
        </div>

        {/* Menu Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => {
              const Icon = getIcon(item.icon)
              const isActive = isMenuItemActive(item, pathname)

              // If item has children, render collapsible submenu
              if (item.children && item.children.length > 0) {
                return (
                  <Collapsible
                    key={item.path}
                    asChild
                    defaultOpen={isActive}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton isActive={isActive}>
                          <Icon className="h-4 w-4" />
                          <span>{item.name}</span>
                          <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub className="mx-0">
                          {item.children.map((child) => {
                            const ChildIcon = getIcon(child.icon)
                            const isChildActive =
                              pathname === child.path || pathname.startsWith(child.path + '/')

                            return (
                              <SidebarMenuSubItem key={child.path}>
                                <SidebarMenuSubButton asChild isActive={isChildActive}>
                                  <Link href={child.path}>
                                    <ChildIcon className="h-4 w-4" />
                                    <span>{child.name}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                )
              }

              // Regular menu item without children
              return (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={isActive}>
                    <Link className="flex items-center gap-3" href={item.path}>
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
