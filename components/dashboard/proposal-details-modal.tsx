"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Clock, Wallet } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"

// Updated interface to match the new proposal structure
interface Parameter {
  name: string
  label: string
  type: string
  value: string
  suffix?: string
}

interface WalletAddress {
  address: string
  stakedAmount: number
  balance: number
}

interface ProposalDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  proposal: Proposal
  onVote: (proposalId: string, vote: "for" | "against", walletAddress: string) => Promise<void>
  walletAddresses: WalletAddress[]
}

interface Proposal {
  id: string
  title: string // Still needed for display purposes
  type: string
  parameters: Parameter[]
  participation: {
    total: number
    voted: number
  }
  votes: {
    for: number
    against: number
  }
  timeRemaining: string
  status: "active" | "passed" | "rejected" | "pending"
  userHasVoted?: boolean
  userVote?: "for" | "against"
}

export function ProposalDetailsModal({ isOpen, onClose, proposal, onVote, walletAddresses }: ProposalDetailsModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedWalletAddress, setSelectedWalletAddress] = useState<string>("")
  const [userVote, setUserVote] = useState<"for" | "against" | undefined>(proposal.userVote)

  // Set default wallet address when modal opens
  useEffect(() => {
    if (isOpen && walletAddresses.length > 0 && !selectedWalletAddress) {
      setSelectedWalletAddress(walletAddresses[0].address)
    }
  }, [isOpen, walletAddresses, selectedWalletAddress])

  const handleVote = async (vote: "for" | "against") => {
    try {
      setIsLoading(true)
      await onVote(proposal.id, vote, selectedWalletAddress)
      setUserVote(vote)
    } catch (error) {
      console.error("Failed to vote:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Get the selected wallet's data
  const selectedWallet = walletAddresses.find((w) => w.address === selectedWalletAddress) || {
    address: "",
    stakedAmount: 0,
    balance: 0,
  }

  const totalVotes = proposal?.votes ? (proposal.votes.for + proposal.votes.against) : 0
  const forPercentage = totalVotes > 0 ? Math.round((proposal?.votes?.for || 0) / totalVotes * 100) : 0
  const againstPercentage = totalVotes > 0 ? Math.round((proposal?.votes?.against || 0) / totalVotes * 100) : 0
  const participationPercentage = Math.round(((proposal?.participation?.voted || 0) / (proposal?.participation?.total || 1)) * 100)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-[#0f1424] text-white border-[#1a2035]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white text-xs font-medium px-2.5 py-0.5 rounded">{proposal.type}</div>
            <div className="flex items-center gap-1 text-xs">
              <Clock className="h-3 w-3" />
              <span>{proposal.timeRemaining}</span>
            </div>
          </div>
          <DialogTitle className="text-xl font-bold mt-2">{proposal.title}</DialogTitle>
          <DialogDescription className="text-gray-400">Proposal ID: {proposal.id}</DialogDescription>
        </DialogHeader>

        {/* Wallet Selector */}
        <div className="bg-[#1a2035] p-4 rounded-md mb-4">
          <div className="text-sm mb-2">Select wallet to vote with</div>
          <Select value={selectedWalletAddress} onValueChange={setSelectedWalletAddress}>
            <SelectTrigger className="bg-[#131b31] border-[#2a3045] text-white">
              {selectedWalletAddress ? (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <Wallet className="h-3.5 w-3.5 mr-2 text-blue-400" />
                    <span className="truncate">{selectedWalletAddress}</span>
                  </div>
                  <div className="text-blue-400 text-sm ml-2">
                    {walletAddresses.find((w) => w.address === selectedWalletAddress)?.stakedAmount.toLocaleString()}{" "}
                    voting power
                  </div>
                </div>
              ) : (
                <div className="text-gray-400">Select wallet address</div>
              )}
            </SelectTrigger>
            <SelectContent className="bg-[#131b31] border-[#2a3045] text-white max-h-[300px]">
              {walletAddresses.map((wallet) => (
                <SelectItem key={wallet.address} value={wallet.address}>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <Wallet className="h-3.5 w-3.5 mr-2 text-blue-400" />
                      <span>{wallet.address}</span>
                    </div>
                    <div className="text-blue-400 text-sm ml-2">
                      {wallet.stakedAmount.toLocaleString()} voting power
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Parameters</h3>
              <div className="grid grid-cols-1 gap-2">
                {proposal?.parameters?.map((param) => (
                  <div key={param.name} className="bg-[#1a2035] p-3 rounded-md">
                    <div className="text-xs text-gray-400">{param.label}</div>
                    <div className="font-medium mt-1">
                      {param.value}
                      {param.suffix && <span className="text-gray-400 ml-1">{param.suffix}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Voting Results</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>For</span>
                    </div>
                    <span>
                      {forPercentage}% ({proposal?.votes?.for || 0})
                    </span>
                  </div>
                  <Progress value={forPercentage} className="h-2 bg-[#1a2035] [&>[role=progressbar]]:bg-green-500" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <div className="flex items-center gap-1">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span>Against</span>
                    </div>
                    <span>
                      {againstPercentage}% ({proposal?.votes?.against || 0})
                    </span>
                  </div>
                  <Progress value={againstPercentage} className="h-2 bg-[#1a2035] [&>[role=progressbar]]:bg-red-500" />
                </div>

                <div className="pt-2">
                  <div className="flex justify-between mb-1">
                    <span>Participation</span>
                    <span>
                      {participationPercentage}% ({proposal?.participation?.voted || 0}/{proposal?.participation?.total || 0})
                    </span>
                  </div>
                  <Progress value={participationPercentage} className="h-2 bg-[#1a2035] [&>[role=progressbar]]:bg-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          {!userVote && proposal.status === "active" ? (
            <>
              <Button
                onClick={() => handleVote("against")}
                disabled={isLoading || selectedWallet.stakedAmount <= 0}
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-500/10 hover:text-red-400 w-full sm:w-auto"
              >
                Vote Against
              </Button>
              <Button
                onClick={() => handleVote("for")}
                disabled={isLoading || selectedWallet.stakedAmount <= 0}
                className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
              >
                Vote For
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2 mr-auto">
              {userVote && (
                <div className="flex items-center gap-1 bg-[#1a2035] px-3 py-1.5 rounded-md">
                  <span>Your vote:</span>
                  {userVote === "for" ? (
                    <span className="flex items-center text-green-500">
                      <CheckCircle className="h-4 w-4 mr-1" /> For
                    </span>
                  ) : (
                    <span className="flex items-center text-red-500">
                      <XCircle className="h-4 w-4 mr-1" /> Against
                    </span>
                  )}
                </div>
              )}
              <Button onClick={onClose} className="ml-auto bg-[#0066FF] hover:bg-[#0052cc] text-white">
                Close
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
