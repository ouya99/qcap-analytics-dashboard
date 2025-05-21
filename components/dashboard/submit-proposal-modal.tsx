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
import { LockIcon, Wallet } from "lucide-react"

interface WalletAddress {
  address: string
  stakedAmount: number
  balance: number
}

interface SubmitProposalModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (proposalData: ProposalData) => Promise<void>
  walletAddresses: WalletAddress[]
}

// Replace the PROPOSAL_TYPES array with this updated version
const PROPOSAL_TYPES = [
  {
    id: "funding",
    name: "Funding",
    fee: 200,
    duration: "5 days",
    parameters: [
      { name: "projectName", label: "Project Name", type: "text" },
      { name: "requestedAmount", label: "Requested Amount", type: "number", suffix: "QCAP" },
      { name: "fundingPeriod", label: "Funding Period", type: "number", suffix: "days" },
      { name: "expectedROI", label: "Expected ROI", type: "number", suffix: "%" },
      { name: "milestones", label: "Milestones", type: "text" },
      { name: "teamSize", label: "Team Size", type: "number" },
    ],
  },
  {
    id: "tech",
    name: "Tech",
    fee: 150,
    duration: "7 days",
    parameters: [
      { name: "featureName", label: "Feature Name", type: "text" },
      { name: "implementationTime", label: "Implementation Time", type: "number", suffix: "days" },
      { name: "resourcesNeeded", label: "Resources Needed", type: "text" },
      { name: "impactLevel", label: "Impact Level", type: "number", suffix: "%" },
      { name: "securityImplications", label: "Security Implications", type: "text" },
      { name: "backwardCompatibility", label: "Backward Compatibility", type: "text" },
    ],
  },
  {
    id: "governance",
    name: "Governance",
    fee: 150,
    duration: "7 days",
    parameters: [
      { name: "governanceChange", label: "Governance Change", type: "text" },
      { name: "affectedStakeholders", label: "Affected Stakeholders", type: "text" },
      { name: "implementationDeadline", label: "Implementation Deadline", type: "number", suffix: "days" },
      { name: "votingThreshold", label: "Voting Threshold", type: "number", suffix: "%" },
      { name: "quorumRequirement", label: "Quorum Requirement", type: "number", suffix: "%" },
    ],
  },
  {
    id: "parameter-change",
    name: "Parameter Change",
    fee: 100,
    duration: "3 days",
    parameters: [
      { name: "parameterName", label: "Parameter Name", type: "text" },
      { name: "currentValue", label: "Current Value", type: "text" },
      { name: "proposedValue", label: "Proposed Value", type: "text" },
      { name: "effectiveDate", label: "Effective Date", type: "text" },
    ],
  },
  {
    id: "emergency",
    name: "Emergency",
    fee: 300,
    duration: "1 day",
    parameters: [
      { name: "emergencyType", label: "Emergency Type", type: "text" },
      { name: "severity", label: "Severity (1-10)", type: "number" },
      { name: "immediateAction", label: "Immediate Action", type: "text" },
      { name: "affectedSystems", label: "Affected Systems", type: "text" },
      { name: "estimatedRecoveryTime", label: "Estimated Recovery Time", type: "number", suffix: "hours" },
    ],
  },
]

// Update the ProposalData interface
interface ProposalData {
  type: string
  parameters: Record<string, string>
  walletAddress: string
}

// Update the component function to remove title and description
export function SubmitProposalModal({ isOpen, onClose, onSubmit, walletAddresses }: SubmitProposalModalProps) {
  const [proposalType, setProposalType] = useState<string>("")
  const [parameters, setParameters] = useState<Record<string, string>>({})
  const [selectedWalletAddress, setSelectedWalletAddress] = useState<string>(
    walletAddresses.length > 0 ? walletAddresses[0].address : "",
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const selectedType = PROPOSAL_TYPES.find((type) => type.id === proposalType)
  const selectedWallet = walletAddresses.find((wallet) => wallet.address === selectedWalletAddress)

  const handleParameterChange = (param: string, value: string) => {
    setParameters((prev) => ({
      ...prev,
      [param]: value,
    }))
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      await onSubmit({
        type: proposalType,
        parameters,
        walletAddress: selectedWalletAddress,
      })
      onClose()
    } catch (error) {
      console.error("Failed to submit proposal:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const isValid =
    proposalType &&
    selectedType?.parameters.every((param) => parameters[param.name] && parameters[param.name].trim() !== "") &&
    selectedWalletAddress

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] md:max-w-[650px] bg-[#0a0e1a] text-white border-[#1a2035]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Submit Proposal</DialogTitle>
          <DialogDescription className="text-gray-400">
            Create a new proposal for the community to vote on
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
          {/* Wallet Address Selector */}
          <div className="bg-[#0f1424] p-4 rounded-md mb-4 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="mb-1 text-sm">Wallet</div>
              <div>
                <Select value={selectedWalletAddress} onValueChange={setSelectedWalletAddress}>
                  <SelectTrigger id="walletAddress" className="bg-[#131b31] border-[#2a3045] text-white w-full">
                    <SelectValue placeholder="Select wallet address" />
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
                  <div className="mt-2 flex items-center text-sm text-blue-400">
                    <LockIcon className="h-3.5 w-3.5 mr-1" />
                    <span>{selectedWallet.stakedAmount.toLocaleString()} QCAP staked</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-1 text-sm">Type</div>
              <Select onValueChange={setProposalType} value={proposalType}>
                <SelectTrigger id="proposalType" className="bg-[#131b31] border-[#2a3045] text-white w-full">
                  <SelectValue placeholder="Select proposal type" />
                </SelectTrigger>
                <SelectContent className="bg-[#131b31] border-[#2a3045] text-white max-h-[300px]">
                  {PROPOSAL_TYPES.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name} ({type.fee} QCAP)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedType && (
            <div className="mt-4">
              <h3 className="font-medium mb-3">Parameters</h3>
              <div className="space-y-4">
                {selectedType.parameters.map((param) => (
                  <div key={param.name} className="flex flex-col">
                    <Label htmlFor={param.name} className="mb-2">
                      {param.label}
                    </Label>
                    <div className="relative">
                      <Input
                        id={param.name}
                        type={param.type}
                        value={parameters[param.name] || ""}
                        onChange={(e) => handleParameterChange(param.name, e.target.value)}
                        className="bg-[#131b31] border-[#2a3045] text-white pr-12 w-full"
                      />
                      {param.suffix && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{param.suffix}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-[#2a3045] text-white hover:bg-[#2a3045]">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !isValid}
            className="bg-[#0066FF] hover:bg-[#0052cc] text-white"
          >
            {isLoading ? "Submitting..." : "Submit Proposal"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
