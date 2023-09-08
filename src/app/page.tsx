import ServerComponent from './serverComponent'
import ClientComponent from './clientComponent'
import { Provider } from './providers'

export default function Home() {
  return (
    <Provider>
      <main className="flex justify-center bg-slate-900 h-screen">
        <div className="w-[800px] mt-16">
          <ServerComponent />
          <ClientComponent />
        </div>
      </main>
    </Provider>
  )
}
