"use client"

import { useState, useEffect } from "react"
import { PondCard } from "./pond-card"
import { StatsOverview } from "./stats-overview"
import { RecentAlerts } from "./recent-alerts"
import { useLanguage } from "./language-provider"

interface Pond {
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

export function Dashboard() {
  const [ponds, setPonds] = useState<Pond[]>([])
  const [loading, setLoading] = useState(true)
  const { language } = useLanguage()

  useEffect(() => {
    const fetchData = async () => {
      // Simulated pond data
      const mockPonds: Pond[] = [
        {
          id: "1",
          name: "Bassin Principal A",
          nameAr: "الحوض الرئيسي أ",
          status: "optimal",
          fishType: "Tilapia",
          fishTypeAr: "البلطي",
          capacity: 5000,
          currentReadings: {
            temperature: 24.5,
            pH: 7.2,
            dissolvedOxygen: 8.1,
            salinity: 2.3,
            turbidity: 15.2,
          },
          lastUpdated: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Bassin Élevage B",
          nameAr: "حوض التربية ب",
          status: "warning",
          fishType: "Carpe",
          fishTypeAr: "الكارب",
          capacity: 3000,
          currentReadings: {
            temperature: 26.8,
            pH: 8.4,
            dissolvedOxygen: 5.2,
            salinity: 1.8,
            turbidity: 25.7,
          },
          lastUpdated: new Date().toISOString(),
        },
        {
          id: "3",
          name: "Bassin Nurserie C",
          nameAr: "حوض الحضانة ج",
          status: "critical",
          fishType: "Truite",
          fishTypeAr: "التراوت",
          capacity: 2000,
          currentReadings: {
            temperature: 29.1,
            pH: 6.1,
            dissolvedOxygen: 3.8,
            salinity: 0.5,
            turbidity: 45.3,
          },
          lastUpdated: new Date().toISOString(),
        },
      ]

      setPonds(mockPonds)
      setLoading(false)
    }

    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <StatsOverview ponds={ponds} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ponds.map((pond) => (
              <PondCard key={pond.id} pond={pond} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <RecentAlerts />
        </div>
      </div>
    </div>
  )
}
