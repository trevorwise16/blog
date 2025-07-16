'use client'

import { useSession } from 'next-auth/react'
import { Home, User, Mail, PenTool, Bird } from 'lucide-react'
import Link from 'next/link'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar'
import { AuthButton } from '@/components/auth-button'

// Menu items
const items = [
  {
    title: 'Blog',
    url: '/',
    icon: Home,
  },
  {
    title: 'Write',
    url: '/write',
    icon: PenTool,
  },
  {
    title: 'Birds',
    url: '/bird',
    icon: Bird,
  },
  {
    title: 'About',
    url: '/about',
    icon: User,
  },
  {
    title: 'Contact',
    url: '/contact',
    icon: Mail,
  },
]

export function AppSidebar() {
  const { data: session } = useSession()

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <span className="font-semibold">Trevor&apos;s Blog</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items
                .filter((item) => !(item.title == 'Write') || session)
                .map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-2">
          <AuthButton />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
