"use client"

import { useState, useEffect } from "react"
import { Fish, Droplets, AlertTriangle, Calendar, BarChart3, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface PondData {
  id: number
  name: string
  temperature: number
  waterQuality: number
  status: "danger" | "clear" | "warning"
  weeklyData: Array<{
    day: string
    temp: number
    condition: string
    icon: string
  }>
  chemicalThreats: {
    ammonia: { detected: boolean; level: number; safe: boolean }
    nitrites: { detected: boolean; level: number; safe: boolean }
    pesticides: { detected: boolean; level: number; safe: boolean }
    heavyMetals: { detected: boolean; level: number; safe: boolean }
  }
  biologicalThreats: {
    bacteria: { detected: boolean; type: string; risk: "low" | "medium" | "high" }
    virus: { detected: boolean; type: string; risk: "low" | "medium" | "high" }
    parasites: { detected: boolean; type: string; risk: "low" | "medium" | "high" }
    fungi: { detected: boolean; type: string; risk: "low" | "medium" | "high" }
  }
  qpcrData: Array<{
    month: string
    value: number
  }>
}

interface HistoryData {
  date: string
  waterQuality: number
  chemicalThreats: number
  biologicalThreats: number
  temperature: number
  status: string
}

export function FishHealthDashboard() {
  const [pondsData, setPondsData] = useState<PondData[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [showAddPond, setShowAddPond] = useState(false)
  const [historyData, setHistoryData] = useState<HistoryData[]>([])
  const [selectedPond, setSelectedPond] = useState<number>(1)
  const [newPondData, setNewPondData] = useState({
    name: "",
    temperature: "",
    capacity: "",
    fishType: "",
    location: "",
  })

  useEffect(() => {
    // Mock data with chemical and biological threats
    const mockData: PondData[] = [
      {
        id: 1,
        name: "Pond 1",
        temperature: 85,
        waterQuality: 92,
        status: "warning",
        weeklyData: [
          { day: "Mon", temp: 29, condition: "Clean", icon: "✅" },
          { day: "Tue", temp: 22, condition: "Chemical", icon: "⚠️" },
          { day: "Wed", temp: 19, condition: "Clear", icon: "✅" },
          { day: "Thu", temp: 28, condition: "Biological", icon: "🦠" },
        ],
        chemicalThreats: {
          ammonia: { detected: true, level: 0.8, safe: false },
          nitrites: { detected: false, level: 0.1, safe: true },
          pesticides: { detected: false, level: 0.0, safe: true },
          heavyMetals: { detected: true, level: 0.3, safe: false },
        },
        biologicalThreats: {
          bacteria: { detected: true, type: "E. coli", risk: "medium" },
          virus: { detected: false, type: "None", risk: "low" },
          parasites: { detected: false, type: "None", risk: "low" },
          fungi: { detected: true, type: "Saprolegnia", risk: "high" },
        },
        qpcrData: [
          { month: "Jan", value: 15 },
          { month: "Feb", value: 22 },
          { month: "Mar", value: 18 },
          { month: "Apr", value: 35 },
          { month: "May", value: 28 },
          { month: "Jun", value: 12 },
        ],
      },
      {
        id: 2,
        name: "Pond 2",
        temperature: 85,
        waterQuality: 88,
        status: "clear",
        weeklyData: [
          { day: "Mon", temp: 29, condition: "Clean", icon: "✅" },
          { day: "Tue", temp: 22, condition: "Clear", icon: "✅" },
          { day: "Wed", temp: 19, condition: "Clear", icon: "✅" },
          { day: "Thu", temp: 28, condition: "Clear", icon: "✅" },
        ],
        chemicalThreats: {
          ammonia: { detected: false, level: 0.2, safe: true },
          nitrites: { detected: false, level: 0.05, safe: true },
          pesticides: { detected: false, level: 0.0, safe: true },
          heavyMetals: { detected: false, level: 0.1, safe: true },
        },
        biologicalThreats: {
          bacteria: { detected: false, type: "None", risk: "low" },
          virus: { detected: false, type: "None", risk: "low" },
          parasites: { detected: false, type: "None", risk: "low" },
          fungi: { detected: false, type: "None", risk: "low" },
        },
        qpcrData: [
          { month: "Jan", value: 8 },
          { month: "Feb", value: 12 },
          { month: "Mar", value: 6 },
          { month: "Apr", value: 15 },
          { month: "May", value: 10 },
          { month: "Jun", value: 5 },
        ],
      },
    ]
    setPondsData(mockData)

    // Generate mock history data
    const generateHistoryData = () => {
      const history: HistoryData[] = []
      const today = new Date()

      for (let i = 30; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)

        history.push({
          date: date.toISOString().split("T")[0],
          waterQuality: Math.floor(Math.random() * 20) + 80,
          chemicalThreats: Math.floor(Math.random() * 3),
          biologicalThreats: Math.floor(Math.random() * 4),
          temperature: Math.floor(Math.random() * 10) + 80,
          status: Math.random() > 0.8 ? "warning" : "clear",
        })
      }
      return history
    }

    setHistoryData(generateHistoryData())
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "danger":
        return "bg-red-500"
      case "warning":
        return "bg-yellow-500"
      case "clear":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "text-red-400"
      case "medium":
        return "text-yellow-400"
      case "low":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
  }

  const toggleHistory = () => {
    setShowHistory(!showHistory)
  }

  const toggleAddPond = () => {
    setShowAddPond(!showAddPond)
  }

  const handleAddPond = () => {
    const newPond: PondData = {
      id: pondsData.length + 1,
      name: newPondData.name || `Pond ${pondsData.length + 1}`,
      temperature: Number.parseInt(newPondData.temperature) || 75,
      waterQuality: Math.floor(Math.random() * 20) + 80,
      status: "clear",
      weeklyData: [
        { day: "Mon", temp: 25, condition: "Clear", icon: "✅" },
        { day: "Tue", temp: 26, condition: "Clear", icon: "✅" },
        { day: "Wed", temp: 24, condition: "Clear", icon: "✅" },
        { day: "Thu", temp: 27, condition: "Clear", icon: "✅" },
      ],
      chemicalThreats: {
        ammonia: { detected: false, level: 0.1, safe: true },
        nitrites: { detected: false, level: 0.05, safe: true },
        pesticides: { detected: false, level: 0.0, safe: true },
        heavyMetals: { detected: false, level: 0.05, safe: true },
      },
      biologicalThreats: {
        bacteria: { detected: false, type: "None", risk: "low" },
        virus: { detected: false, type: "None", risk: "low" },
        parasites: { detected: false, type: "None", risk: "low" },
        fungi: { detected: false, type: "None", risk: "low" },
      },
      qpcrData: [
        { month: "Jan", value: 5 },
        { month: "Feb", value: 8 },
        { month: "Mar", value: 3 },
        { month: "Apr", value: 12 },
        { month: "May", value: 7 },
        { month: "Jun", value: 4 },
      ],
    }

    setPondsData([...pondsData, newPond])
    setNewPondData({ name: "", temperature: "", capacity: "", fishType: "", location: "" })
    setShowAddPond(false)
  }

  if (showAddPond) {
    return (
      <div
        className="min-h-screen p-8"
        style={{
          background: "linear-gradient(135deg, #87CEEB 0%, #4682B4 50%, #1E90FF 100%)",
        }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/15 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-light text-white">Add New Pond</h2>
              <Button onClick={toggleAddPond} variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-white/90">Pond Name</Label>
                <Input
                  value={newPondData.name}
                  onChange={(e) => setNewPondData({ ...newPondData, name: e.target.value })}
                  placeholder="Enter pond name"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/90">Temperature (°F)</Label>
                  <Input
                    type="number"
                    value={newPondData.temperature}
                    onChange={(e) => setNewPondData({ ...newPondData, temperature: e.target.value })}
                    placeholder="75"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white/90">Capacity (L)</Label>
                  <Input
                    value={newPondData.capacity}
                    onChange={(e) => setNewPondData({ ...newPondData, capacity: e.target.value })}
                    placeholder="5000"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white/90">Fish Type</Label>
                <Select
                  value={newPondData.fishType}
                  onValueChange={(value) => setNewPondData({ ...newPondData, fishType: value })}
                >
                  <SelectTrigger className="bg-white/20 border-white/30 text-white">
                    <SelectValue placeholder="Select fish type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tilapia">Tilapia</SelectItem>
                    <SelectItem value="carp">Carp</SelectItem>
                    <SelectItem value="trout">Trout</SelectItem>
                    <SelectItem value="salmon">Salmon</SelectItem>
                    <SelectItem value="catfish">Catfish</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white/90">Location</Label>
                <Input
                  value={newPondData.location}
                  onChange={(e) => setNewPondData({ ...newPondData, location: e.target.value })}
                  placeholder="Enter location"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <Button onClick={handleAddPond} className="flex-1 bg-white text-blue-600 hover:bg-white/90">
                  Add Pond
                </Button>
                <Button
                  onClick={toggleAddPond}
                  variant="outline"
                  className="flex-1 border-white/30 text-white hover:bg-white/20 bg-transparent"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showHistory) {
    return (
      <div
        className="min-h-screen p-8"
        style={{
          background: "linear-gradient(135deg, #87CEEB 0%, #4682B4 50%, #1E90FF 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <Button
                onClick={toggleHistory}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                variant="outline"
              >
                ← Back to Dashboard
              </Button>
              <h1 className="text-3xl font-light text-white">Historical Data - Pond {selectedPond}</h1>
            </div>
            <div className="flex space-x-2">
              {pondsData.map((pond) => (
                <Button
                  key={pond.id}
                  onClick={() => setSelectedPond(pond.id)}
                  className={`${selectedPond === pond.id ? "bg-white text-blue-600" : "bg-white/20 text-white"}`}
                >
                  {pond.name}
                </Button>
              ))}
            </div>
          </div>

          {/* History Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {historyData.slice(-15).map((data, index) => (
              <div key={index} className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-white font-medium">{new Date(data.date).toLocaleDateString()}</h3>
                    <p className="text-white/70 text-sm">
                      {new Date(data.date).toLocaleDateString("en-US", { weekday: "long" })}
                    </p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(data.status)}`}></div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/80 text-sm">Water Quality</span>
                    <span className="text-white font-medium">{data.waterQuality}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80 text-sm">Chemical Threats</span>
                    <span className="text-white font-medium">{data.chemicalThreats}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80 text-sm">Biological Threats</span>
                    <span className="text-white font-medium">{data.biologicalThreats}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80 text-sm">Temperature</span>
                    <span className="text-white font-medium">{data.temperature}°F</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen p-8"
      style={{
        background: "linear-gradient(135deg, #87CEEB 0%, #4682B4 50%, #1E90FF 100%)",
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Fish className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col space-y-2">
            {/* Aquaculture monitoring indicators */}
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
              <span className="text-white/80 text-sm">Water Quality</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-400 rounded-full"></div>
              <span className="text-white/80 text-sm">Chemical Threats</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
              <span className="text-white/80 text-sm">Biological Threats</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-400 rounded-full"></div>
              <span className="text-white/80 text-sm">QPCR Analysis</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={toggleHistory}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30 flex items-center space-x-2"
            variant="outline"
          >
            <Calendar className="w-4 h-4" />
            <span>View History</span>
          </Button>
          <Button
            onClick={toggleAddPond}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30 flex items-center space-x-2"
            variant="outline"
          >
            <Plus className="w-4 h-4" />
            <span>Add Pond</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Chemical & Biological Threats Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-light text-white/90 mb-6">Threat Analysis</h2>

          <div className="relative">
            {/* Main Threats Card */}
            <div className="bg-white/15 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-white/25 rounded-2xl p-4">
                  <AlertTriangle className="w-12 h-12 text-red-300" />
                </div>
                <div className="text-right">
                  <div className="text-4xl font-light text-white mb-1">
                    {Object.values(pondsData[0]?.chemicalThreats || {}).filter((t) => t.detected).length +
                      Object.values(pondsData[0]?.biologicalThreats || {}).filter((t) => t.detected).length}
                  </div>
                  <div className="text-white/70 text-sm">Active Threats</div>
                </div>
              </div>

              {/* Chemical Threats */}
              <div className="mb-6">
                <h4 className="text-white/90 text-sm font-medium mb-3">Chemical Threats</h4>
                <div className="space-y-2">
                  {Object.entries(pondsData[0]?.chemicalThreats || {}).map(([key, threat]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                      <span className="text-white/90 text-sm font-medium capitalize">{key}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-bold ${threat.detected ? "text-red-400" : "text-green-400"}`}>
                          {threat.detected ? "YES" : "NO"}
                        </span>
                        <span className="text-white/70 text-xs">({threat.level} ppm)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Biological Threats */}
              <div className="mb-6">
                <h4 className="text-white/90 text-sm font-medium mb-3">Biological Threats</h4>
                <div className="space-y-2">
                  {Object.entries(pondsData[0]?.biologicalThreats || {}).map(([key, threat]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                      <span className="text-white/90 text-sm font-medium capitalize">{key}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-bold ${threat.detected ? "text-red-400" : "text-green-400"}`}>
                          {threat.detected ? "YES" : "NO"}
                        </span>
                        <span className={`text-xs ${getRiskColor(threat.risk)}`}>({threat.risk})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Data */}
              <div className="space-y-3">
                <h4 className="text-white/90 text-sm font-medium">Weekly Analysis</h4>
                {pondsData[0]?.weeklyData.map((day, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 px-2 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{day.icon}</span>
                      <div>
                        <div className="text-white font-medium">{day.temp}°</div>
                        <div className="text-white/60 text-xs">{day.day}</div>
                      </div>
                    </div>
                    <div className="text-white/90 text-sm font-medium">{day.condition}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Indicator */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-white rounded-full px-6 py-2 shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor("danger")}`}></div>
                    <span className="text-sm font-medium">Danger</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor("clear")}`}></div>
                    <span className="text-sm font-medium">Clear</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor("clear")}`}></div>
                    <span className="text-sm font-medium">Clear</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Aqua Dashboard Section with QPCR Chart */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-light text-white/90">Aqua Dashboard</h2>
            <div className="text-white/70 text-sm">home</div>
          </div>

          <div className="relative">
            {/* Main Aqua Card */}
            <div className="bg-white/15 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-white/25 rounded-2xl p-4">
                  <div className="w-12 h-12 bg-blue-400/30 rounded-lg flex items-center justify-center">
                    <Droplets className="w-8 h-8 text-blue-200" />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-light text-white mb-1">{pondsData[1]?.waterQuality}</div>
                  <div className="text-white/70 text-sm">Water Quality</div>
                </div>
              </div>

              {/* QPCR Analysis Chart */}
              <div className="bg-blue-400/25 rounded-2xl p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-medium">QPCR Analysis</span>
                  <BarChart3 className="w-5 h-5 text-white/80" />
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={pondsData[0]?.qpcrData || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.8)" fontSize={12} />
                      <YAxis domain={[0, 40]} stroke="rgba(255,255,255,0.8)" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255,255,255,0.1)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          borderRadius: "8px",
                          color: "white",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#60A5FA"
                        strokeWidth={3}
                        dot={{ fill: "#60A5FA", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: "#60A5FA", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Dashboard Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-red-400/20 rounded-xl p-4 text-center hover:bg-red-400/30 transition-colors cursor-pointer">
                  <AlertTriangle className="w-6 h-6 text-red-300 mx-auto mb-2" />
                  <div className="text-white text-sm font-medium">Threats</div>
                  <div className="text-white/70 text-xs">
                    {Object.values(pondsData[1]?.chemicalThreats || {}).filter((t) => t.detected).length +
                      Object.values(pondsData[1]?.biologicalThreats || {}).filter((t) => t.detected).length}{" "}
                    active
                  </div>
                </div>
                <div className="bg-blue-400/20 rounded-xl p-4 text-center hover:bg-blue-400/30 transition-colors cursor-pointer">
                  <div className="w-6 h-6 bg-blue-300 rounded mx-auto mb-2"></div>
                  <div className="text-white text-sm font-medium">Clear</div>
                  <div className="text-white/70 text-xs">All systems</div>
                </div>
              </div>

              {/* Weekly Data */}
              <div className="space-y-3">
                <h4 className="text-white/90 text-sm font-medium">Check Details</h4>
                {pondsData[1]?.weeklyData.map((day, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 px-2 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{day.icon}</span>
                      <div>
                        <div className="text-white font-medium">{day.temp}°</div>
                        <div className="text-white/60 text-xs">{day.day}</div>
                      </div>
                    </div>
                    <div className="text-white/90 text-sm font-medium">{day.condition}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Indicator */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-white rounded-full px-6 py-2 shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor("danger")}`}></div>
                    <span className="text-sm font-medium">Danger</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor("clear")}`}></div>
                    <span className="text-sm font-medium">Clear</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor("clear")}`}></div>
                    <span className="text-sm font-medium">Clear</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pond List */}
      <div className="mt-12 max-w-7xl mx-auto">
        <h3 className="text-xl font-light text-white/90 mb-4">All Ponds ({pondsData.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pondsData.map((pond) => (
            <div key={pond.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-white font-medium">{pond.name}</h4>
                <div className={`w-3 h-3 rounded-full ${getStatusColor(pond.status)}`}></div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">Water Quality</span>
                  <span className="text-white">{pond.waterQuality}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Temperature</span>
                  <span className="text-white">{pond.temperature}°F</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Threats</span>
                  <span className="text-white">
                    {Object.values(pond.chemicalThreats).filter((t) => t.detected).length +
                      Object.values(pond.biologicalThreats).filter((t) => t.detected).length}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
