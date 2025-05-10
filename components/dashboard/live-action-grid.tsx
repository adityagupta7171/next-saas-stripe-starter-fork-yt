"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, LineChart, BarChart3, Bell, BellOff } from "lucide-react"
import type { Stock } from "@/types/stock"

interface LiveActionGridProps {
  selectedMarkets: string[]
  searchQuery: string
  onViewChart: (stock: Stock) => void
  onViewFundamentals: (stock: Stock) => void
}

export function LiveActionGrid({ selectedMarkets, searchQuery, onViewChart, onViewFundamentals }: LiveActionGridProps) {
  const [alerts, setAlerts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data fetching
  useEffect(() => {
    const fetchLiveAlerts = async () => {
      setLoading(true)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock data
      const mockAlerts = [
        {
          id: 1,
          stock: {
            id: 1,
            name: "Apple Inc.",
            symbol: "AAPL",
            market: "US",
            currentPrice: 182.52,
            predictedTrend: "up",
            predictionPrice: 175.3,
            priceMovementPercentage: 4.12,
            accuracyPercentage: 78,
            targetLow: 190.0,
            targetHigh: 210.0,
            likesCount: 245,
            dislikesCount: 32,
            isStarred: false,
            stockPack: "tech",
          },
          alertType: "price_surge",
          message: "AAPL surging with high volume",
          priceAtAlert: 182.52,
          percentageChange: 4.12,
          isActive: true,
          createdAt: "2 hours ago",
        },
        {
          id: 2,
          stock: {
            id: 2,
            name: "Microsoft Corp.",
            symbol: "MSFT",
            market: "US",
            currentPrice: 415.5,
            predictedTrend: "up",
            predictionPrice: 400.0,
            priceMovementPercentage: 3.88,
            accuracyPercentage: 82,
            targetLow: 430.0,
            targetHigh: 450.0,
            likesCount: 312,
            dislikesCount: 28,
            isStarred: true,
            stockPack: "tech",
          },
          alertType: "target_reached",
          message: "MSFT reached target price of $415",
          priceAtAlert: 415.5,
          percentageChange: 3.88,
          isActive: true,
          createdAt: "30 minutes ago",
        },
        {
          id: 3,
          stock: {
            id: 3,
            name: "Tesla Inc.",
            symbol: "TSLA",
            market: "US",
            currentPrice: 175.34,
            predictedTrend: "down",
            predictionPrice: 190.0,
            priceMovementPercentage: -7.72,
            accuracyPercentage: 65,
            targetLow: 160.0,
            targetHigh: 180.0,
            likesCount: 156,
            dislikesCount: 98,
            isStarred: false,
            stockPack: "tech",
          },
          alertType: "price_drop",
          message: "TSLA dropping rapidly on news",
          priceAtAlert: 175.34,
          percentageChange: -7.72,
          isActive: true,
          createdAt: "15 minutes ago",
        },
        {
          id: 4,
          stock: {
            id: 4,
            name: "Reliance Industries",
            symbol: "RELIANCE",
            market: "India",
            currentPrice: 2950.75,
            predictedTrend: "up",
            predictionPrice: 2800.0,
            priceMovementPercentage: 5.38,
            accuracyPercentage: 74,
            targetLow: 3100.0,
            targetHigh: 3300.0,
            likesCount: 189,
            dislikesCount: 42,
            isStarred: false,
            stockPack: "energy",
          },
          alertType: "volume_spike",
          message: "RELIANCE trading at 3x average volume",
          priceAtAlert: 2950.75,
          percentageChange: 5.38,
          isActive: true,
          createdAt: "1 hour ago",
        },
      ]

      // Filter by markets
      let filteredAlerts = mockAlerts.filter((alert) => selectedMarkets.includes(alert.stock.market))

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        filteredAlerts = filteredAlerts.filter(
          (alert) => alert.stock.name.toLowerCase().includes(query) || alert.stock.symbol.toLowerCase().includes(query),
        )
      }

      setAlerts(filteredAlerts)
      setLoading(false)
    }

    fetchLiveAlerts()
  }, [selectedMarkets, searchQuery])

  const toggleAlert = (alertId: number) => {
    setAlerts(alerts.map((alert) => (alert.id === alertId ? { ...alert, isActive: !alert.isActive } : alert)))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (alerts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <h3 className="text-xl font-semibold mb-2">No live alerts found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or search query</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      {alerts.map((alert) => (
        <Card key={alert.id} className="overflow-hidden">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="flex items-center">
              <Zap className="mr-2 h-5 w-5 text-amber-500" />
              Live Alert
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleAlert(alert.id)}
              title={alert.isActive ? "Mute alert" : "Unmute alert"}
            >
              {alert.isActive ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{alert.stock.symbol}</h3>
                  <Badge
                    variant={
                      alert.alertType === "price_surge" ||
                      alert.alertType === "target_reached" ||
                      alert.alertType === "volume_spike"
                        ? "success"
                        : "destructive"
                    }
                  >
                    {alert.alertType.replace("_", " ")}
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground">{alert.createdAt}</span>
              </div>
              <p className="text-sm mb-2">{alert.message}</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Price at Alert</p>
                  <p className="font-medium">${alert.priceAtAlert.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Change</p>
                  <p className={`font-medium ${alert.percentageChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {alert.percentageChange >= 0 ? "+" : ""}
                    {alert.percentageChange.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => onViewChart(alert.stock)}>
                <LineChart className="h-4 w-4 mr-2" />
                Chart
              </Button>
              <Button variant="outline" size="sm" className="flex-1" onClick={() => onViewFundamentals(alert.stock)}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Fundamentals
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
