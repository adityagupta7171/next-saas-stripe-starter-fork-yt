"use client"

import { ArrowDown, ArrowUp, DollarSign, Percent, TrendingDown, TrendingUp, Volume2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StockMetricsProps {
  symbol: string
}

export function StockMetrics({ symbol }: StockMetricsProps) {
  // Mock data - in a real app, this would come from an API
  const getMetrics = () => {
    const basePrice =
      symbol === "AAPL"
        ? 180
        : symbol === "MSFT"
          ? 350
          : symbol === "GOOGL"
            ? 140
            : symbol === "AMZN"
              ? 130
              : symbol === "TSLA"
                ? 200
                : 100

    const priceChange = (Math.random() * 10 - 5).toFixed(2)
    const percentChange = ((Number.parseFloat(priceChange) / basePrice) * 100).toFixed(2)
    const volume = Math.floor(Math.random() * 10000000) + 5000000
    const marketCap = (basePrice * (Math.floor(Math.random() * 5) + 5) * 1000000000).toFixed(2)

    return {
      price: basePrice,
      priceChange: Number.parseFloat(priceChange),
      percentChange: Number.parseFloat(percentChange),
      volume,
      marketCap: Number.parseFloat(marketCap),
    }
  }

  const metrics = getMetrics()

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Current Price</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${metrics.price.toFixed(2)}</div>
          <div className="flex items-center">
            <span className={metrics.priceChange >= 0 ? "text-green-500" : "text-red-500"}>
              {metrics.priceChange >= 0 ? <ArrowUp className="mr-1 h-4 w-4" /> : <ArrowDown className="mr-1 h-4 w-4" />}
              ${Math.abs(metrics.priceChange).toFixed(2)}
            </span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Percent Change</CardTitle>
          <Percent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Math.abs(metrics.percentChange).toFixed(2)}%</div>
          <div className="flex items-center">
            <span className={metrics.percentChange >= 0 ? "text-green-500" : "text-red-500"}>
              {metrics.percentChange >= 0 ? (
                <TrendingUp className="mr-1 h-4 w-4" />
              ) : (
                <TrendingDown className="mr-1 h-4 w-4" />
              )}
              {metrics.percentChange >= 0 ? "Increase" : "Decrease"}
            </span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Volume</CardTitle>
          <Volume2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{(metrics.volume / 1000000).toFixed(2)}M</div>
          <p className="text-xs text-muted-foreground">Shares traded today</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Market Cap</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${(metrics.marketCap / 1000000000).toFixed(2)}B</div>
          <p className="text-xs text-muted-foreground">Total company value</p>
        </CardContent>
      </Card>
    </>
  )
}
