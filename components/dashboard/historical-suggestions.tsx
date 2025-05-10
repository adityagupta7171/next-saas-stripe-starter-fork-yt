"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Calendar, CheckCircle, ExternalLink, LineChart, XCircle } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface HistoricalSuggestionsProps {
  selectedMarkets: string[]
  searchQuery: string
}

interface HistoricalSuggestion {
  id: number
  symbol: string
  name: string
  market: string
  suggestedPrice: number
  targetPrice: number
  actualPriceReached: number
  returnPercentage: number
  suggestionDate: string
  targetReachedDate: string
  accuracyPercentage: number
  initialConfidenceScore: number
  lowestConfidenceScore: number
  confidenceDropDate: string
  status: "completed" | "ongoing" | "stopped"
  result: "hit_target" | "missed" | "still_open"
  chartData: { date: string; price: number; confidence?: number }[]
}

export function HistoricalSuggestions({ selectedMarkets, searchQuery }: HistoricalSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<HistoricalSuggestion[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"all" | "completed" | "ongoing" | "stopped">("all")
  const [selectedSuggestion, setSelectedSuggestion] = useState<HistoricalSuggestion | null>(null)

  // Mock data fetching
  useEffect(() => {
    const fetchHistoricalSuggestions = async () => {
      setLoading(true)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock data
      const mockSuggestions: HistoricalSuggestion[] = [
        {
          id: 1,
          symbol: "AAPL",
          name: "Apple Inc.",
          market: "US",
          suggestedPrice: 150.25,
          targetPrice: 180.0,
          actualPriceReached: 182.52,
          returnPercentage: 21.48,
          suggestionDate: "2023-01-15",
          targetReachedDate: "2023-04-22",
          accuracyPercentage: 92,
          initialConfidenceScore: 88,
          lowestConfidenceScore: 72,
          confidenceDropDate: "2023-03-10",
          status: "completed",
          result: "hit_target",
          chartData: generateMockChartData(150.25, 182.52, "2023-01-15", "2023-04-22", true),
        },
        {
          id: 2,
          symbol: "MSFT",
          name: "Microsoft Corp.",
          market: "US",
          suggestedPrice: 320.75,
          targetPrice: 400.0,
          actualPriceReached: 415.5,
          returnPercentage: 29.54,
          suggestionDate: "2023-02-10",
          targetReachedDate: "2023-05-18",
          accuracyPercentage: 95,
          initialConfidenceScore: 92,
          lowestConfidenceScore: 85,
          confidenceDropDate: "2023-04-05",
          status: "completed",
          result: "hit_target",
          chartData: generateMockChartData(320.75, 415.5, "2023-02-10", "2023-05-18", true),
        },
        {
          id: 3,
          symbol: "GOOGL",
          name: "Alphabet Inc.",
          market: "US",
          suggestedPrice: 110.5,
          targetPrice: 140.0,
          actualPriceReached: 142.45,
          returnPercentage: 28.91,
          suggestionDate: "2023-03-05",
          targetReachedDate: "2023-06-30",
          accuracyPercentage: 90,
          initialConfidenceScore: 86,
          lowestConfidenceScore: 78,
          confidenceDropDate: "2023-05-15",
          status: "completed",
          result: "hit_target",
          chartData: generateMockChartData(110.5, 142.45, "2023-03-05", "2023-06-30", true),
        },
        {
          id: 4,
          symbol: "RELIANCE",
          name: "Reliance Industries",
          market: "India",
          suggestedPrice: 2400.0,
          targetPrice: 2800.0,
          actualPriceReached: 2950.75,
          returnPercentage: 22.95,
          suggestionDate: "2023-02-20",
          targetReachedDate: "2023-05-10",
          accuracyPercentage: 88,
          initialConfidenceScore: 84,
          lowestConfidenceScore: 76,
          confidenceDropDate: "2023-04-01",
          status: "completed",
          result: "hit_target",
          chartData: generateMockChartData(2400.0, 2950.75, "2023-02-20", "2023-05-10", true),
        },
        {
          id: 5,
          symbol: "HDFCBANK",
          name: "HDFC Bank",
          market: "India",
          suggestedPrice: 1450.0,
          targetPrice: 1650.0,
          actualPriceReached: 1675.2,
          returnPercentage: 15.53,
          suggestionDate: "2023-01-25",
          targetReachedDate: "2023-04-15",
          accuracyPercentage: 85,
          initialConfidenceScore: 82,
          lowestConfidenceScore: 75,
          confidenceDropDate: "2023-03-20",
          status: "completed",
          result: "hit_target",
          chartData: generateMockChartData(1450.0, 1675.2, "2023-01-25", "2023-04-15", true),
        },
        {
          id: 6,
          symbol: "TSLA",
          name: "Tesla Inc.",
          market: "US",
          suggestedPrice: 220.0,
          targetPrice: 180.0,
          actualPriceReached: 175.34,
          returnPercentage: 20.3,
          suggestionDate: "2023-05-10",
          targetReachedDate: "2023-07-25",
          accuracyPercentage: 92,
          initialConfidenceScore: 88,
          lowestConfidenceScore: 65,
          confidenceDropDate: "2023-06-30",
          status: "completed",
          result: "hit_target",
          chartData: generateMockChartData(220.0, 175.34, "2023-05-10", "2023-07-25", false),
        },
        {
          id: 7,
          symbol: "AMZN",
          name: "Amazon.com Inc.",
          market: "US",
          suggestedPrice: 130.0,
          targetPrice: 150.0,
          actualPriceReached: 142.5,
          returnPercentage: 9.62,
          suggestionDate: "2023-06-15",
          targetReachedDate: "",
          accuracyPercentage: 78,
          initialConfidenceScore: 80,
          lowestConfidenceScore: 62,
          confidenceDropDate: "2023-08-01",
          status: "ongoing",
          result: "still_open",
          chartData: generateMockChartData(130.0, 142.5, "2023-06-15", "2023-09-15", true, true),
        },
        {
          id: 8,
          symbol: "META",
          name: "Meta Platforms Inc.",
          market: "US",
          suggestedPrice: 280.0,
          targetPrice: 320.0,
          actualPriceReached: 305.0,
          returnPercentage: 8.93,
          suggestionDate: "2023-07-01",
          targetReachedDate: "",
          accuracyPercentage: 82,
          initialConfidenceScore: 85,
          lowestConfidenceScore: 75,
          confidenceDropDate: "2023-08-15",
          status: "ongoing",
          result: "still_open",
          chartData: generateMockChartData(280.0, 305.0, "2023-07-01", "2023-09-15", true, true),
        },
        {
          id: 9,
          symbol: "NFLX",
          name: "Netflix Inc.",
          market: "US",
          suggestedPrice: 450.0,
          targetPrice: 500.0,
          actualPriceReached: 420.0,
          returnPercentage: -6.67,
          suggestionDate: "2023-05-20",
          targetReachedDate: "",
          accuracyPercentage: 65,
          initialConfidenceScore: 75,
          lowestConfidenceScore: 45,
          confidenceDropDate: "2023-07-10",
          status: "stopped",
          result: "missed",
          chartData: generateMockChartData(450.0, 420.0, "2023-05-20", "2023-08-01", false, false, true),
        },
      ]

      // Filter by markets
      let filteredSuggestions = mockSuggestions.filter((suggestion) => selectedMarkets.includes(suggestion.market))

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        filteredSuggestions = filteredSuggestions.filter(
          (suggestion) =>
            suggestion.name.toLowerCase().includes(query) || suggestion.symbol.toLowerCase().includes(query),
        )
      }

      // Filter by tab
      if (activeTab !== "all") {
        filteredSuggestions = filteredSuggestions.filter((suggestion) => suggestion.status === activeTab)
      }

      setSuggestions(filteredSuggestions)
      setLoading(false)
    }

    fetchHistoricalSuggestions()
  }, [selectedMarkets, searchQuery, activeTab])

  // Function to generate mock chart data
  function generateMockChartData(
    startPrice: number,
    endPrice: number,
    startDate: string,
    endDate: string,
    isPositive: boolean,
    isOngoing = false,
    wasStopped = false,
  ) {
    const data = []
    const start = new Date(startDate)
    const end = new Date(endDate)
    const daysDiff = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

    let currentPrice = startPrice
    const step = (endPrice - startPrice) / daysDiff
    const volatility = Math.abs(endPrice - startPrice) * 0.1

    let confidenceScore = isPositive ? 85 : 75
    const confidenceDecay = isPositive ? 0.1 : 0.3

    for (let i = 0; i <= daysDiff; i++) {
      const currentDate = new Date(start)
      currentDate.setDate(start.getDate() + i)

      // Add some randomness to the price movement
      const randomFactor = (Math.random() - 0.5) * volatility
      currentPrice += step + randomFactor

      // Ensure the price doesn't go negative
      currentPrice = Math.max(currentPrice, 0.01)

      // Gradually reduce confidence score with some randomness
      if (i > 0) {
        const confidenceRandom = (Math.random() - 0.5) * 2
        confidenceScore -= confidenceDecay + confidenceRandom

        // If it's a stopped prediction, make confidence drop sharply at the end
        if (wasStopped && i > daysDiff * 0.7) {
          confidenceScore -= 1.5
        }

        // Ensure confidence stays within reasonable bounds
        confidenceScore = Math.max(Math.min(confidenceScore, 95), 40)
      }

      data.push({
        date: currentDate.toISOString().split("T")[0],
        price: currentPrice,
        confidence: confidenceScore,
      })
    }

    // For ongoing predictions, add some future projected data points
    if (isOngoing) {
      const lastDate = new Date(data[data.length - 1].date)
      const lastPrice = data[data.length - 1].price
      const lastConfidence = data[data.length - 1].confidence

      for (let i = 1; i <= 10; i++) {
        const projectedDate = new Date(lastDate)
        projectedDate.setDate(lastDate.getDate() + i)

        // Project future price with increasing uncertainty
        const projectionRandomness = ((Math.random() - 0.5) * volatility * 1.5 * i) / 5
        const projectedPrice = lastPrice + step * i + projectionRandomness

        // Project future confidence with slight decay
        const projectedConfidence = Math.max(lastConfidence - i * 0.5, 40)

        data.push({
          date: projectedDate.toISOString().split("T")[0],
          price: projectedPrice,
          confidence: projectedConfidence,
        })
      }
    }

    return data
  }

  const handleViewDetails = (suggestion: HistoricalSuggestion) => {
    setSelectedSuggestion(suggestion)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (suggestions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <h3 className="text-xl font-semibold mb-2">No historical suggestions found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or search query</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Suggestions</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="stopped">Stopped</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {suggestions.map((suggestion) => (
              <Card key={suggestion.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-0">
                  {/* Header with stock name and symbol */}
                  <div className="flex items-center justify-between p-3 border-b">
                    <div>
                      <h3 className="font-semibold text-lg">{suggestion.symbol}</h3>
                      <p className="text-sm text-muted-foreground">{suggestion.name}</p>
                    </div>
                    <Badge
                      variant={
                        suggestion.result === "hit_target"
                          ? "success"
                          : suggestion.result === "missed"
                            ? "destructive"
                            : "outline"
                      }
                    >
                      {suggestion.result === "hit_target" && "Hit Target"}
                      {suggestion.result === "missed" && "Missed"}
                      {suggestion.result === "still_open" && "Still Open"}
                    </Badge>
                  </div>

                  {/* Prediction Stats Section */}
                  <div className="p-3 bg-muted/50 border-b">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p className="text-sm">{suggestion.suggestionDate}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-2">
                      <div>
                        <p className="text-xs text-muted-foreground">Predicted At</p>
                        <p className="text-lg font-bold">${suggestion.suggestedPrice.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Target Price</p>
                        <p className="text-lg font-bold">${suggestion.targetPrice.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-muted-foreground">Initial Confidence</p>
                        <p className="font-medium">{suggestion.initialConfidenceScore}%</p>
                      </div>
                      <Badge variant="outline" className="h-6 px-2">
                        {suggestion.accuracyPercentage}% Accuracy
                      </Badge>
                    </div>
                  </div>

                  {/* Outcome/Result Section */}
                  <div className="p-3">
                    {/* Mini chart with hover expansion */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="h-20 cursor-pointer hover:opacity-80 transition-opacity mb-3 relative group">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={suggestion.chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                              <defs>
                                <linearGradient id={`colorPrice-${suggestion.id}`} x1="0" y1="0" x2="0" y2="1">
                                  <stop
                                    offset="5%"
                                    stopColor={
                                      suggestion.returnPercentage >= 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"
                                    }
                                    stopOpacity={0.3}
                                  />
                                  <stop
                                    offset="95%"
                                    stopColor={
                                      suggestion.returnPercentage >= 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"
                                    }
                                    stopOpacity={0}
                                  />
                                </linearGradient>
                              </defs>
                              <Area
                                type="monotone"
                                dataKey="price"
                                stroke={suggestion.returnPercentage >= 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                                fillOpacity={1}
                                fill={`url(#colorPrice-${suggestion.id})`}
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
                          <h4 className="font-medium mb-2">{suggestion.symbol} Price Chart</h4>
                          <ResponsiveContainer width="100%" height="80%">
                            <AreaChart data={suggestion.chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                              <defs>
                                <linearGradient id={`colorPriceExpanded-${suggestion.id}`} x1="0" y1="0" x2="0" y2="1">
                                  <stop
                                    offset="5%"
                                    stopColor={
                                      suggestion.returnPercentage >= 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"
                                    }
                                    stopOpacity={0.3}
                                  />
                                  <stop
                                    offset="95%"
                                    stopColor={
                                      suggestion.returnPercentage >= 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"
                                    }
                                    stopOpacity={0}
                                  />
                                </linearGradient>
                              </defs>
                              <Area
                                type="monotone"
                                dataKey="price"
                                stroke={suggestion.returnPercentage >= 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                                fillOpacity={1}
                                fill={`url(#colorPriceExpanded-${suggestion.id})`}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </PopoverContent>
                    </Popover>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {suggestion.status === "completed" ? "Final Price" : "Current Price"}
                        </p>
                        <p className="font-medium">${suggestion.actualPriceReached.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Return</p>
                        <p
                          className={`font-medium ${
                            suggestion.returnPercentage >= 0 ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {suggestion.returnPercentage >= 0 ? "+" : ""}
                          {suggestion.returnPercentage.toFixed(2)}%
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      {suggestion.status === "completed" ? (
                        <div className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                          <span>Completed on {suggestion.targetReachedDate}</span>
                        </div>
                      ) : suggestion.status === "stopped" ? (
                        <div className="flex items-center text-sm">
                          <XCircle className="h-4 w-4 mr-1 text-red-500" />
                          <span>Stopped: Low confidence</span>
                        </div>
                      ) : (
                        <div className="text-sm">
                          <span>Confidence: {suggestion.lowestConfidenceScore}%</span>
                        </div>
                      )}

                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(suggestion)}>
                        <LineChart className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Detailed view modal */}
      {selectedSuggestion && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div>
                {selectedSuggestion.symbol} - {selectedSuggestion.name}
                <Badge
                  variant={
                    selectedSuggestion.result === "hit_target"
                      ? "success"
                      : selectedSuggestion.result === "missed"
                        ? "destructive"
                        : "outline"
                  }
                  className="ml-2"
                >
                  {selectedSuggestion.result === "hit_target" && "Hit Target"}
                  {selectedSuggestion.result === "missed" && "Missed"}
                  {selectedSuggestion.result === "still_open" && "Still Open"}
                </Badge>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedSuggestion(null)}>
                Close
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Price Movement</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={selectedSuggestion.chartData}
                      margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                    >
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tickMargin={10} tick={{ fontSize: 12 }} />
                      <YAxis
                        domain={["auto", "auto"]}
                        axisLine={false}
                        tickLine={false}
                        tickMargin={10}
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <defs>
                        <linearGradient id="colorPriceDetail" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="5%"
                            stopColor={
                              selectedSuggestion.returnPercentage >= 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"
                            }
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor={
                              selectedSuggestion.returnPercentage >= 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"
                            }
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke={selectedSuggestion.returnPercentage >= 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                        fillOpacity={1}
                        fill="url(#colorPriceDetail)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Confidence Score</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={selectedSuggestion.chartData}
                      margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                    >
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tickMargin={10} tick={{ fontSize: 12 }} />
                      <YAxis
                        domain={[40, 100]}
                        axisLine={false}
                        tickLine={false}
                        tickMargin={10}
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <defs>
                        <linearGradient id="colorConfidenceDetail" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="rgb(234, 179, 8)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="rgb(234, 179, 8)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="confidence"
                        stroke="rgb(234, 179, 8)"
                        fillOpacity={1}
                        fill="url(#colorConfidenceDetail)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div>
                <h4 className="font-medium mb-2">Prediction Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Suggested Price:</span>
                    <span className="font-medium">${selectedSuggestion.suggestedPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Target Price:</span>
                    <span className="font-medium">${selectedSuggestion.targetPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {selectedSuggestion.status === "completed" ? "Final Price:" : "Current Price:"}
                    </span>
                    <span className="font-medium">${selectedSuggestion.actualPriceReached.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Return:</span>
                    <span
                      className={
                        selectedSuggestion.returnPercentage >= 0
                          ? "text-green-500 font-medium"
                          : "text-red-500 font-medium"
                      }
                    >
                      {selectedSuggestion.returnPercentage >= 0 ? "+" : ""}
                      {selectedSuggestion.returnPercentage.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Timeline</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Suggested On:</span>
                    <span className="font-medium">{selectedSuggestion.suggestionDate}</span>
                  </div>
                  {selectedSuggestion.status === "completed" && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Completed On:</span>
                      <span className="font-medium">{selectedSuggestion.targetReachedDate}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Confidence Drop:</span>
                    <span className="font-medium">{selectedSuggestion.confidenceDropDate}</span>
                  </div>
                  {selectedSuggestion.status === "stopped" && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Stopped When:</span>
                      <span className="font-medium">Confidence below 50%</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Performance Metrics</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Accuracy:</span>
                    <span className="font-medium">{selectedSuggestion.accuracyPercentage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Initial Confidence:</span>
                    <span className="font-medium">{selectedSuggestion.initialConfidenceScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lowest Confidence:</span>
                    <span className="font-medium">{selectedSuggestion.lowestConfidenceScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Market:</span>
                    <span className="font-medium">{selectedSuggestion.market}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-2">Analysis</h4>
              <p className="text-muted-foreground">
                {selectedSuggestion.status === "completed" && selectedSuggestion.returnPercentage >= 0 && (
                  <>
                    This prediction was highly successful, reaching the target price with{" "}
                    {selectedSuggestion.accuracyPercentage}% accuracy. The confidence score remained strong throughout
                    the prediction period, indicating a stable trend. The stock performed as expected, delivering a
                    positive return of {selectedSuggestion.returnPercentage.toFixed(2)}%.
                  </>
                )}
                {selectedSuggestion.status === "completed" && selectedSuggestion.returnPercentage < 0 && (
                  <>
                    This prediction was successful in identifying the downward trend, with{" "}
                    {selectedSuggestion.accuracyPercentage}% accuracy. The confidence score remained relatively stable,
                    confirming our analysis. The stock moved as predicted, resulting in a potential gain of{" "}
                    {Math.abs(selectedSuggestion.returnPercentage).toFixed(2)}% for short positions.
                  </>
                )}
                {selectedSuggestion.status === "ongoing" && (
                  <>
                    This prediction is still active. The stock has moved{" "}
                    {selectedSuggestion.returnPercentage >= 0 ? "up" : "down"} by{" "}
                    {Math.abs(selectedSuggestion.returnPercentage).toFixed(2)}% since our initial suggestion. The
                    confidence score has dropped to {selectedSuggestion.lowestConfidenceScore}%, but remains above our
                    threshold for maintaining the prediction. We continue to monitor this stock for further
                    developments.
                  </>
                )}
                {selectedSuggestion.status === "stopped" && (
                  <>
                    This prediction was stopped when our confidence score fell below the 50% threshold on{" "}
                    {selectedSuggestion.confidenceDropDate}. The market conditions changed significantly from our
                    initial analysis, leading to increased uncertainty. We recommended exiting this position to minimize
                    potential losses.
                  </>
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
