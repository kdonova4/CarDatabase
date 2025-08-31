import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useTitle from './useTitle'

function App() {
  const [count, setCount] = useState(0)
  useTitle(`You clicked ${count} times`);
  
  const handleClick = () => {
    alert('Butoon Pressed');
  }

  return (
    <>
      
      <div className="card">
        <button onClick={handleClick}>
          count is {count}
        </button>
        
      </div>
      
    </>
  )
}

export default App
