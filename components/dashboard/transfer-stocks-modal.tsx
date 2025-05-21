"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TransferStocksModalProps {
  isOpen: boolean
  onClose: () => void
  onTransfer: (fromSC: string, toSC: string, amount: number) => Promise<void>
}

const SC_OPTIONS = ["Qx", "Qvault", "QTRY", "QUtil"]

export function TransferStocksModal({ isOpen, onClose, onTransfer }: TransferStocksModalProps) {
  const [fromSC, setFromSC] = useState<string>("")
  const [toSC, setToSC] = useState<string>("")
  const [amount, setAmount] = useState<string>("0")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleTransfer = async () => {
    try {
      setIsLoading(true)
      await onTransfer(fromSC, toSC, Number(amount))
      onClose()
    } catch (error) {
      console.error("Failed to transfer stocks:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const isValid = fromSC && toSC && fromSC !== toSC && Number(amount) > 0

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#0f1424] text-white border-[#1a2035]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Transfer Stocks</DialogTitle>
          <DialogDescription className="text-gray-400">Transfer stocks between Smart Contracts</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fromSC" className="text-right">
              From
            </Label>
            <Select onValueChange={setFromSC} value={fromSC}>
              <SelectTrigger id="fromSC" className="col-span-3 bg-[#1a2035] border-[#2a3045] text-white">
                <SelectValue placeholder="Select SC" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a2035] border-[#2a3045] text-white">
                {SC_OPTIONS.map((sc) => (
                  <SelectItem key={sc} value={sc}>
                    {sc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="toSC" className="text-right">
              To
            </Label>
            <Select onValueChange={setToSC} value={toSC}>
              <SelectTrigger id="toSC" className="col-span-3 bg-[#1a2035] border-[#2a3045] text-white">
                <SelectValue placeholder="Select SC" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a2035] border-[#2a3045] text-white">
                {SC_OPTIONS.map((sc) => (
                  <SelectItem key={sc} value={sc} disabled={sc === fromSC}>
                    {sc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="col-span-3 bg-[#1a2035] border-[#2a3045] text-white"
              min="1"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-[#2a3045] text-white hover:bg-[#2a3045]">
            Cancel
          </Button>
          <Button
            onClick={handleTransfer}
            disabled={isLoading || !isValid}
            className="bg-[#0066FF] hover:bg-[#0052cc] text-white"
          >
            {isLoading ? "Processing..." : "Transfer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
