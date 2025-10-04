import { useGeometryPoints, useSocket } from "./hook"
import { Map } from "./components/map"

const App = () => {
  const { setCurrentPosition } = useGeometryPoints();
  const { isConnected } = useSocket({ handleSyncObjectPosition: (value: string) => {
    setCurrentPosition(JSON.parse(value));
  }});

  return <Map />

  return isConnected ? <Map /> : <p>Disconnected</p>
}

export default App
