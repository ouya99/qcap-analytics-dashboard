// Move the contents of components/general-data-dashboard.tsx here "use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, BarChart } from "@/components/ui/charts"
import { ArrowUpRight, DollarSign, TrendingUp, Users, Share2, Recycle } from "lucide-react"

// Mock data - replace with actual API calls
const mockCirculatingSupply = 10000000
const mockQcapAvailableToSell = [
  { year: 2024, amount: 2000000 },
  { year: 2025, amount: 1500000 },
  { year: 2026, amount: 1000000 },
  { year: 2027, amount: 500000 },
  { year: 2028, amount: 250000 },
]

const mockRevenueData = {
  totalRevenue: 5000000,
  lastEpochRevenue: 75000,
  revenueByAsset: [
    { asset: "QVault", revenue: 2000000 },
    { asset: "QX", revenue: 1500000 },
    { asset: "QTRY", revenue: 1000000 },
    { asset: "QUtil", revenue: 500000 },
  ],
  revenueByEpoch: Array(100)
    .fill(null)
    .map((_, i) => ({
      epoch: i + 1,
      revenue: Math.floor(Math.random() * 100000) + 50000,
    })),
}

const mockQuData = {
  totalDistributed: 2500000,
  totalReinvested: 1500000,
  distributedToQvault: 500000,
  distributedByEpoch: Array(100)
    .fill(null)
    .map((_, i) => ({
      epoch: i + 1,
      distributed: Math.floor(Math.random() * 50000) + 20000,
    })),
  reinvestedByEpoch: Array(100)
    .fill(null)
    .map((_, i) => ({
      epoch: i + 1,
      reinvested: Math.floor(Math.random() * 30000) + 10000,
    })),
}

const mockSharesData = [
  { sc: "SC1", shares: 1000 },
  { sc: "SC2", shares: 750 },
  { sc: "SC3", shares: 500 },
  { sc: "SC4", shares: 250 },
  { sc: "SC5", shares: 100 },
]

const mockMarketData = {
  circulatingSupply: 10000000,
  price: {
    qu: 2.5,
    usd: 2.5,
  },
  marketCap: {
    qu: 25000000,
    usd: 25000000,
  },
  quRaised: 5000000,
  holders: 2500,
  avgQcapPerHolder: 4000,
  richList: [
    { address: "GVWPFG...CHCNJ", qcap: 125000, percentage: 1.25 },
    { address: "FREFAF...ADFDS", qcap: 87500, percentage: 0.88 },
    { address: "GVWYER...YJTYJ", qcap: 62500, percentage: 0.63 },
    { address: "MSDFGS...RTESG", qcap: 50000, percentage: 0.5 },
    { address: "REGRGS...JMFDD", qcap: 37500, percentage: 0.38 },
  ],
  scPositions: [
    { sc: "SC1", position: 1 },
    { sc: "SC2", position: 3 },
    { sc: "SC3", position: 5 },
    { sc: "SC4", position: 7 },
    { sc: "SC5", position: 10 },
  ],
  restrictedRevenue: {
    muslim: 25000,
  },
  priceData: {
    primary: 20000000,
    secondary: {
      bid: 195000,
      ask: 205000,
    },
  },
}

