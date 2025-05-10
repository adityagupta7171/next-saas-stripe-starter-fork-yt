"use client"

import { useState, useEffect } from "react"
import { Star, BarChart3, ThumbsUp, ThumbsDown, Ban, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Area, AreaChart, ResponsiveContainer } from "recharts"
import type { Stock } from "@/types/stock"

interface StockGridProps {
  selectedMarkets: string[]
  selectedStockPacks: string[]
  searchQuery: string
  onViewChart: (stock: Stock) => void
  onViewFundamentals: (stock: Stock) => void
  onStarStock: (stockId: number) => void
}

export function StockGrid({
  selectedMarkets,
  selectedStockPacks,
  searchQuery,
  onViewChart,
  onViewFundamentals,
  onStarStock,
}: StockGridProps) {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [loading, setLoading] = useState(true)
  const [blacklistedStocks, setBlacklistedStocks] = useState<number[]>([])

  // Mock data fetching
  useEffect(() => {
    // In a real app, this would be an API call with filters
    const fetchStocks = async () => {
      setLoading(true)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock data
      const mockStocks: Stock[] = [
        {
          id: 1,
          name: "Apple Inc.",
          symbol: "AAPL",
          market: "US",
          currentPrice: 182.52,
          previousClose: 180.25,
          dayChange: 2.27,
          dayChangePercent: 1.26,
          predictedTrend: "up",
          predictionPrice: 175.3,
          priceMovementPercentage: 4.12,
          accuracyPercentage: 78,
          confidenceScore: 88,
          targetLow: 190.0,
          targetHigh: 210.0,
          likesCount: 245,
          dislikesCount: 32,
          isStarred: false,
          stockPack: "tech",
          chartData: generateMockChartData(175.3, 182.52, 30),
        },
        {
          id: 2,
          name: "Microsoft Corp.",
          symbol: "MSFT",
          market: "US",
          currentPrice: 415.5,
          previousClose: 410.2,
          dayChange: 5.3,
          dayChangePercent: 1.29,
          predictedTrend: "up",
          predictionPrice: 400.0,
          priceMovementPercentage: 3.88,
          accuracyPercentage: 82,
          confidenceScore: 92,
          targetLow: 430.0,
          targetHigh: 450.0,
          likesCount: 312,
          dislikesCount: 28,
          isStarred: true,
          stockPack: "tech",
          chartData: generateMockChartData(400.0, 415.5, 30),
        },
        {
          id: 3,
          name: "Tesla Inc.",
          symbol: "TSLA",
          market: "US",
          currentPrice: 175.34,
          previousClose: 180.5,
          dayChange: -5.16,
          dayChangePercent: -2.86,
          predictedTrend: "down",
          predictionPrice: 190.0,
          priceMovementPercentage: -7.72,
          accuracyPercentage: 65,
          confidenceScore: 72,
          targetLow: 160.0,
          targetHigh: 180.0,
          likesCount: 156,
          dislikesCount: 98,
          isStarred: false,
          stockPack: "tech",
          chartData: generateMockChartData(190.0, 175.34, 30, false),
        },
        {
          id: 4,
          name: "Reliance Industries",
          symbol: "RELIANCE",
          market: "India",
          currentPrice: 2950.75,
          previousClose: 2900.0,
          dayChange: 50.75,
          dayChangePercent: 1.75,
          predictedTrend: "up",
          predictionPrice: 2800.0,
          priceMovementPercentage: 5.38,
          accuracyPercentage: 74,
          confidenceScore: 85,
          targetLow: 3100.0,
          targetHigh: 3300.0,
          likesCount: 189,
          dislikesCount: 42,
          isStarred: false,
          stockPack: "energy",
          chartData: generateMockChartData(2800.0, 2950.75, 30),
        },
        {
          id: 5,
          name: "HDFC Bank",
          symbol: "HDFCBANK",
          market: "India",
          currentPrice: 1675.2,
          previousClose: 1680.0,
          dayChange: -4.8,
          dayChangePercent: -0.29,
          predictedTrend: "neutral",
          predictionPrice: 1680.0,
          priceMovementPercentage: -0.29,
          accuracyPercentage: 91,
          confidenceScore: 65,
          targetLow: 1650.0,
          targetHigh: 1750.0,
          likesCount: 210,
          dislikesCount: 15,
          isStarred: true,
          stockPack: "finance",
          chartData: generateMockChartData(1680.0, 1675.2, 30, false),
        },
        {
          id: 6,
          name: "JPMorgan Chase",
          symbol: "JPM",
          market: "US",
          currentPrice: 198.45,
          previousClose: 195.2,
          dayChange: 3.25,
          dayChangePercent: 1.67,
          predictedTrend: "up",
          predictionPrice: 190.0,
          priceMovementPercentage: 4.45,
          accuracyPercentage: 79,
          confidenceScore: 81,
          targetLow: 205.0,
          targetHigh: 220.0,
          likesCount: 178,
          dislikesCount: 34,
          isStarred: false,
          stockPack: "finance",
          chartData: generateMockChartData(190.0, 198.45, 30),
        },
        {
          id: 7,
          name: "AstraZeneca",
          symbol: "AZN",
          market: "UK",
          currentPrice: 12450.0,
          previousClose: 12300.0,
          dayChange: 150.0,
          dayChangePercent: 1.22,
          predictedTrend: "up",
          predictionPrice: 12000.0,
          priceMovementPercentage: 3.75,
          accuracyPercentage: 72,
          confidenceScore: 77,
          targetLow: 12800.0,
          targetHigh: 13200.0,
          likesCount: 145,
          dislikesCount: 38,
          isStarred: false,
          stockPack: "healthcare",
          chartData: generateMockChartData(12000.0, 12450.0, 30),
        },
        {
          id: 8,
          name: "Siemens AG",
          symbol: "SIE",
          market: "Germany",
          currentPrice: 175.8,
          previousClose: 180.2,
          dayChange: -4.4,
          dayChangePercent: -2.44,
          predictedTrend: "down",
          predictionPrice: 185.0,
          priceMovementPercentage: -4.97,
          accuracyPercentage: 68,
          confidenceScore: 70,
          targetLow: 170.0,
          targetHigh: 180.0,
          likesCount: 98,
          dislikesCount: 65,
          isStarred: false,
          stockPack: "industrial",
          chartData: generateMockChartData(185.0, 175.8, 30, false),
        },
      ]

      // Filter by markets
      let filteredStocks = mockStocks.filter((stock) => selectedMarkets.includes(stock.market))

      // Filter by stock packs if any are selected
      if (selectedStockPacks.length > 0) {
        filteredStocks = filteredStocks.filter((stock) => selectedStockPacks.includes(stock.stockPack))
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        filteredStocks = filteredStocks.filter(
          (stock) => stock.name.toLowerCase().includes(query) || stock.symbol.toLowerCase().includes(query),
        )
      }

      // Filter out blacklisted stocks
      filteredStocks = filteredStocks.filter((stock) => !blacklistedStocks.includes(stock.id))

      setStocks(filteredStocks)
      setLoading(false)
    }

    fetchStocks()
  }, [selectedMarkets, selectedStockPacks, searchQuery, blacklistedStocks])

  // Function to generate mock chart data
  function generateMockChartData(startPrice: number, endPrice: number, days: number, isPositive = true) {
    const data = []
    let currentPrice = startPrice
    const step = (endPrice - startPrice) / days
    const volatility = Math.abs(endPrice - startPrice) * 0.05

    for (let i = 0; i < days; i++) {
      // Add some randomness to the price movement
      const randomFactor = (Math.random() - 0.5) * volatility
      currentPrice += step + randomFactor

      // Ensure the price doesn't go negative
      currentPrice = Math.max(currentPrice, 0.01)

      data.push({
        day: i,
        price: currentPrice,
      })
    }

    return data
  }

  const handleBlacklistStock = (stockId: number) => {
    setBlacklistedStocks([...blacklistedStocks, stockId])
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (stocks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <h3 className="text-xl font-semibold mb-2">No stocks found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or search query</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {stocks.map((stock) => (
        <Card key={stock.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-0">
            {/* Header with stock name and symbol */}
            <div className="flex items-center justify-between p-3 border-b">
              <div>
                <h3 className="font-semibold text-lg flex items-center">
                  {stock.symbol}
                  <Badge
                    variant={
                      stock.predictedTrend === "up"
                        ? "success"
                        : stock.predictedTrend === "down"
                          ? "destructive"
                          : "outline"
                    }
                    className="ml-2"
                  >
                    {stock.predictedTrend === "up" ? "↑" : stock.predictedTrend === "down" ? "↓" : "→"}
                  </Badge>
                </h3>
                <p className="text-sm text-muted-foreground">{stock.name}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">${stock.currentPrice.toFixed(2)}</p>
                <p className={`text-sm ${stock.dayChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {stock.dayChange >= 0 ? "+" : ""}${Math.abs(stock.dayChange).toFixed(2)} (
                  {stock.dayChange >= 0 ? "+" : ""}
                  {stock.dayChangePercent.toFixed(2)}%)
                </p>
              </div>
            </div>

            {/* Prediction Stats Block (highlighted) */}
            <div className="p-3 bg-muted/50">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-xs text-muted-foreground">Predicted At</p>
                  <p className="text-xl font-bold">${stock.predictionPrice.toFixed(2)}</p>
                </div>
                <Badge variant="outline" className="h-6 px-2">
                  {stock.accuracyPercentage}% Accuracy
                </Badge>
              </div>

              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-xs text-muted-foreground">Change Since Prediction</p>
                  <p
                    className={`font-medium ${stock.priceMovementPercentage >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {stock.priceMovementPercentage >= 0 ? "+" : ""}
                    {stock.priceMovementPercentage.toFixed(2)}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Trend Confidence</p>
                  <p className="font-medium">{stock.confidenceScore}%</p>
                </div>
              </div>

              <Progress
                value={stock.confidenceScore}
                className="h-2"
                indicatorClassName={
                  stock.confidenceScore >= 80
                    ? "bg-green-500"
                    : stock.confidenceScore >= 60
                      ? "bg-amber-500"
                      : "bg-red-500"
                }
              />
            </div>

            {/* Engagement & Mini-Chart Block */}
            <div className="p-3">
              {/* Mini chart with hover expansion */}
              <Popover>
                <PopoverTrigger asChild>
                  <div className="h-20 cursor-pointer hover:opacity-80 transition-opacity mb-3 relative group">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={stock.chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id={`colorPrice-${stock.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop
                              offset="5%"
                              stopColor={stock.priceMovementPercentage >= 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="95%"
                              stopColor={stock.priceMovementPercentage >= 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="price"
                          stroke={stock.priceMovementPercentage >= 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                          fillOpacity={1}
                          fill={`url(#colorPrice-${stock.id})`}
                          isAnimationActive={false}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 rounded">
                      <ExternalLink className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0">
                  <div className="h-48 p-4">
                    <h4 className="font-medium mb-2">{stock.symbol} Price Chart</h4>
                    <ResponsiveContainer width="100%" height="80%">
                      <AreaChart data={stock.chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <defs>
                          <linearGradient id={`colorPriceExpanded-${stock.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop
                              offset="5%"
                              stopColor={stock.priceMovementPercentage >= 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="95%"
                              stopColor={stock.priceMovementPercentage >= 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="price"
                          stroke={stock.priceMovementPercentage >= 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                          fillOpacity={1}
                          fill={`url(#colorPriceExpanded-${stock.id})`}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Action buttons and engagement metrics */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-1 text-green-500" />
                    <span className="text-sm">{stock.likesCount}</span>
                  </div>
                  <div className="flex items-center">
                    <ThumbsDown className="h-4 w-4 mr-1 text-red-500" />
                    <span className="text-sm">{stock.dislikesCount}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={stock.isStarred ? "text-yellow-500" : ""}
                          onClick={() => onStarStock(stock.id)}
                        >
                          <Star className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{stock.isStarred ? "Remove from favorites" : "Add to favorites"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => handleBlacklistStock(stock.id)}>
                          <Ban className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Hide this stock</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Button variant="outline" size="sm" onClick={() => onViewFundamentals(stock)}>
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
