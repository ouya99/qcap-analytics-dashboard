// Move the contents of components/allocation-dashboard.tsx here "use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PieChart, LineChart } from "@/components/ui/charts"
import { Flame, Recycle, Share2, Users } from "lucide-react"

// Mock data - replace with actual API calls
const mockAllocationData = {
  distribution: 40,
  reinvestment: 30,
  burning: 20,
  shareholders: 10,
}

const mockBurnData = {
  total: 1250000,
  epochData: Array(100).fill(null).map(() => Math.floor(Math.random() * 3000) + 1000)
}

export default function AllocationDashboard() {
  const [timeframe, setTimeframe] = useState("10")
  const [chartTimeframe, setChartTimeframe] = useState("100")

  const getTimeframeData = (tf: string) => {
    const epochs = parseInt(tf)
    const recentData = mockBurnData.epochData.slice(-epochs)
    return {
      periodTotal: recentData.reduce((sum, val) => sum + val, 0),
      average: Math.floor(recentData.reduce((sum, val) => sum + val, 0) / epochs)
    }
  }

  const timeframeData = getTimeframeData(timeframe)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>QCAP Allocation Percentage</CardTitle>
          <CardDescription>Distribution, reinvestment, burning, QVAULT shareholders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-[300px]">
              <PieChart
                data={[
                  { name: "Distribution", value: mockAllocationData.distribution },
                  { name: "Reinvestment", value: mockAllocationData.reinvestment },
                  { name: "Burning", value: mockAllocationData.burning },
                  { name: "Shareholders", value: mockAllocationData.shareholders },
                ]}
                nameKey="name"
                dataKey="value"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Share2 className="h-8 w-8 text-primary" />
                    <div className="text-sm font-medium">Distribution</div>
                    <div className="text-2xl font-bold">{mockAllocationData.distribution}%</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Recycle className="h-8 w-8 text-primary" />
                    <div className="text-sm font-medium">Reinvestment</div>
                    <div className="text-2xl font-bold">{mockAllocationData.reinvestment}%</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Flame className="h-8 w-8 text-primary" />
                    <div className="text-sm font-medium">Burning</div>
                    <div className="text-2xl font-bold">{mockAllocationData.burning}%</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Users className="h-8 w-8 text-primary" />
                    <div className="text-sm font-medium">Shareholders</div>
                    <div className="text-2xl font-bold">{mockAllocationData.shareholders}%</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>QCAP Burned</CardTitle>
          <CardDescription className="flex items-center justify-between">
            <span>Total and for the last {timeframe} epochs</span>
            <Select defaultValue={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-20">
                <SelectValue placeholder="10" />
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
        <CardContent>
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="text-sm font-medium">Total Burned</div>
              <div className="text-3xl font-bold">{mockBurnData.total.toLocaleString()}</div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Last {timeframe} Epochs</div>
              <div className="text-2xl font-bold">
                {timeframeData.periodTotal.toLocaleString()}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Average per Epoch</div>
              <div className="text-xl font-bold">
                {timeframeData.average.toLocaleString()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>QCAP Burned Over Time</CardTitle>
              <CardDescription>Historical data of QCAP burned per epoch</CardDescription>
            </div>
            <Select defaultValue={chartTimeframe} onValueChange={setChartTimeframe}>
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
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <LineChart
              data={mockBurnData.epochData.slice(-parseInt(chartTimeframe)).map((amount, i) => ({
                epoch: i + 1,
                amount,
              }))}
              xField="epoch"
              yField="amount"
              categories={["amount"]}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
