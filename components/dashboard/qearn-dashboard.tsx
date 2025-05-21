"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart } from "@/components/ui/charts"
import { Lock, Percent, Timer } from "lucide-react"

// Mock data - replace with actual API calls
const mockQearnData = {
  qubicLocked: 500000,
  interestAccrued: 25000,
  upcomingLocks: [
    { epoch: "epoch 157", amount: 1543000 }
  ],
  lockHistory: Array(20)
    .fill(null)
    .map((_, i) => ({
      epoch: i + 1,
      locked: Math.floor(Math.random() * 30000) + 20000,
    })),
  currentYield: 5.2,
}

export default function QearnDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Qubic Locked in Qearn</CardTitle>
          <CardDescription>Total amount locked by QVAULT</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center space-y-2">
            <Lock className="h-12 w-12 text-primary" />
            <div className="text-3xl font-bold">{mockQearnData.qubicLocked.toLocaleString()}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interest Accrued</CardTitle>
          <CardDescription>Total interest earned from Qearn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center space-y-2">
            <Percent className="h-12 w-12 text-primary" />
            <div className="text-3xl font-bold">{mockQearnData.interestAccrued.toLocaleString()}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Yield</CardTitle>
          <CardDescription>Current epoch yield percentage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center space-y-2">
            <Timer className="h-12 w-12 text-primary" />
            <div className="text-3xl font-bold">{mockQearnData.currentYield}%</div>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Next Epoch Lock</CardTitle>
          <CardDescription>QU amount to be locked for next epoch - {mockQearnData.upcomingLocks[0].epoch}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center space-y-2">
            <Lock className="h-12 w-12 text-primary" />
            <div className="text-3xl font-bold">{mockQearnData.upcomingLocks[0].amount.toLocaleString()}</div>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Qubic Lock History</CardTitle>
          <CardDescription>Amount of Qubic locked per epoch</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <LineChart data={mockQearnData.lockHistory} xField="epoch" yField="locked" categories={["locked"]} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
