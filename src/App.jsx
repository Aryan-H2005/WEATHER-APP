// App.jsx
// This is the main component. It handles:
//   1. Storing state (city input, weather data, loading, errors)
//   2. Fetching data from the OpenWeatherMap API using Axios
//   3. Deciding what to show on screen (loading / error / weather)

import { useState } from 'react'
import axios from 'axios'

import SearchBar from './SearchBar'
import WeatherCard from './WeatherCard'

// Read the API key from the .env file.
// In Vite, environment variables must start with VITE_ to be accessible here.
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

const App = () => {

  // --- STATE ---
  // useState(initialValue) returns [currentValue, setterFunction]

  // What the user typed in the search box
  const [city, setCity] = useState('')

  // The weather data object returned by the API (or null if not fetched yet)
  const [weather, setWeather] = useState(null)

  // true while waiting for the API response
  const [loading, setLoading] = useState(false)

  // A string describing what went wrong (or null if no error)
  const [error, setError] = useState(null)


  // --- FETCH WEATHER ---
  // This function runs when the user clicks Search (or presses Enter).
  const fetchWeather = async () => {

    // Don't do anything if the user hasn't typed a city
    if (!city.trim()) return

    // Start loading: show spinner, clear old results and errors
    setLoading(true)
    setError(null)
    setWeather(null)

    try {
      // Make a GET request to the OpenWeatherMap API.
      // Template literal inserts the city name and API key into the URL.
      // units=metric gives us Celsius.
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

      // axios.get returns a Promise — we await it so execution pauses here
      // until the response arrives. The actual data lives in response.data.
      const response = await axios.get(url)

      // Save the weather data into state so WeatherCard can display it
      setWeather(response.data)

    } catch (err) {
      // If the city isn't found, the API returns a 404 status code.
      // Axios throws an error for any non-2xx status, which we catch here.
      if (err.response && err.response.status === 404) {
        setError(`City "${city}" not found. Please check the spelling and try again.`)
      } else if (err.response && err.response.status === 401) {
        setError('Invalid API key. Check your .env file.')
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      // finally runs whether the request succeeded or failed.
      // Always stop the loading spinner here.
      setLoading(false)
    }
  }


  // --- RENDER ---
  return (
    <div className="app">

      <h1 className="app-title">
        <span>🌤</span> Weather App
      </h1>

      {/* Search input + button */}
      <SearchBar
        city={city}
        setCity={setCity}
        onSearch={fetchWeather}
        loading={loading}
      />

      {/* Show spinner while loading */}
      {loading && (
        <div className="loading-card">
          <div className="spinner" />
          <p className="loading-text">Fetching weather data…</p>
        </div>
      )}

      {/* Show error if something went wrong.
          The ! before loading means "only show this when NOT loading" */}
      {!loading && error && (
        <div className="error-card">
          <div className="error-icon">⚠️</div>
          <div>
            <div className="error-title">Oops!</div>
            <div className="error-message">{error}</div>
          </div>
        </div>
      )}

      {/* Show weather card only when we have data and no error */}
      {!loading && !error && weather && (
        <WeatherCard data={weather} />
      )}

    </div>
  )
}

export default App
