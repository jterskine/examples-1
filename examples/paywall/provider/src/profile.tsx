import React from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Paywall } from '@unlock-protocol/paywall'
import { networks } from '@unlock-protocol/networks'
import { useMemo, useState } from 'react'
import { WalletService } from '@unlock-protocol/unlock-js'
import { ethers } from 'ethers'

export function Profile() {
  const { address, isConnected } = useAccount()
  const provider = useMemo(() => {
    const paywall = new Paywall(networks)
    return paywall.getProvider('https://app.unlock-protocol.com', {
      clientId: 'http://localhost:5173/',
    })
  }, [])

  const { connect } = useConnect({
    connector: new InjectedConnector({
      options: {
        name: 'Unlock Paywall Provider',
        getProvider: () => {
          return provider
        },
      },
    }),
  })

  const { disconnect } = useDisconnect()
  const [isLoading, setIsLoading] = useState(false)

  if (isConnected) {
    return (
      <div>
        Connected to {address}
        <button
          onClick={() => {
            disconnect()
          }}
        >
          Disconnect
        </button>
        <button
          disabled={isLoading}
          onClick={async () => {
            setIsLoading(true)
            try {
              const web3Provider = new ethers.providers.Web3Provider(provider)
              const wallet = new WalletService(networks)
              // @ts-expect-error typing
              await wallet.connect(web3Provider)
              await wallet.createLock(
                {
                  name: 'Demo lock',
                  keyPrice: '0',
                  maxNumberOfKeys: 100,
                  expirationDuration: 100,
                  currencyContractAddress: null,
                  address: ethers.constants.AddressZero,
                },
                () => {}
              )
            } catch (error) {
              console.error(error)
            }
            setIsLoading(false)
          }}
        >
          {isLoading ? 'Creating lock...' : 'Create Lock'}
        </button>
      </div>
    )
  }
  return (
    <button
      onClick={() => {
        connect()
      }}
    >
      Connect
    </button>
  )
}
