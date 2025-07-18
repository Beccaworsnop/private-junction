"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "./language-provider"

interface Alert {
  id: string
  pondName: string
  pondNameAr: string
  parameter: string
  parameterAr: string
  severity: "low" | "medium" | "high"
  message: string
  messageAr: string
  timestamp: string
  acknowledged: boolean
}

export function RecentAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const { language, t } = useLanguage()

  useEffect(() => {
    const mockAlerts: Alert[] = [
      {
        id: "1",
        pondName: "Bassin Nurserie C",
        pondNameAr: "حوض الحضانة ج",
        parameter: "Température",
        parameterAr: "درجة الحرارة",
        severity: "high",
        message: "Température critique: 29.1°C",
        messageAr: "درجة حرارة حرجة: 29.1°م",
        timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
        acknowledged: false,
      },
      {
        id: "2",
        pondName: "Bassin Élevage B",
        pondNameAr: "حوض التربية ب",
        parameter: "pH",
        parameterAr: "الحموضة",
        severity: "medium",
        message: "pH élevé: 8.4",
        messageAr: "حموضة عالية: 8.4",
        timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
        acknowledged: false,
      },
      {
        id: "3",
        pondName: "Bassin Principal A",
        pondNameAr: "الحوض الرئيسي أ",
        parameter: "Oxygène",
        parameterAr: "الأكسجين",
        severity: "low",
        message: "Oxygène bas: 5.8 mg/L",
        messageAr: "أكسجين منخفض: 5.8 مغ/ل",
        timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
        acknowledged: true,
      },
    ]

    setAlerts(mockAlerts)
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSeverityLabel = (severity: string) => {
    const labels = {
      fr: { high: "CRITIQUE", medium: "ATTENTION", low: "INFO" },
      ar: { high: "حرج", medium: "تحذير", low: "معلومات" },
    }
    return labels[language as keyof typeof labels][severity as keyof typeof labels.fr] || severity
  }

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(alerts.map((alert) => (alert.id === alertId ? { ...alert, acknowledged: true } : alert)))
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffMinutes < 60) {
      return language === "ar" ? `منذ ${diffMinutes} د` : `${diffMinutes} min`
    } else {
      const hours = Math.floor(diffMinutes / 60)
      return language === "ar" ? `منذ ${hours} س` : `${hours}h`
    }
  }

  const activeAlerts = alerts.filter((alert) => !alert.acknowledged)
  const recentAlerts = alerts.filter((alert) => alert.acknowledged).slice(0, 2)

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            {language === "ar" ? "التنبيهات الأخيرة" : "Alertes Récentes"}
          </CardTitle>
          <Link href="/alerts">
            <Button variant="ghost" size="sm">
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeAlerts.length === 0 ? (
          <div className="text-center py-6 text-slate-500">
            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-sm">{language === "ar" ? "لا توجد تنبيهات نشطة" : "Aucune alerte active"}</p>
          </div>
        ) : (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-slate-700">
              {language === "ar"
                ? `التنبيهات النشطة (${activeAlerts.length})`
                : `Alertes Actives (${activeAlerts.length})`}
            </h4>
            {activeAlerts.map((alert) => (
              <div key={alert.id} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={getSeverityColor(alert.severity)}>{getSeverityLabel(alert.severity)}</Badge>
                      <span className="text-sm font-medium">
                        {language === "ar" ? alert.pondNameAr : alert.pondName}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{language === "ar" ? alert.messageAr : alert.message}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-500">{formatTime(alert.timestamp)}</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => acknowledgeAlert(alert.id)} className="w-full">
                  {t("acknowledge")}
                </Button>
              </div>
            ))}
          </div>
        )}

        {recentAlerts.length > 0 && (
          <div className="space-y-3 pt-4 border-t">
            <h4 className="font-medium text-sm text-slate-700">
              {language === "ar" ? "مؤكدة مؤخراً" : "Récemment Acquittées"}
            </h4>
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="border rounded-lg p-3 opacity-60">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">{language === "ar" ? alert.pondNameAr : alert.pondName}</span>
                </div>
                <p className="text-sm text-slate-600">{language === "ar" ? alert.messageAr : alert.message}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
