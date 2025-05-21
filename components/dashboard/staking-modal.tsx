"use client"

import { useState } from "react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Wallet } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"

interface WalletAddress {
  address: string
  stakedAmount: number
  balance: number
}

interface StakingModalProps {
  isOpen: boolean
  onClose: () => void
  onStake: (amount: number, walletAddress: string) => Promise<void>
  onUnstake: (amount: number, walletAddress: string) => Promise<void>
  walletAddresses: WalletAddress[]
  stakingRewards: number
}

export function StakingModal({
  isOpen,
  onClose,
  onStake,
  onUnstake,
  walletAddresses,
  stakingRewards,
}: StakingModalProps) {
  const [stakeAmount, setStakeAmount] = useState<string>("100")
  const [unstakeAmount, setUnstakeAmount] = useState<string>("0")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>("stake")
  const [selectedWalletAddress, setSelectedWalletAddress] = useState<string>(
    walletAddresses.length > 0 ? walletAddresses[0].address : "",
  )

  // Set default wallet address when modal opens
  React.useEffect(() => {
    if (isOpen && walletAddresses.length > 0 && !selectedWalletAddress) {
      setSelectedWalletAddress(walletAddresses[0].address)
    }
  }, [isOpen, walletAddresses, selectedWalletAddress])
  
  // Get the selected wallet's data
  const selectedWallet = walletAddresses.find((w) => w.address === selectedWalletAddress) || {
    address: "",
    stakedAmount: 0,
    balance: 0,
  }

  const handleStake = async () => {
    try {
      setIsLoading(true)
      await onStake(Number(stakeAmount), selectedWalletAddress)
      setStakeAmount("100")
    } catch (error) {
      console.error("Failed to stake QCAP:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUnstake = async () => {
    try {
      setIsLoading(true)
      await onUnstake(Number(unstakeAmount), selectedWalletAddress)
      setUnstakeAmount("0")
    } catch (error) {
      console.error("Failed to unstake QCAP:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMaxStake = () => {
    setStakeAmount(selectedWallet.balance.toString())
  }

  const handleMaxUnstake = () => {
    setUnstakeAmount(selectedWallet.stakedAmount.toString())
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#0a0e1a] text-white border-[#1a2035]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">QCAP Staking</DialogTitle>
          <DialogDescription className="text-gray-400">Stake your QCAP tokens to earn rewards</DialogDescription>
        </DialogHeader>

        {/* Wallet Selector */}
        <div className="mb-4">
          <div className="text-sm mb-1.5">Wallet</div>
          <Select value={selectedWalletAddress} onValueChange={setSelectedWalletAddress}>
            <SelectTrigger className="bg-[#131b31] border-[#2a3045] text-white">
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
        </div>

        <div className="grid grid-cols-1 gap-4 py-2">
          <div className="bg-[#131b31] p-4 rounded-md">
            <div className="text-sm text-gray-400">Total Staked</div>
            <div className="text-xl font-bold mt-1">{selectedWallet.stakedAmount.toLocaleString()} QCAP</div>
          </div>
        </div>

        <Tabs defaultValue="stake" value={activeTab} onValueChange={setActiveTab} className="w-full mt-2">
          <TabsList className="grid grid-cols-2 bg-[#131b31]">
            <TabsTrigger value="stake" className="data-[state=active]:bg-[#0066FF]">
              Stake
            </TabsTrigger>
            <TabsTrigger value="unstake" className="data-[state=active]:bg-[#0066FF]">
              Unstake
            </TabsTrigger>
          </TabsList>
          <TabsContent value="stake" className="mt-4">
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Available Balance:</span>
                <span>{selectedWallet.balance.toLocaleString()} QCAP</span>
              </div>
              <div className="relative">
                <Input
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  className="bg-[#131b31] border-[#2a3045] text-white pr-20"
                  min="1"
                  max={selectedWallet.balance}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <Button
                    variant="ghost"
                    onClick={handleMaxStake}
                    className="h-full px-3 text-xs text-blue-400 hover:text-blue-300"
                  >
                    MAX
                  </Button>
                  <div className="px-3 pointer-events-none text-gray-400 bg-[#131b31] border-l border-[#2a3045] h-full flex items-center">
                    QCAP
                  </div>
                </div>
              </div>
              <Button
                onClick={handleStake}
                disabled={
                  isLoading || !stakeAmount || Number(stakeAmount) <= 0 || Number(stakeAmount) > selectedWallet.balance
                }
                className="w-full bg-[#0066FF] hover:bg-[#0052cc] text-white"
              >
                {isLoading ? "Processing..." : "Stake QCAP"}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="unstake" className="mt-4">
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Staked Balance:</span>
                <span>{selectedWallet.stakedAmount.toLocaleString()} QCAP</span>
              </div>
              <div className="relative">
                <Input
                  type="number"
                  value={unstakeAmount}
                  onChange={(e) => setUnstakeAmount(e.target.value)}
                  className="bg-[#131b31] border-[#2a3045] text-white pr-20"
                  min="1"
                  max={selectedWallet.stakedAmount}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <Button
                    variant="ghost"
                    onClick={handleMaxUnstake}
                    className="h-full px-3 text-xs text-blue-400 hover:text-blue-300"
                  >
                    MAX
                  </Button>
                  <div className="px-3 pointer-events-none text-gray-400 bg-[#131b31] border-l border-[#2a3045] h-full flex items-center">
                    QCAP
                  </div>
                </div>
              </div>
              <Button
                onClick={handleUnstake}
                disabled={
                  isLoading ||
                  !unstakeAmount ||
                  Number(unstakeAmount) <= 0 ||
                  Number(unstakeAmount) > selectedWallet.stakedAmount
                }
                className="w-full bg-[#0066FF] hover:bg-[#0052cc] text-white"
              >
                {isLoading ? "Processing..." : "Unstake QCAP"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
