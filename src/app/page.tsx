import ServerComponent from './serverComponent'
import ClientComponent from './clientComponent'
import { Provider } from './providers'

export default function Home() {
  return (
    <Provider>
      <ServerComponent />
      <ClientComponent />
    </Provider>
  )
}
