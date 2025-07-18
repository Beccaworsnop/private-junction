"use client"

import type * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Fish, LayoutDashboard, AlertTriangle, Settings, Waves } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useLanguage } from "@/components/language-provider"

const navigation = {
  fr: [
    {
      title: "Tableau de Bord",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Alertes",
      url: "/alerts",
      icon: AlertTriangle,
    },
    {
      title: "Paramètres",
      url: "/settings",
      icon: Settings,
    },
  ],
  ar: [
    {
      title: "لوحة التحكم",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "التنبيهات",
      url: "/alerts",
      icon: AlertTriangle,
    },
    {
      title: "الإعدادات",
      url: "/settings",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { language } = useLanguage()
  const nav = navigation[language as keyof typeof navigation] || navigation.fr

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
            <Fish className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-sidebar-foreground">AquaMonitor</span>
            <span className="text-xs text-sidebar-foreground/70">
              {language === "ar" ? "مراقب الأحواض" : "Surveillance Intelligente"}
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} size="lg">
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <div className="px-3 py-2">
              <div className="rounded-lg bg-blue-50 p-4 text-center">
                <Waves className="mx-auto h-8 w-8 text-blue-600 mb-2" />
                <p className="text-sm font-medium text-blue-900 mb-1">
                  {language === "ar" ? "نظام متصل" : "Système Connecté"}
                </p>
                <p className="text-xs text-blue-700">
                  {language === "ar" ? "آخر تحديث: الآن" : "Dernière sync: maintenant"}
                </p>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 text-xs text-sidebar-foreground/70">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            {language === "ar" ? "متصل - 3 أحواض نشطة" : "En ligne - 3 bassins actifs"}
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
