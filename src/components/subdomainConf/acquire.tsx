'use client'

import React, { useState } from 'react'
import subdomain from './subdomain.json'
import { useAccount, useWalletClient } from 'wagmi'
import { ethers } from 'ethers'

const { abi, address } = subdomain

const Acquire = () => {
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [txHash, setTxHash] = useState<string | null>(null)

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

      const provider = new ethers.BrowserProvider(walletClient?.transport as any) // Wagmi v1-style transport
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(address, abi, signer)

      const tx = await contract.registerSubname(name)
      setTxHash(tx.hash)
      await tx.wait()

      setSubmitted(true)
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setName('')
    setSubmitted(false)
    setError(null)
    setTxHash(null)
  }

  const ensName = `${name.toLowerCase().replace(/\s+/g, '')}.crefy.eth`
  const etherscanUrl = txHash ? `https://etherscan.io/tx/${txHash}` : '#'

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Register Your ENS Subname</h2>

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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Submit'}
          </button>
        </form>
      ) : (
        <div className="text-center space-y-4">
          <div className="text-6xl mb-2">✅</div>
          <h2 className="text-xl font-bold text-green-600">Success!</h2>
          <p className="text-gray-700 mb-2">
            Congratulations, <span className="font-semibold">{name}</span>! Your ENS subname has been registered onchain.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg text-left">
            {txHash && (
              <>
                <h3 className="font-medium text-lg mb-2">Transaction Details:</h3>
                <p className="truncate mb-2 text-sm">
                  <span className="font-medium">TX Hash:</span> {txHash}
                </p>
                <a
                  href={etherscanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-block mb-4 text-sm"
                >
                  Verify on Etherscan →
                </a>
              </>
            )}

            <h3 className="font-medium text-lg mb-2 mt-4">Your New ENS Name:</h3>
            <p className="font-bold text-xl text-blue-700 mb-4">{ensName}</p>

            <h3 className="font-medium text-lg mb-2">What You Can Do Now:</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Receive ETH, tokens, and NFTs using your yourname.crefy.eth</li>
              <li>Showcase your verified profile with credentials and social links</li>
              <li>Prove your identity and connect to dApps with one trusted name</li>
              <li>Get easily verified by communities, platforms, and institutions</li>
              <li>Share your {ensName} name instead of a long, unreadable wallet address</li>

            </ul>
          </div>

          <button
            onClick={handleReset}
            className="mt-4 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            Register Another
          </button>
        </div>
      )}
    </div>
  )
}

export default Acquire