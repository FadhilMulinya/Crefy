'use client'

import React, { useState, useEffect } from 'react'
import subdomain from './subdomain.json'
import { useAccount, useWalletClient } from 'wagmi'
import { ethers } from 'ethers'
import { useRouter } from 'next/navigation'

const { abi, address } = subdomain

const Acquire = () => {
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const { address: userAddress, isConnected } = useAccount()
  const { data: walletClient } = useWalletClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (!isConnected) {
      setError('Wallet not connected')
      return
    }

    if (!name.trim()) {
      setError('Name is required')
      return
    }

    try {
      setLoading(true)
      // Instead of submitting the transaction, we'll redirect to the KYC page
      const ensName = name.toLowerCase().replace(/\s+/g, '')
      
      // Redirect to KYC page with the name as a query parameter
      router.push(`https://crefy-kyc.vercel.app/?name=${encodeURIComponent(ensName)}`)
      
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Something went wrong')
      setLoading(false)
    }
  }

  const ensName = `${name.toLowerCase().replace(/\s+/g, '')}.crefy.eth`

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Register Your ENS Subname</h2>
        
        <div className="bg-blue-50 p-3 rounded-md mb-4">
          <p className="text-sm text-blue-700">
            <span className="font-medium">Network:</span> Currently on Ethereum (Sepolia testnet). Hedera integration coming soon!
          </p>
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="john"
            required
          />
          {name && (
            <p className="mt-1 text-sm text-gray-500">
              Your ENS will be: {ensName}
            </p>
          )}
        </div>

        <div className="bg-yellow-50 p-3 rounded-md">
          <p className="text-sm text-yellow-700">
            <span className="font-medium">Note:</span> After submitting, you'll be redirected to complete KYC verification. 
            Once verified, your subdomain will be registered automatically.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Continue to KYC'}
        </button>

        <div className="text-xs text-gray-500 mt-2">
          <p>This will redirect you to our KYC verification service. After completing verification, you'll receive your subdomain.</p>
          <p className="mt-1">Currently running on Sepolia testnet for development purposes.</p>
        </div>
      </form>

      <div className="mt-6 p-3 bg-gray-50 rounded-md text-center">
        <a 
          href="https://sepolia.app.ens.domains/crefy.eth?tab=subnames"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          View all verified subdomains on Sepolia →
        </a>
        <p className="text-xs text-gray-500 mt-1">
          See existing verified names under crefy.eth
        </p>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-md">
        <h3 className="font-medium text-blue-800 mb-1">Coming Soon:</h3>
        <p className="text-sm text-blue-700">
          We're working on integrating with Hedera to bring subdomains to their network, 
          introducing new financial models and opportunities. Stay tuned for updates!
        </p>
      </div>
    </div>
  )
}

export default Acquire