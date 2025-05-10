"use client"

import { Home, LineChart, List, PieChart, Settings, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardSidebarProps {
  selectedStock: string
  onSelectStock: (symbol: string) => void
}

export function DashboardSidebar({ selectedStock, onSelectStock }: DashboardSidebarProps) {
  const popularStocks = [
    { symbol: "AAPL", name: "Apple Inc." },
    { symbol: "MSFT", name: "Microsoft Corp." },
    { symbol: "GOOGL", name: "Alphabet Inc." },
    { symbol: "AMZN", name: "Amazon.com Inc." },
    { symbol: "TSLA", name: "Tesla Inc." },
  ]

  return (
    <div className="hidden border-r bg-background md:block md:w-64">
      <div className="flex h-full flex-col gap-2 p-4">
        <div className="flex flex-col gap-1">
          <Button variant="ghost" className="justify-start gap-2">
            <Home className="h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <LineChart className="h-4 w-4" />
            Market Overview
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <Star className="h-4 w-4" />
            Watchlist
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <PieChart className="h-4 w-4" />
            Portfolio
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <List className="h-4 w-4" />
            Transactions
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
        <div className="mt-6">
          <h3 className="mb-2 text-sm font-medium">Popular Stocks</h3>
          <div className="flex flex-col gap-1">
            {popularStocks.map((stock) => (
              <Button
                key={stock.symbol}
                variant={selectedStock === stock.symbol ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => onSelectStock(stock.symbol)}
              >
                {stock.symbol} - {stock.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
