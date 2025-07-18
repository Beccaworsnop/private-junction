"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/components/language-provider"

interface PageHeaderProps {
  title: string
  titleAr: string
  subtitle: string
  subtitleAr: string
}

export function PageHeader({ title, titleAr, subtitle, subtitleAr }: PageHeaderProps) {
  const { language } = useLanguage()

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">{language === "ar" ? titleAr : title}</h1>
        <p className="text-xs text-muted-foreground">{language === "ar" ? subtitleAr : subtitle}</p>
      </div>
    </header>
  )
}
