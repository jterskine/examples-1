import { useAccount, useChainId, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore (this is a local package)
import { Paywall } from '@unlock-protocol/paywall'
import networks from '@unlock-protocol/networks'

const paywall = new Paywall(networks)

export function Profile() {
  const { address, isConnected, connector } = useAccount()
  const chainId = useChainId();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  const checkout = async () => {
    if (connector) {
      const paywallConfig = {
        locks: {
          '0x6E073485c8177b055de1521878c5dDC4F62A65d7': {
            network: chainId,
          },
        },
        title: 'Hello world',
        icon: 'https://i.seadn.io/gcs/files/00c274eb1f4440f3f4919e6d9e40b35d.png?auto=format&dpr=1&w=48',
        skipSelect: true,
        skipRecipient: true,
      }
      await paywall.connect(await connector.getProvider())
      await paywall.loadCheckoutModal(paywallConfig)
    }
    // You can use the returned value above to get a transaction hash if needed!
    return false
  }

  if (isConnected)
    return (
      <div style={{backgroundColor: 'lavender'}}>
        Connected to {address}
        <button onClick={() => disconnect()}>Disconnect</button>
        <button onClick={() => checkout()}>Checkout!</button>
      </div>
    )
  return <button onClick={() => connect()}>Connect Wallet</button>
}
