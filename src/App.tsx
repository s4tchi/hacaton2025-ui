import { useGeometryPoints, useSocket } from "./hook"

const App = () => {
  const { setCurrentPosition } = useGeometryPoints();
  const { isConnected } = useSocket({ handleSyncObjectPosition: (value: string) => {
    setCurrentPosition(JSON.parse(value));
  }});

  return isConnected ? <p>Connected</p> : <p>Disconnected</p>
}

export default App