export default function GeneralDataDashboard() {
  const [revenueTimeframe, setRevenueTimeframe] = useState("100")
  const [distributionTimeframe, setDistributionTimeframe] = useState("100")
  const [reinvestedTimeframe, setReinvestedTimeframe] = useState("100")
  const [selectedMetric, setSelectedMetric] = useState<"distributed" | "reinvested" | "qvault">("distributed")

  const getChartData = (metric: typeof selectedMetric, timeframe: string) => {
    const n = Number.parseInt(timeframe)
    switch (metric) {
      case "distributed":
        return mockQuData.distributedByEpoch.slice(-n)
      case "reinvested":
        return mockQuData.reinvestedByEpoch.slice(-n)
      case "qvault":
        return mockQuData.distributedByEpoch.slice(-n).map(item => ({
          epoch: item.epoch,
          distributed: Math.round(item.distributed * 0.2)
        }))
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Circulating Supply</CardTitle>
          <CardDescription>Total QCAP currently in circulation</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="text-2xl font-bold mb-4">{mockCirculatingSupply.toLocaleString()}</div>
          <div className="h-[300px]">
            <LineChart
              data={Array(100)
                .fill(null)
                .map((_, i) => ({
                  epoch: i + 1,
                  supply: 3000000 + i * 20000,
                }))}
              xField="epoch"
              yField="supply"
              categories={["supply"]}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">QCAP Available to Sell</CardTitle>
          <CardDescription>Amount available per year (changes based on sold QCAP)</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-end">
          <div className="h-[300px]">
            <BarChart data={mockQcapAvailableToSell} xField="year" yField="amount" categories={["amount"]} />
          </div>
        </CardContent>
      </Card>

      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Revenue Overview</CardTitle>
          <CardDescription>Total and recent revenue metrics</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium">Total Revenue</div>
              <div className="text-2xl font-bold">{mockRevenueData.totalRevenue.toLocaleString()} Qu</div>
            </div>
            <div>
              <div className="text-sm font-medium">Last Epoch Revenue</div>
              <div className="text-2xl font-bold">{mockRevenueData.lastEpochRevenue.toLocaleString()} Qu</div>
            </div>
            <div className="pt-2">
              <div className="text-sm font-medium mb-2">Revenue by Asset Type</div>
              <div className="space-y-2">
                {mockRevenueData.revenueByAsset.map((asset) => (
                  <div key={asset.asset} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                      <span>{asset.asset}</span>
                    </div>
                    <span>{asset.revenue.toLocaleString()} Qu</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3 flex flex-col">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">QCAP Revenue per Epoch</CardTitle>
          <CardDescription className="flex items-center justify-between">
            <span>Revenue earned for the last {revenueTimeframe} epochs</span>
            <Select defaultValue={revenueTimeframe} onValueChange={setRevenueTimeframe}>
              <SelectTrigger className="w-20">
                <SelectValue placeholder="100" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="h-[300px] mt-auto">
            <LineChart
              data={mockRevenueData.revenueByEpoch.slice(-Number.parseInt(revenueTimeframe))}
              xField="epoch"
              yField="revenue"
              categories={["revenue"]}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3 flex flex-col">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Qu Distribution</CardTitle>
          <CardDescription>
            <span className="text-sm">Qu distributed for the last {distributionTimeframe} epochs</span>
          </CardDescription>
          <div className="flex flex-col sm:flex-row w-full sm:justify-end items-stretch sm:items-center gap-2 mt-2">
            <Select defaultValue={selectedMetric} onValueChange={(value: typeof selectedMetric) => setSelectedMetric(value)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distributed">Distributed</SelectItem>
                <SelectItem value="reinvested">Reinvested</SelectItem>
                <SelectItem value="qvault">Distributed To QVAULT Shareholders</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue={distributionTimeframe} onValueChange={setDistributionTimeframe}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="100" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 sm:p-6 h-full">
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Share2 className="h-8 w-8 text-primary mb-2" />
                  <div className="space-y-1">
                    <div className="text-xl font-medium">Total Distributed</div>
                    <div className="text-lg font-bold">
                      {mockQuData.distributedByEpoch
                        .slice(-Number.parseInt(distributionTimeframe))
                        .reduce((sum, item) => sum + item.distributed, 0)
                        .toLocaleString()}{" "}
                      Qu
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 sm:p-6 h-full">
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Recycle className="h-8 w-8 text-primary mb-2" />
                  <div className="space-y-1">
                    <div className="text-xl font-medium">Total Reinvested</div>
                    <div className="text-lg font-bold">
                      {mockQuData.reinvestedByEpoch
                        .slice(-Number.parseInt(distributionTimeframe))
                        .reduce((sum, item) => sum + item.reinvested, 0)
                        .toLocaleString()}{" "}
                      Qu
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="sm:col-span-2 lg:col-span-1">
              <CardContent className="p-4 sm:p-6 h-full">
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <div className="space-y-1">
                    <div className="text-xl font-medium">To QVAULT Shareholders</div>
                    <div className="text-lg font-bold">
                      {Math.round(
                        mockQuData.distributedByEpoch
                          .slice(-Number.parseInt(distributionTimeframe))
                          .reduce((sum, item) => sum + item.distributed, 0) * 0.2
                      ).toLocaleString()}{" "}
                      Qu
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="h-[300px] mt-auto">
            <LineChart
              data={getChartData(selectedMetric, distributionTimeframe)}
              xField="epoch"
              yField={selectedMetric === "qvault" ? "distributed" : selectedMetric}
              categories={[selectedMetric === "qvault" ? "distributed" : selectedMetric]}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shares per SC</CardTitle>
          <CardDescription>Number of shares from each SC we hold</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col h-[350px]">
          <div className="flex-1 flex items-end">
            <BarChart data={mockSharesData} xField="sc" yField="shares" categories={["shares"]} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">QCAP Market Cap</CardTitle>
          <CardDescription>Current market metrics</CardDescription>
          <div className="flex justify-center mb-2">          
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8">
              <rect x="4" y="4" width="8" height="24" rx="2" fill="white"/>
              <rect x="16" y="2" width="8" height="28" rx="2" fill="white"/>
            </svg>
          </div>          
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium">Market Cap</div>
              <div className="flex gap-2">
                <div className="text-2xl font-bold">{mockMarketData.marketCap.qu.toLocaleString()} Qu</div>
                <div className="text-2xl font-bold text-muted-foreground">
                  ${mockMarketData.marketCap.usd.toLocaleString()}
                </div>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">Price</div>
              <div className="flex gap-2">
                <div className="text-2xl font-bold">{mockMarketData.price.qu} Qu</div>
                <div className="text-2xl font-bold text-muted-foreground">${mockMarketData.price.usd}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>QCAP Primary Market</CardTitle>
          <CardDescription>Qu raised through QCAP primary market</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center space-y-2">
            <ArrowUpRight className="h-12 w-12 text-primary" />
            <div className="text-3xl font-bold">{mockMarketData.quRaised.toLocaleString()} Qu</div>
            <div className="text-sm text-muted-foreground">Total raised from primary market sales</div>
          </div>
          <div className="mt-6">
            <div className="text-sm font-medium mb-2">Historical Primary Market Sales</div>
            <div className="h-[150px]">
              <LineChart
                data={[
                  { date: "Jan", amount: 500000 },
                  { date: "Feb", amount: 750000 },
                  { date: "Mar", amount: 1000000 },
                  { date: "Apr", amount: 1250000 },
                  { date: "May", amount: 1500000 },
                  { date: "Jun", amount: 2000000 },
                ]}
                xField="date"
                yField="amount"
                categories={["amount"]}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Holders</CardTitle>
          <CardDescription>QCAP holder statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium">Number of Holders</div>
              <div className="text-2xl font-bold">{mockMarketData.holders.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Average QCAP per Holder</div>
              <div className="text-2xl font-bold">{mockMarketData.avgQcapPerHolder.toLocaleString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">SC Rich List Positions</CardTitle>
            <CardDescription>Position that QCAP has in the rich lists of the SCs we hold</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SC</TableHead>
                  <TableHead>Position</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockMarketData.scPositions.map((item) => (
                  <TableRow key={item.sc}>
                    <TableCell>{item.sc}</TableCell>
                    <TableCell>#{item.position}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Restricted Revenue</CardTitle>
            <CardDescription>Revenue with restrictions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium">Muslim Restricted</div>
                <div className="text-2xl font-bold">{mockMarketData.restrictedRevenue.muslim.toLocaleString()} Qu</div>
              </div>
            </div>
          </CardContent>
        </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">QCAP Rich List</CardTitle>
          <CardDescription>Top QCAP holders</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Address</TableHead>
                <TableHead>QCAP Amount</TableHead>
                <TableHead>Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMarketData.richList.map((holder) => (
                <TableRow key={holder.address}>
                  <TableCell>{holder.address}</TableCell>
                  <TableCell>{holder.qcap.toLocaleString()}</TableCell>
                  <TableCell>{holder.percentage}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Price Data</CardTitle>
          <CardDescription>Primary and secondary market prices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  <div className="text-sm font-medium">Primary Market</div>
                  <div className="text-2xl font-bold">{mockMarketData.priceData.primary} Qu</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <ArrowUpRight className="h-8 w-8 text-primary" />
                  <div className="text-sm font-medium">Secondary Bid</div>
                  <div className="text-2xl font-bold">{mockMarketData.priceData.secondary.bid} Qu</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <DollarSign className="h-8 w-8 text-primary" />
                  <div className="text-sm font-medium">Secondary Ask</div>
                  <div className="text-2xl font-bold">{mockMarketData.priceData.secondary.ask} Qu</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
