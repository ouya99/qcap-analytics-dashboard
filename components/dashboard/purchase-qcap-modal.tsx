"use client"

import { useState } from "react"
import * as React from "react"
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
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Wallet } from "lucide-react"

interface WalletAddress {
  address: string
  stakedAmount: number
  balance: number
}

interface PurchaseQcapModalProps {
  isOpen: boolean
  onClose: () => void
  onPurchase: (amount: number, walletAddress: string) => Promise<void>
  walletAddresses: WalletAddress[]
}

export function PurchaseQcapModal({ isOpen, onClose, onPurchase, walletAddresses }: PurchaseQcapModalProps) {
  const [amount, setAmount] = useState<string>("100")
  const [selectedWalletAddress, setSelectedWalletAddress] = useState<string>(
    walletAddresses.length > 0 ? walletAddresses[0].address : "",
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Set default wallet address when modal opens
  React.useEffect(() => {
    if (isOpen && walletAddresses.length > 0 && !selectedWalletAddress) {
      setSelectedWalletAddress(walletAddresses[0].address)
    }
  }, [isOpen, walletAddresses, selectedWalletAddress])

  const handlePurchase = async () => {
    try {
      setIsLoading(true)
      await onPurchase(Number(amount), selectedWalletAddress)
      onClose()
    } catch (error) {
      console.error("Failed to purchase QCAP:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Get the selected wallet's balance
  const selectedWallet = walletAddresses.find((w) => w.address === selectedWalletAddress)

  // Calculate estimated cost (0.05 QU per QCAP)
  const estimatedCost = (Number(amount) * 0.05).toFixed(2)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#0a0e1a] text-white border-[#1a2035]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Purchase QCAP</DialogTitle>
          <DialogDescription className="text-gray-400">Enter the amount of QCAP you want to purchase</DialogDescription>
        </DialogHeader>

        {/* Wallet and Amount Selection Box */}
        <div className="bg-[#131b31] rounded-lg p-4 border border-[#1a2035] mb-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Wallet Selector */}
            <div>
              <div className="text-sm mb-1.5">Wallet</div>
              <Select value={selectedWalletAddress} onValueChange={setSelectedWalletAddress}>
                <SelectTrigger className="bg-[#0f1424] border-[#2a3045] text-white h-10 w-full">
                  <div className="flex items-center">
                    <Wallet className="h-3.5 w-3.5 mr-2 text-blue-400" />
                    <span className="truncate">{selectedWalletAddress}</span>
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-[#131b31] border-[#2a3045] text-white">
                  {walletAddresses.map((wallet) => (
                    <SelectItem key={wallet.address} value={wallet.address}>
                      <div className="flex items-center">
                        <Wallet className="h-3.5 w-3.5 mr-2 text-blue-400" />
                        <span>{wallet.address}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedWallet && (
                <div className="mt-2 text-sm text-blue-400 bg-[#0f1424] border border-[#2a3045] rounded-md px-3 py-1.5">
                  Current balance: {selectedWallet.balance.toLocaleString()} QCAP
                </div>
              )}
            </div>

            {/* Amount Input */}
            <div>
              <div className="text-sm mb-1.5">Amount</div>
              <div className="relative">
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-[#0f1424] border-[#2a3045] text-white pr-16 h-10"
                  min="1"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400 bg-[#0f1424] border-l border-[#2a3045] rounded-r-md">
                  QCAP
                </div>
              </div>
              <div className="mt-2 flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-blue-400 hover:text-blue-300 hover:bg-[#0f1424] h-8 px-2"
                  onClick={() => setAmount(selectedWallet?.balance.toString() || "0")}
                >
                  MAX
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Estimated Cost */}
        <div className="flex justify-between text-sm text-gray-400 px-1">
          <span>Estimated cost:</span>
          <span>{estimatedCost} QU</span>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose} className="border-[#2a3045] text-white hover:bg-[#2a3045]">
            Cancel
          </Button>
          <Button
            onClick={handlePurchase}
            disabled={isLoading || !amount || Number(amount) <= 0 || !selectedWalletAddress}
            className="bg-[#0066FF] hover:bg-[#0052cc] text-white"
          >
            {isLoading ? "Processing..." : "Purchase"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
