"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import type { Stock } from "@/types/stock"

interface StockChartModalProps {
  stock: Stock
  isOpen: boolean
  onClose: () => void
}

export function StockChartModal({ stock, isOpen, onClose }: StockChartModalProps) {
  const [timeframe, setTimeframe] = useState<"1D" | "1W" | "1M" | "3M" | "1Y" | "5Y">("1M")
  const [chartType, setChartType] = useState<"line" | "candle" | "volume">("line")

  // Mock data - in a real app, this would come from an API
  const generateMockData = () => {
    const basePrice = stock.currentPrice
    const volatility = 0.02
    let price = basePrice
    const data = []

    const points =
      timeframe === "1D"
        ? 24
        : timeframe === "1W"
          ? 7
          : timeframe === "1M"
            ? 30
            : timeframe === "3M"
              ? 90
              : timeframe === "1Y"
                ? 12
                : 5

    for (let i = 0; i < points; i++) {
      const change = (Math.random() - 0.5) * volatility * price
      price += change

      let label
      if (timeframe === "1D") label = `${i}:00`
      else if (timeframe === "1W") label = `Day ${i + 1}`
      else if (timeframe === "1M" || timeframe === "3M") label = `Day ${i + 1}`
      else if (timeframe === "1Y") label = `Month ${i + 1}`
      else label = `Year ${i + 1}`

      data.push({
        time: label,
        price: Number.parseFloat(price.toFixed(2)),
        volume: Math.floor(Math.random() * 1000000) + 500000,
      })
    }

    return data
  }

  const chartData = generateMockData()
  const startPrice = chartData[0].price
  const endPrice = chartData[chartData.length - 1].price
  const priceChange = endPrice - startPrice
  const percentChange = ((priceChange / startPrice) * 100).toFixed(2)
  const isPositive = priceChange >= 0

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div>
              {stock.symbol} - {stock.name}
              <span className={`ml-2 ${isPositive ? "text-green-500" : "text-red-500"}`}>
                {isPositive ? "+" : ""}
                {priceChange.toFixed(2)} ({isPositive ? "+" : ""}
                {percentChange}%)
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="chart" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="chart">Chart</TabsTrigger>
              <TabsTrigger value="volume">Volume</TabsTrigger>
            </TabsList>

            <div className="flex gap-1">
              {(["1D", "1W", "1M", "3M", "1Y", "5Y"] as const).map((tf) => (
                <Button
                  key={tf}
                  variant={timeframe === tf ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setTimeframe(tf)}
                >
                  {tf}
                </Button>
              ))}
            </div>
          </div>

          <TabsContent value="chart" className="mt-0">
            <div className="h-[400px]">
              <ChartContainer
                config={{
                  price: {
                    label: "Price",
                    color: isPositive ? "hsl(var(--chart-1))" : "hsl(var(--chart-3))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor={isPositive ? "hsl(var(--chart-1))" : "hsl(var(--chart-3))"}
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor={isPositive ? "hsl(var(--chart-1))" : "hsl(var(--chart-3))"}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="time"
                      axisLine={false}
                      tickLine={false}
                      tickMargin={10}
                      minTickGap={10}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      domain={["auto", "auto"]}
                      axisLine={false}
                      tickLine={false}
                      tickMargin={10}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke={isPositive ? "hsl(var(--chart-1))" : "hsl(var(--chart-3))"}
                      fillOpacity={1}
                      fill="url(#colorPrice)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>

          <TabsContent value="volume" className="mt-0">
            <div className="h-[400px]">
              <ChartContainer
                config={{
                  volume: {
                    label: "Volume",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <XAxis
                      dataKey="time"
                      axisLine={false}
                      tickLine={false}
                      tickMargin={10}
                      minTickGap={10}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      domain={["auto", "auto"]}
                      axisLine={false}
                      tickLine={false}
                      tickMargin={10}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                    />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="volume" fill="hsl(var(--chart-2))" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
