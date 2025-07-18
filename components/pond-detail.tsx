"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ArrowLeft, Download, Calendar } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "./language-provider"

interface PondDetailProps {
  pondId: string
}

export function PondDetail({ pondId }: PondDetailProps) {
  const [timeRange, setTimeRange] = useState("24h")
  const [historicalData, setHistoricalData] = useState<any[]>([])
  const { language, t } = useLanguage()

  useEffect(() => {
    // Generate mock historical data
    const generateData = () => {
      const data = []
      const now = new Date()
      const hours = timeRange === "24h" ? 24 : timeRange === "7d" ? 168 : 720

      for (let i = hours; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000)
        data.push({
          time: time.toISOString(),
          temperature: 24 + Math.sin(i / 12) * 2 + (Math.random() - 0.5),
          pH: 7.2 + Math.sin(i / 8) * 0.3 + (Math.random() - 0.5) * 0.2,
          dissolvedOxygen: 8 + Math.sin(i / 6) * 1 + (Math.random() - 0.5) * 0.5,
          salinity: 2.3 + (Math.random() - 0.5) * 0.3,
          turbidity: 15 + Math.sin(i / 10) * 5 + (Math.random() - 0.5) * 3,
        })
      }
      return data
    }

    setHistoricalData(generateData())
  }, [timeRange])

  const currentValues = historicalData[historicalData.length - 1] || {
    temperature: 24.5,
    pH: 7.2,
    dissolvedOxygen: 8.1,
    salinity: 2.3,
    turbidity: 15.2,
  }

  const formatTime = (timeStr: string) => {
    const date = new Date(timeStr)
    if (timeRange === "24h") {
      return date.toLocaleTimeString(language === "ar" ? "ar-DZ" : "fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    }
    return date.toLocaleDateString(language === "ar" ? "ar-DZ" : "fr-FR", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === "ar" ? "العودة" : "Retour"}
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{language === "ar" ? "الحوض الرئيسي أ" : "Bassin Principal A"}</h1>
            <p className="text-slate-600">{language === "ar" ? "البلطي • 5,000 لتر" : "Tilapia • 5,000 L"}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            {t("export")}
          </Button>
        </div>
      </div>

      {/* Current Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-slate-600 mb-1">{t("temperature")}</p>
            <p className="text-2xl font-bold text-orange-600">{currentValues.temperature?.toFixed(1)}°C</p>
            <Badge className="mt-1 bg-green-100 text-green-800">Normal</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-slate-600 mb-1">pH</p>
            <p className="text-2xl font-bold text-blue-600">{currentValues.pH?.toFixed(1)}</p>
            <Badge className="mt-1 bg-green-100 text-green-800">Normal</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-slate-600 mb-1">{t("oxygen")}</p>
            <p className="text-2xl font-bold text-cyan-600">{currentValues.dissolvedOxygen?.toFixed(1)}</p>
            <Badge className="mt-1 bg-green-100 text-green-800">Normal</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-slate-600 mb-1">{t("salinity")}</p>
            <p className="text-2xl font-bold text-purple-600">{currentValues.salinity?.toFixed(1)}‰</p>
            <Badge className="mt-1 bg-green-100 text-green-800">Normal</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-slate-600 mb-1">{t("turbidity")}</p>
            <p className="text-2xl font-bold text-amber-600">{currentValues.turbidity?.toFixed(1)} NTU</p>
            <Badge className="mt-1 bg-green-100 text-green-800">Normal</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {language === "ar" ? "البيانات التاريخية" : "Données Historiques"}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant={timeRange === "24h" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange("24h")}
              >
                {t("today")}
              </Button>
              <Button variant={timeRange === "7d" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("7d")}>
                {t("week")}
              </Button>
              <Button
                variant={timeRange === "30d" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange("30d")}
              >
                {t("month")}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="temperature" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="temperature">{t("temperature")}</TabsTrigger>
              <TabsTrigger value="ph">pH</TabsTrigger>
              <TabsTrigger value="oxygen">{t("oxygen")}</TabsTrigger>
              <TabsTrigger value="salinity">{t("salinity")}</TabsTrigger>
              <TabsTrigger value="turbidity">{t("turbidity")}</TabsTrigger>
            </TabsList>

            <TabsContent value="temperature" className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" tickFormatter={formatTime} interval="preserveStartEnd" />
                  <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
                  <Tooltip
                    labelFormatter={(value) => formatTime(value as string)}
                    formatter={(value: number) => [`${value.toFixed(1)}°C`, t("temperature")]}
                  />
                  <Line type="monotone" dataKey="temperature" stroke="#ea580c" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="ph" className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" tickFormatter={formatTime} interval="preserveStartEnd" />
                  <YAxis domain={[6, 9]} />
                  <Tooltip
                    labelFormatter={(value) => formatTime(value as string)}
                    formatter={(value: number) => [value.toFixed(1), "pH"]}
                  />
                  <Line type="monotone" dataKey="pH" stroke="#2563eb" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="oxygen" className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" tickFormatter={formatTime} interval="preserveStartEnd" />
                  <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
                  <Tooltip
                    labelFormatter={(value) => formatTime(value as string)}
                    formatter={(value: number) => [`${value.toFixed(1)} mg/L`, t("oxygen")]}
                  />
                  <Line type="monotone" dataKey="dissolvedOxygen" stroke="#0891b2" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="salinity" className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" tickFormatter={formatTime} interval="preserveStartEnd" />
                  <YAxis domain={["dataMin - 0.5", "dataMax + 0.5"]} />
                  <Tooltip
                    labelFormatter={(value) => formatTime(value as string)}
                    formatter={(value: number) => [`${value.toFixed(1)}‰`, t("salinity")]}
                  />
                  <Line type="monotone" dataKey="salinity" stroke="#7c3aed" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="turbidity" className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" tickFormatter={formatTime} interval="preserveStartEnd" />
                  <YAxis domain={["dataMin - 2", "dataMax + 2"]} />
                  <Tooltip
                    labelFormatter={(value) => formatTime(value as string)}
                    formatter={(value: number) => [`${value.toFixed(1)} NTU`, t("turbidity")]}
                  />
                  <Line type="monotone" dataKey="turbidity" stroke="#d97706" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
