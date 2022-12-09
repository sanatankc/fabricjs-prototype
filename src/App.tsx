import { useState } from 'react'
import CanvasFiber from './CanvasFiber'
import reactLogo from './assets/react.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <CanvasFiber />
    </div>
  )
}

export default App
