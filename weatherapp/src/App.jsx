import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [weather, setWeather] = useState({
    temp: '', desc: '', icon: ''
  });

  useEffect(() => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=London&APIKey=0da27f16c54874946e2209c6aad33b71&units=metric')
    .then(response => response.json())
    .then(result => {
      setWeather({
        temp: result.main.temp,
        desc: result.weather[0].main,
        icon: result.weather[0].icon
      });
    })
    .catch(err => console.error(err))
  }, [])

  if(weather.icon) {
    return(
      <>
        <p> Temperature: {weather.temp} °C</p>
        <p> Description: {weather.desc}</p>
        <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt='Weather icon'/>
      </>
    )
  } else {
    return <div>Loading...</div>
  }

  return (
    <>
      
    </>
  )
}

export default App
