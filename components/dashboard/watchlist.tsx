"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Star, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"

interface WatchlistProps {
  selectedStock: string
  onSelectStock: (symbol: string) => void
}

export function Watchlist({ selectedStock, onSelectStock }: WatchlistProps) {
  const [watchlist, setWatchlist] = useState([
    { symbol: "AAPL", name: "Apple Inc.", price: 180.25, change: 2.45 },
    { symbol: "MSFT", name: "Microsoft Corp.", price: 350.12, change: -1.23 },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 140.87, change: 0.75 },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: 130.45, change: -0.32 },
    { symbol: "TSLA", name: "Tesla Inc.", price: 200.18, change: 5.67 },
  ])
  const [newSymbol, setNewSymbol] = useState("")

  const addToWatchlist = () => {
    if (!newSymbol) return

    // Mock data for the new stock
    const mockPrice = Math.floor(Math.random() * 500) + 50
    const mockChange = (Math.random() * 10 - 5).toFixed(2)

    setWatchlist([
      ...watchlist,
      {
        symbol: newSymbol.toUpperCase(),
        name: `${newSymbol.toUpperCase()} Corp.`,
        price: mockPrice,
        change: Number.parseFloat(mockChange),
      },
    ])
    setNewSymbol("")
  }

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(watchlist.filter((stock) => stock.symbol !== symbol))
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Star className="mr-2 h-5 w-5" />
          Watchlist
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Add symbol..."
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value)}
            className="flex-1"
          />
          <Button onClick={addToWatchlist} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {watchlist.map((stock) => (
            <div
              key={stock.symbol}
              className={`flex items-center justify-between p-2 rounded-md ${
                selectedStock === stock.symbol ? "bg-muted" : ""
              }`}
            >
              <Button
                variant="ghost"
                className="p-0 h-auto w-auto font-medium"
                onClick={() => onSelectStock(stock.symbol)}
              >
                {stock.symbol}
              </Button>
              <div className="flex items-center gap-2">
                <span>${stock.price.toFixed(2)}</span>
                <span className={stock.change >= 0 ? "text-green-500" : "text-red-500"}>
                  {stock.change >= 0 ? "+" : ""}
                  {stock.change.toFixed(2)}%
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => removeFromWatchlist(stock.symbol)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
