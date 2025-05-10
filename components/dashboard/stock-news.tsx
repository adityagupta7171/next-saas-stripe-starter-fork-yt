"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Newspaper } from "lucide-react"

interface StockNewsProps {
  symbol: string
}

export function StockNews({ symbol }: StockNewsProps) {
  // Mock news data - in a real app, this would come from an API
  const getNewsItems = () => {
    const baseNews = [
      {
        title: "Markets rally as tech stocks surge",
        source: "Financial Times",
        time: "2 hours ago",
        url: "#",
      },
      {
        title: "Investors eye upcoming earnings reports",
        source: "Wall Street Journal",
        time: "4 hours ago",
        url: "#",
      },
      {
        title: "Fed signals potential rate cuts later this year",
        source: "Bloomberg",
        time: "6 hours ago",
        url: "#",
      },
    ]

    // Add some stock-specific news
    const stockNews = [
      {
        title: `${symbol} announces new product line`,
        source: "CNBC",
        time: "1 hour ago",
        url: "#",
      },
      {
        title: `Analysts raise price target for ${symbol}`,
        source: "MarketWatch",
        time: "3 hours ago",
        url: "#",
      },
    ]

    return [...stockNews, ...baseNews]
  }

  const newsItems = getNewsItems()

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Newspaper className="mr-2 h-5 w-5" />
          Latest News
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {newsItems.map((item, index) => (
            <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
              <a href={item.url} className="font-medium hover:underline">
                {item.title}
              </a>
              <div className="mt-1 flex text-sm text-muted-foreground">
                <span>{item.source}</span>
                <span className="mx-2">•</span>
                <span>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
