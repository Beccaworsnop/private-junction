"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, Clock } from "lucide-react"

interface Alert {
  id: string
  pondName: string
  parameter: string
  severity: "low" | "medium" | "high"
  message: string
  timestamp: string
  acknowledged: boolean
}

export function AlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    // Simulated alerts data
    const mockAlerts: Alert[] = [
      {
        id: "1",
        pondName: "Bassin Nurserie C",
        parameter: "Température",
        severity: "high",
        message: "Température critique: 29.1°C (max: 26°C)",
        timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
        acknowledged: false,
      },
      {
        id: "2",
        pondName: "Bassin Élevage B",
        parameter: "pH",
        severity: "medium",
        message: "pH élevé: 8.4 (optimal: 7.0-8.0)",
        timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
        acknowledged: false,
      },
      {
        id: "3",
        pondName: "Bassin Principal A",
        parameter: "Oxygène",
        severity: "low",
        message: "Oxygène légèrement bas: 5.8 mg/L",
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

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(alerts.map((alert) => (alert.id === alertId ? { ...alert, acknowledged: true } : alert)))
  }

  const activeAlerts = alerts.filter((alert) => !alert.acknowledged)
  const acknowledgedAlerts = alerts.filter((alert) => alert.acknowledged)

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          Alertes Récentes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeAlerts.length === 0 ? (
          <div className="text-center py-6 text-slate-500">
            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p>Aucune alerte active</p>
          </div>
        ) : (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-slate-700">Alertes Actives ({activeAlerts.length})</h4>
            {activeAlerts.map((alert) => (
              <div key={alert.id} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={getSeverityColor(alert.severity)}>{alert.severity.toUpperCase()}</Badge>
                      <span className="text-sm font-medium">{alert.pondName}</span>
                    </div>
                    <p className="text-sm text-slate-600">{alert.message}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-500">
                        {new Date(alert.timestamp).toLocaleTimeString("fr-FR")}
                      </span>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => acknowledgeAlert(alert.id)} className="w-full">
                  Acquitter
                </Button>
              </div>
            ))}
          </div>
        )}

        {acknowledgedAlerts.length > 0 && (
          <div className="space-y-3 pt-4 border-t">
            <h4 className="font-medium text-sm text-slate-700">Récemment Acquittées</h4>
            {acknowledgedAlerts.slice(0, 2).map((alert) => (
              <div key={alert.id} className="border rounded-lg p-3 opacity-60">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">{alert.pondName}</span>
                </div>
                <p className="text-sm text-slate-600">{alert.message}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
