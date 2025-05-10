"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { StockGrid } from "@/components/stock-grid"
import { StarredStocks } from "@/components/starred-stocks"
import { HistoricalSuggestions } from "@/components/historical-suggestions"
import { LiveActionGrid } from "@/components/live-action-grid"
import { SubscriptionPlans } from "@/components/subscription-plans"
import { MoodIndicators } from "@/components/mood-indicators"
import type { Stock } from "@/types/stock"

interface DashboardContentProps {
  activeTab: "dashboard" | "starred" | "historical" | "live-action" | "subscriptions"
  selectedMarkets: string[]
  selectedStockPacks: string[]
  onViewChart: (stock: Stock) => void
  onViewFundamentals: (stock: Stock) => void
  onStarStock: (stockId: number) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export function DashboardContent({
  activeTab,
  selectedMarkets,
  selectedStockPacks,
  onViewChart,
  onViewFundamentals,
  onStarStock,
  searchQuery,
  setSearchQuery,
}: DashboardContentProps) {
  return (
    <main className="flex-1 overflow-auto p-4 md:p-6">
      {activeTab !== "subscriptions" && (
        <div className="mb-6 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search stocks..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <h1 className="text-2xl font-bold">
              {activeTab === "dashboard" && "Dashboard"}
              {activeTab === "starred" && "Starred Stocks"}
              {activeTab === "historical" && "Historical Suggestions"}
              {activeTab === "live-action" && "Live Action"}
            </h1>
          </div>

          {activeTab === "dashboard" && <MoodIndicators />}
        </div>
      )}

      <div className="space-y-6">
        {activeTab === "dashboard" && (
          <StockGrid
            selectedMarkets={selectedMarkets}
            selectedStockPacks={selectedStockPacks}
            searchQuery={searchQuery}
            onViewChart={onViewChart}
            onViewFundamentals={onViewFundamentals}
            onStarStock={onStarStock}
          />
        )}

        {activeTab === "starred" && (
          <StarredStocks
            searchQuery={searchQuery}
            onViewChart={onViewChart}
            onViewFundamentals={onViewFundamentals}
            onStarStock={onStarStock}
          />
        )}

        {activeTab === "historical" && (
          <HistoricalSuggestions selectedMarkets={selectedMarkets} searchQuery={searchQuery} />
        )}

        {activeTab === "live-action" && (
          <LiveActionGrid
            selectedMarkets={selectedMarkets}
            searchQuery={searchQuery}
            onViewChart={onViewChart}
            onViewFundamentals={onViewFundamentals}
          />
        )}

        {activeTab === "subscriptions" && <SubscriptionPlans />}
      </div>
    </main>
  )
}
