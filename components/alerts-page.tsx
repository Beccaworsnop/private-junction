"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, CheckCircle, Clock, Search, Filter } from "lucide-react"
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
  value: number
  threshold: number
}

export function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const { language, t } = useLanguage()

  useEffect(() => {
    // Mock alerts data
    const mockAlerts: Alert[] = [
      {
        id: "1",
        pondName: "Bassin Nurserie C",
        pondNameAr: "حوض الحضانة ج",
        parameter: "Température",
        parameterAr: "درجة الحرارة",
        severity: "high",
        message: "Température critique: 29.1°C (seuil: 26°C)",
        messageAr: "درجة حرارة حرجة: 29.1°م (الحد: 26°م)",
        timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
        acknowledged: false,
        value: 29.1,
        threshold: 26,
      },
      {
        id: "2",
        pondName: "Bassin Élevage B",
        pondNameAr: "حوض التربية ب",
        parameter: "pH",
        parameterAr: "الحموضة",
        severity: "medium",
        message: "pH élevé: 8.4 (optimal: 7.0-8.0)",
        messageAr: "حموضة عالية: 8.4 (المثالي: 7.0-8.0)",
        timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
        acknowledged: false,
        value: 8.4,
        threshold: 8.0,
      },
      {
        id: "3",
        pondName: "Bassin Principal A",
        pondNameAr: "الحوض الرئيسي أ",
        parameter: "Oxygène Dissous",
        parameterAr: "الأكسجين المذاب",
        severity: "low",
        message: "Oxygène légèrement bas: 5.8 mg/L",
        messageAr: "أكسجين منخفض قليلاً: 5.8 مغ/ل",
        timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
        acknowledged: true,
        value: 5.8,
        threshold: 6.0,
      },
      {
        id: "4",
        pondName: "Bassin Élevage B",
        pondNameAr: "حوض التربية ب",
        parameter: "Turbidité",
        parameterAr: "العكارة",
        severity: "medium",
        message: "Turbidité élevée: 35.2 NTU",
        messageAr: "عكارة عالية: 35.2 وحدة",
        timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
        acknowledged: true,
        value: 35.2,
        threshold: 25.0,
      },
    ]

    setAlerts(mockAlerts)
    setFilteredAlerts(mockAlerts)
  }, [])

  useEffect(() => {
    let filtered = alerts

    if (searchTerm) {
      filtered = filtered.filter(
        (alert) =>
          (language === "ar" ? alert.pondNameAr : alert.pondName).toLowerCase().includes(searchTerm.toLowerCase()) ||
          (language === "ar" ? alert.parameterAr : alert.parameter).toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (severityFilter !== "all") {
      filtered = filtered.filter((alert) => alert.severity === severityFilter)
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((alert) => (statusFilter === "active" ? !alert.acknowledged : alert.acknowledged))
    }

    setFilteredAlerts(filtered)
  }, [alerts, searchTerm, severityFilter, statusFilter, language])

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
      return language === "ar" ? `منذ ${diffMinutes} دقيقة` : `Il y a ${diffMinutes} min`
    } else if (diffMinutes < 1440) {
      const hours = Math.floor(diffMinutes / 60)
      return language === "ar" ? `منذ ${hours} ساعة` : `Il y a ${hours}h`
    } else {
      return date.toLocaleDateString(language === "ar" ? "ar-DZ" : "fr-FR")
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            {language === "ar" ? "تصفية التنبيهات" : "Filtrer les Alertes"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder={language === "ar" ? "البحث..." : "Rechercher..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger>
                <SelectValue placeholder={language === "ar" ? "مستوى الخطورة" : "Gravité"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === "ar" ? "الكل" : "Toutes"}</SelectItem>
                <SelectItem value="high">{getSeverityLabel("high")}</SelectItem>
                <SelectItem value="medium">{getSeverityLabel("medium")}</SelectItem>
                <SelectItem value="low">{getSeverityLabel("low")}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder={language === "ar" ? "الحالة" : "Statut"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === "ar" ? "الكل" : "Toutes"}</SelectItem>
                <SelectItem value="active">{language === "ar" ? "نشطة" : "Actives"}</SelectItem>
                <SelectItem value="acknowledged">{language === "ar" ? "مؤكدة" : "Acquittées"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <h3 className="text-lg font-medium mb-2">{language === "ar" ? "لا توجد تنبيهات" : "Aucune alerte"}</h3>
              <p className="text-slate-600">
                {language === "ar"
                  ? "لا توجد تنبيهات تطابق المعايير المحددة"
                  : "Aucune alerte ne correspond aux critères sélectionnés"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredAlerts.map((alert) => (
            <Card
              key={alert.id}
              className={`border-l-4 ${
                alert.severity === "high"
                  ? "border-l-red-500"
                  : alert.severity === "medium"
                    ? "border-l-yellow-500"
                    : "border-l-blue-500"
              } ${alert.acknowledged ? "opacity-60" : ""}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {alert.acknowledged ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-orange-500" />
                      )}
                      <Badge className={getSeverityColor(alert.severity)}>{getSeverityLabel(alert.severity)}</Badge>
                      <span className="font-semibold text-lg">
                        {language === "ar" ? alert.pondNameAr : alert.pondName}
                      </span>
                    </div>

                    <div className="mb-3">
                      <p className="text-slate-900 font-medium mb-1">
                        {language === "ar" ? alert.parameterAr : alert.parameter}
                      </p>
                      <p className="text-slate-700">{language === "ar" ? alert.messageAr : alert.message}</p>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatTime(alert.timestamp)}
                      </div>
                      <div>
                        {language === "ar" ? "القيمة:" : "Valeur:"} <span className="font-medium">{alert.value}</span>
                      </div>
                      <div>
                        {language === "ar" ? "الحد:" : "Seuil:"} <span className="font-medium">{alert.threshold}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    {!alert.acknowledged && (
                      <Button
                        size="sm"
                        onClick={() => acknowledgeAlert(alert.id)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {t("acknowledge")}
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      {t("details")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
