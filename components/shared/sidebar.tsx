"use client"

import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Star,
  History,
  Zap,
  CreditCard,
  Globe,
  Package,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
  activeTab: "dashboard" | "starred" | "historical" | "live-action" | "subscriptions"
  setActiveTab: (tab: "dashboard" | "starred" | "historical" | "live-action" | "subscriptions") => void
  selectedMarkets: string[]
  setSelectedMarkets: (markets: string[]) => void
  selectedStockPacks: string[]
  setSelectedStockPacks: (packs: string[]) => void
}

export function Sidebar({
  isOpen,
  toggleSidebar,
  activeTab,
  setActiveTab,
  selectedMarkets,
  setSelectedMarkets,
  selectedStockPacks,
  setSelectedStockPacks,
}: SidebarProps) {
  // Mock data for markets and stock packs
  const markets = [
    { id: "US", name: "United States" },
    { id: "India", name: "India" },
    { id: "UK", name: "United Kingdom" },
    { id: "Germany", name: "Germany" },
    { id: "Japan", name: "Japan" },
    { id: "China", name: "China" },
  ]

  const stockPacks = [
    { id: "tech", name: "Technology" },
    { id: "finance", name: "Financial" },
    { id: "healthcare", name: "Healthcare" },
    { id: "consumer", name: "Consumer Goods" },
    { id: "energy", name: "Energy" },
    { id: "industrial", name: "Industrial" },
  ]

  const toggleMarket = (marketId: string) => {
    if (selectedMarkets.includes(marketId)) {
      setSelectedMarkets(selectedMarkets.filter((id) => id !== marketId))
    } else {
      setSelectedMarkets([...selectedMarkets, marketId])
    }
  }

  const toggleStockPack = (packId: string) => {
    if (selectedStockPacks.includes(packId)) {
      setSelectedStockPacks(selectedStockPacks.filter((id) => id !== packId))
    } else {
      setSelectedStockPacks([...selectedStockPacks, packId])
    }
  }

  return (
    <div
      className={`relative flex-shrink-0 border-r bg-background transition-all duration-300 ${
        isOpen ? "w-64" : "w-0 md:w-16"
      }`}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-4 z-10 h-6 w-6 rounded-full border bg-background"
        onClick={toggleSidebar}
      >
        {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Button>

      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className={`flex flex-col gap-2 p-4 ${!isOpen && "items-center"}`}>
          <Button
            variant={activeTab === "dashboard" ? "secondary" : "ghost"}
            className={`justify-start ${!isOpen && "justify-center px-0"}`}
            onClick={() => setActiveTab("dashboard")}
          >
            <LayoutDashboard className="mr-2 h-5 w-5" />
            {isOpen && <span>Dashboard</span>}
          </Button>

          <Button
            variant={activeTab === "starred" ? "secondary" : "ghost"}
            className={`justify-start ${!isOpen && "justify-center px-0"}`}
            onClick={() => setActiveTab("starred")}
          >
            <Star className="mr-2 h-5 w-5" />
            {isOpen && <span>Starred</span>}
          </Button>

          <Button
            variant={activeTab === "historical" ? "secondary" : "ghost"}
            className={`justify-start ${!isOpen && "justify-center px-0"}`}
            onClick={() => setActiveTab("historical")}
          >
            <History className="mr-2 h-5 w-5" />
            {isOpen && <span>Historical</span>}
          </Button>

          <Button
            variant={activeTab === "live-action" ? "secondary" : "ghost"}
            className={`justify-start ${!isOpen && "justify-center px-0"}`}
            onClick={() => setActiveTab("live-action")}
          >
            <Zap className="mr-2 h-5 w-5" />
            {isOpen && <span>Live Action</span>}
          </Button>

          <Button
            variant={activeTab === "subscriptions" ? "secondary" : "ghost"}
            className={`justify-start ${!isOpen && "justify-center px-0"}`}
            onClick={() => setActiveTab("subscriptions")}
          >
            <CreditCard className="mr-2 h-5 w-5" />
            {isOpen && <span>Subscriptions</span>}
          </Button>

          <Separator className="my-2" />

          {isOpen && (
            <>
              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center">
                  <Globe className="mr-2 h-4 w-4" /> Markets
                </h3>
                <div className="space-y-1">
                  {markets.map((market) => (
                    <div key={market.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`market-${market.id}`}
                        checked={selectedMarkets.includes(market.id)}
                        onCheckedChange={() => toggleMarket(market.id)}
                      />
                      <Label htmlFor={`market-${market.id}`}>{market.name}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-2" />

              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center">
                  <Package className="mr-2 h-4 w-4" /> Stock Packs
                </h3>
                <div className="space-y-1">
                  {stockPacks.map((pack) => (
                    <div key={pack.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`pack-${pack.id}`}
                        checked={selectedStockPacks.includes(pack.id)}
                        onCheckedChange={() => toggleStockPack(pack.id)}
                      />
                      <Label htmlFor={`pack-${pack.id}`}>{pack.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
