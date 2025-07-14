"use client"

import { Home, User, Mail, PenTool } from "lucide-react"
import Link from "next/link"

import {
        Sidebar,
        SidebarContent,
        SidebarGroup,
        SidebarGroupContent,
        SidebarMenu,
        SidebarMenuButton,
        SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items
const items = [
        {
                title: "Blog",
                url: "/",
                icon: Home,
        },
        {
                title: "Write",
                url: "/write",
                icon: PenTool,
        },
        {
                title: "About",
                url: "/about",
                icon: User,
        },
        {
                title: "Contact",
                url: "/contact",
                icon: Mail,
        },
]

export function AppSidebar() {
        return (
                <Sidebar>
                        <SidebarContent>
                                <SidebarGroup>
                                        <SidebarGroupContent>
                                                <SidebarMenu>
                                                        {items.map((item) => (
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
                </Sidebar>
        )
}
