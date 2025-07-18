"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Thermometer, Droplets, Activity, AlertTriangle, Fish } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "./language-provider"

interface PondCardProps {
  pond: {
    id: string
    name: string
    nameAr: string
    status: "optimal" | "warning" | "critical"
    fishType: string
    fishTypeAr: string
    capacity: number
    currentReadings: {
      temperature: number
      pH: number
      dissolvedOxygen: number
      salinity: number
      turbidity: number
    }
    lastUpdated: string
  }
}

export function PondCard({ pond }: PondCardProps) {
  const { language, t } = useLanguage()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "bg-green-100 text-green-800 border-green-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "optimal":
        return <Activity className="w-4 h-4" />
      case "warning":
        return <AlertTriangle className="w-4 h-4" />
      case "critical":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-2">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Fish className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg font-bold">{language === "ar" ? pond.nameAr : pond.name}</CardTitle>
          </div>
          <Badge className={`${getStatusColor(pond.status)} font-medium`}>
            {getStatusIcon(pond.status)}
            <span className="ml-1">{t(pond.status)}</span>
          </Badge>
        </div>
        <p className="text-sm text-slate-600 font-medium">
          {language === "ar" ? pond.fishTypeAr : pond.fishType} • {pond.capacity.toLocaleString()} L
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 p-2 bg-orange-50 rounded-lg">
            <Thermometer className="w-5 h-5 text-orange-600" />
            <div>
              <p className="text-xs text-slate-600 font-medium">{t("temperature")}</p>
              <p className="font-bold text-lg">{pond.currentReadings.temperature}°C</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
            <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-xs text-white font-bold">pH</span>
            </div>
            <div>
              <p className="text-xs text-slate-600 font-medium">pH</p>
              <p className="font-bold text-lg">{pond.currentReadings.pH}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 p-2 bg-cyan-50 rounded-lg">
            <Droplets className="w-5 h-5 text-cyan-600" />
            <div>
              <p className="text-xs text-slate-600 font-medium">{t("oxygen")}</p>
              <p className="font-bold text-lg">{pond.currentReadings.dissolvedOxygen}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 p-2 bg-purple-50 rounded-lg">
            <Activity className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-xs text-slate-600 font-medium">{t("salinity")}</p>
              <p className="font-bold text-lg">{pond.currentReadings.salinity}‰</p>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">
              {t("lastUpdated")}: {new Date(pond.lastUpdated).toLocaleTimeString(language === "ar" ? "ar-DZ" : "fr-FR")}
            </p>
            <Link href={`/pond/${pond.id}`}>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 font-medium">
                {t("details")}
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
