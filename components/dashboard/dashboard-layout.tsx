"use client"

import { useState } from "react"
import { TopNavbar } from "@/components/top-navbar"
import { Sidebar } from "@/components/sidebar"
import { DashboardContent } from "@/components/dashboard-content"
import { StockChartModal } from "@/components/stock-chart-modal"
import { FundamentalsPanel } from "@/components/fundamentals-panel"
import type { Stock } from "@/types/stock"

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState<"dashboard" | "starred" | "historical" | "live-action" | "subscriptions">(
    "dashboard",
  )
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>(["US", "India"])
  const [selectedStockPacks, setSelectedStockPacks] = useState<string[]>([])
  const [chartModalOpen, setChartModalOpen] = useState(false)
  const [fundamentalsPanelOpen, setFundamentalsPanelOpen] = useState(false)
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const handleViewChart = (stock: Stock) => {
    setSelectedStock(stock)
    setChartModalOpen(true)
  }

  const handleViewFundamentals = (stock: Stock) => {
    setSelectedStock(stock)
    setFundamentalsPanelOpen(true)
  }

  const handleStarStock = (stockId: number) => {
    // This would call an API to star/unstar a stock
    console.log("Star/unstar stock:", stockId)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <TopNavbar />
      <div className="flex flex-1">
        <Sidebar
          isOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedMarkets={selectedMarkets}
          setSelectedMarkets={setSelectedMarkets}
          selectedStockPacks={selectedStockPacks}
          setSelectedStockPacks={setSelectedStockPacks}
        />
        <DashboardContent
          activeTab={activeTab}
          selectedMarkets={selectedMarkets}
          selectedStockPacks={selectedStockPacks}
          onViewChart={handleViewChart}
          onViewFundamentals={handleViewFundamentals}
          onStarStock={handleStarStock}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      {chartModalOpen && selectedStock && (
        <StockChartModal stock={selectedStock} isOpen={chartModalOpen} onClose={() => setChartModalOpen(false)} />
      )}

      {fundamentalsPanelOpen && selectedStock && (
        <FundamentalsPanel
          stock={selectedStock}
          isOpen={fundamentalsPanelOpen}
          onClose={() => setFundamentalsPanelOpen(false)}
        />
      )}
    </div>
  )
}
