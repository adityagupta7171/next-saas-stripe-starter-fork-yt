"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { BarChart, LineChart, TrendingDown, TrendingUp } from "lucide-react"
import type { Stock } from "@/types/stock"

interface FundamentalsPanelProps {
  stock: Stock
  isOpen: boolean
  onClose: () => void
}

export function FundamentalsPanel({ stock, isOpen, onClose }: FundamentalsPanelProps) {
  // Mock data - in a real app, this would come from an API
  const fundamentals = {
    overview: {
      marketCap: `$${(stock.currentPrice * 1000000000).toLocaleString()}`,
      peRatio: (Math.random() * 30 + 10).toFixed(2),
      eps: (Math.random() * 10 + 1).toFixed(2),
      dividend: (Math.random() * 3).toFixed(2) + "%",
      beta: (Math.random() * 2).toFixed(2),
      yearHigh: (stock.currentPrice * (1 + Math.random() * 0.3)).toFixed(2),
      yearLow: (stock.currentPrice * (1 - Math.random() * 0.3)).toFixed(2),
      avgVolume: `${(Math.random() * 10 + 1).toFixed(2)}M`,
    },
    financials: {
      revenue: [
        { period: "Q1 2023", value: (Math.random() * 20 + 10).toFixed(2) },
        { period: "Q2 2023", value: (Math.random() * 20 + 10).toFixed(2) },
        { period: "Q3 2023", value: (Math.random() * 20 + 10).toFixed(2) },
        { period: "Q4 2023", value: (Math.random() * 20 + 10).toFixed(2) },
      ],
      netIncome: [
        { period: "Q1 2023", value: (Math.random() * 10 + 2).toFixed(2) },
        { period: "Q2 2023", value: (Math.random() * 10 + 2).toFixed(2) },
        { period: "Q3 2023", value: (Math.random() * 10 + 2).toFixed(2) },
        { period: "Q4 2023", value: (Math.random() * 10 + 2).toFixed(2) },
      ],
    },
    analystRatings: {
      buy: Math.floor(Math.random() * 20) + 10,
      hold: Math.floor(Math.random() * 10) + 5,
      sell: Math.floor(Math.random() * 5) + 1,
      targetPrice: (stock.currentPrice * (1 + (Math.random() * 0.3 - 0.1))).toFixed(2),
    },
  }

  const totalRatings =
    fundamentals.analystRatings.buy + fundamentals.analystRatings.hold + fundamentals.analystRatings.sell
  const buyPercentage = (fundamentals.analystRatings.buy / totalRatings) * 100
  const holdPercentage = (fundamentals.analystRatings.hold / totalRatings) * 100
  const sellPercentage = (fundamentals.analystRatings.sell / totalRatings) * 100

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {stock.symbol} - {stock.name}
          </SheetTitle>
        </SheetHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
            <TabsTrigger value="analyst">Analyst Ratings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Key Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Market Cap</p>
                    <p className="font-medium">{fundamentals.overview.marketCap}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">P/E Ratio</p>
                    <p className="font-medium">{fundamentals.overview.peRatio}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">EPS</p>
                    <p className="font-medium">${fundamentals.overview.eps}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Dividend Yield</p>
                    <p className="font-medium">{fundamentals.overview.dividend}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Beta</p>
                    <p className="font-medium">{fundamentals.overview.beta}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">52-Week Range</p>
                    <p className="font-medium">
                      ${fundamentals.overview.yearLow} - ${fundamentals.overview.yearHigh}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Volume</p>
                    <p className="font-medium">{fundamentals.overview.avgVolume}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Price</p>
                    <p className="font-medium">${stock.currentPrice.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financials" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <BarChart className="mr-2 h-5 w-5" />
                  Quarterly Results (Billions)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Revenue</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {fundamentals.financials.revenue.map((item) => (
                            <TableHead key={item.period}>{item.period}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          {fundamentals.financials.revenue.map((item) => (
                            <TableCell key={item.period}>${item.value}B</TableCell>
                          ))}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Net Income</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {fundamentals.financials.netIncome.map((item) => (
                            <TableHead key={item.period}>{item.period}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          {fundamentals.financials.netIncome.map((item) => (
                            <TableCell key={item.period}>${item.value}B</TableCell>
                          ))}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analyst" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <LineChart className="mr-2 h-5 w-5" />
                  Analyst Recommendations
                </CardTitle>
                <CardDescription>Target Price: ${fundamentals.analystRatings.targetPrice}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
                        <span>Buy</span>
                      </div>
                      <span className="font-medium">{fundamentals.analystRatings.buy}</span>
                    </div>
                    <Progress value={buyPercentage} className="h-2" indicatorClassName="bg-green-500" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="ml-6">Hold</span>
                      </div>
                      <span className="font-medium">{fundamentals.analystRatings.hold}</span>
                    </div>
                    <Progress value={holdPercentage} className="h-2" indicatorClassName="bg-amber-500" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <TrendingDown className="mr-2 h-4 w-4 text-red-500" />
                        <span>Sell</span>
                      </div>
                      <span className="font-medium">{fundamentals.analystRatings.sell}</span>
                    </div>
                    <Progress value={sellPercentage} className="h-2" indicatorClassName="bg-red-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
