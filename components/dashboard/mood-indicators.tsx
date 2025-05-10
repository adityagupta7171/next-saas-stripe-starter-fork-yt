"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Smile, Meh, Frown, TrendingUp, TrendingDown } from "lucide-react"

export function MoodIndicators() {
  // Mock data - in a real app, this would come from an API
  const marketMood = {
    daily: {
      value: 7,
      trend: "up",
      description: "Bullish sentiment with strong buying pressure",
    },
    weekly: {
      value: 6,
      trend: "neutral",
      description: "Cautiously optimistic with mixed signals",
    },
  }

  const getMoodIcon = (value: number) => {
    if (value >= 7) return <Smile className="h-6 w-6 text-green-500" />
    if (value >= 4) return <Meh className="h-6 w-6 text-amber-500" />
    return <Frown className="h-6 w-6 text-red-500" />
  }

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-green-500" />
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-red-500" />
    return null
  }

  const getMoodLabel = (value: number) => {
    if (value >= 8) return "Very Bullish"
    if (value >= 6) return "Bullish"
    if (value >= 5) return "Slightly Bullish"
    if (value >= 4) return "Neutral"
    if (value >= 3) return "Slightly Bearish"
    if (value >= 2) return "Bearish"
    return "Very Bearish"
  }

  const getMoodColor = (value: number) => {
    if (value >= 7) return "bg-green-500"
    if (value >= 4) return "bg-amber-500"
    return "bg-red-500"
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {getMoodIcon(marketMood.daily.value)}
              <div>
                <h3 className="font-semibold">Daily Market Mood</h3>
                <div className="flex items-center text-sm">
                  <span className="mr-1">{getMoodLabel(marketMood.daily.value)}</span>
                  {getTrendIcon(marketMood.daily.trend)}
                </div>
              </div>
            </div>
            <div className="text-2xl font-bold">{marketMood.daily.value}/10</div>
          </div>
          <Progress
            value={marketMood.daily.value * 10}
            className="h-2"
            indicatorClassName={getMoodColor(marketMood.daily.value)}
          />
          <p className="mt-2 text-sm text-muted-foreground">{marketMood.daily.description}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {getMoodIcon(marketMood.weekly.value)}
              <div>
                <h3 className="font-semibold">Weekly Market Mood</h3>
                <div className="flex items-center text-sm">
                  <span className="mr-1">{getMoodLabel(marketMood.weekly.value)}</span>
                  {getTrendIcon(marketMood.weekly.trend)}
                </div>
              </div>
            </div>
            <div className="text-2xl font-bold">{marketMood.weekly.value}/10</div>
          </div>
          <Progress
            value={marketMood.weekly.value * 10}
            className="h-2"
            indicatorClassName={getMoodColor(marketMood.weekly.value)}
          />
          <p className="mt-2 text-sm text-muted-foreground">{marketMood.weekly.description}</p>
        </CardContent>
      </Card>
    </div>
  )
}
