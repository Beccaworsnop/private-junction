"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Fish, AlertTriangle, TrendingUp, Droplets } from "lucide-react"
import { useLanguage } from "./language-provider"

interface StatsOverviewProps {
  ponds: Array<{
    status: "optimal" | "warning" | "critical"
    capacity: number
  }>
}

export function StatsOverview({ ponds }: StatsOverviewProps) {
  const { language } = useLanguage()

  const totalPonds = ponds.length
  const optimalPonds = ponds.filter((p) => p.status === "optimal").length
  const warningPonds = ponds.filter((p) => p.status === "warning").length
  const criticalPonds = ponds.filter((p) => p.status === "critical").length
  const totalCapacity = ponds.reduce((sum, pond) => sum + pond.capacity, 0)
  const healthPercentage = Math.round((optimalPonds / totalPonds) * 100)

  const stats = [
    {
      title: language === "ar" ? "إجمالي الأحواض" : "Total Bassins",
      value: totalPonds,
      subtitle: `${totalCapacity.toLocaleString()} L ${language === "ar" ? "إجمالي" : "total"}`,
      icon: Fish,
      color: "text-blue-600",
    },
    {
      title: language === "ar" ? "التنبيهات النشطة" : "Alertes Actives",
      value: criticalPonds + warningPonds,
      subtitle: `${criticalPonds} ${language === "ar" ? "حرجة" : "critiques"}, ${warningPonds} ${language === "ar" ? "تحذيرات" : "avertissements"}`,
      icon: AlertTriangle,
      color: "text-red-600",
    },
    {
      title: language === "ar" ? "الصحة العامة" : "Santé Globale",
      value: `${healthPercentage}%`,
      subtitle: `${optimalPonds} ${language === "ar" ? "أحواض مثالية" : "bassins optimaux"}`,
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: language === "ar" ? "حالة النظام" : "Statut Système",
      value: language === "ar" ? "متصل" : "En Ligne",
      subtitle: language === "ar" ? "آخر مزامنة: الآن" : "Dernière sync: maintenant",
      icon: Droplets,
      color: "text-cyan-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
