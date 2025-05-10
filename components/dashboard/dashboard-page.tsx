"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { StockChart } from "@/components/stock-chart"
import { StockMetrics } from "@/components/stock-metrics"
import { StockNews } from "@/components/stock-news"
import { Watchlist } from "@/components/watchlist"

export function DashboardPage() {
  const [selectedStock, setSelectedStock] = useState("AAPL")

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardSidebar selectedStock={selectedStock} onSelectStock={setSelectedStock} />
        <main className="flex-1 p-4 md:p-6 bg-muted/40">
          <div className="grid gap-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StockMetrics symbol={selectedStock} />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-2">
                <StockChart symbol={selectedStock} />
              </div>
              <div>
                <Watchlist selectedStock={selectedStock} onSelectStock={setSelectedStock} />
              </div>
            </div>
            <StockNews symbol={selectedStock} />
          </div>
        </main>
      </div>
    </div>
  )
}
