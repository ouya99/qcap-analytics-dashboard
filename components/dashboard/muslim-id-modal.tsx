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
import { CheckCircle, Wallet } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MuslimIdModalProps {
  isOpen: boolean
  onClose: () => void
  walletAddresses: string[] // Array of wallet addresses
  onRegister: (address: string) => Promise<void>
}

export function MuslimIdModal({ isOpen, onClose, walletAddresses, onRegister }: MuslimIdModalProps) {
  const [selectedAddress, setSelectedAddress] = useState<string>(walletAddresses[0] || "")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isRegistered, setIsRegistered] = useState<boolean>(false)

  const handleRegister = async () => {
    try {
      setIsLoading(true)
      await onRegister(selectedAddress)
      setIsRegistered(true)
    } catch (error) {
      console.error("Failed to register MuslimID:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#0f1424] text-white border-[#1a2035]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Register MuslimID</DialogTitle>
          <DialogDescription className="text-gray-400">Register your wallet address as a MuslimID</DialogDescription>
        </DialogHeader>

        {!isRegistered ? (
          <>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="wallet" className="text-right">
                  Wallet
                </Label>
                <div className="col-span-3">
                  <Select value={selectedAddress} onValueChange={setSelectedAddress}>
                    <SelectTrigger id="wallet" className="bg-[#1a2035] border-[#2a3045] text-white">
                      <SelectValue placeholder="Select wallet address" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a2035] border-[#2a3045] text-white">
                      {walletAddresses.map((address) => (
                        <SelectItem key={address} value={address}>
                          <div className="flex items-center">
                            <Wallet className="h-3.5 w-3.5 mr-2 text-blue-400" />
                            <span>{address}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={onClose} className="border-[#2a3045] text-white hover:bg-[#2a3045]">
                Cancel
              </Button>
              <Button
                onClick={handleRegister}
                disabled={isLoading || !selectedAddress}
                className="bg-[#0066FF] hover:bg-[#0052cc] text-white"
              >
                {isLoading ? "Processing..." : "Register"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="py-6 flex flex-col items-center justify-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-xl font-medium mb-2">Registration Successful</h3>
            <p className="text-gray-400 text-center mb-6">Your wallet has been successfully registered as a MuslimID</p>
            <Button onClick={onClose} className="bg-[#0066FF] hover:bg-[#0052cc] text-white">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
