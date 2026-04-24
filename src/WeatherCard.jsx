// WeatherCard.jsx
// This component receives weather data as a prop and displays it.
// It does NOT fetch data itself — that's App.jsx's job.

const WeatherCard = ({ data }) => {

  // The OpenWeatherMap API returns temperature in the "main" object.
  // We round it to a whole number using Math.round().
  const temp = Math.round(data.main.temp)

  // The "weather" field is an array. We take the first item [0].
  const condition = data.weather[0]

  // Build the icon URL using the icon code from the API response.
  // OpenWeatherMap hosts icons at this URL pattern.
  const iconUrl = `https://openweathermap.org/img/wn/${condition.icon}@2x.png`

  return (
    <div className="weather-card">

      {/* --- City Name & Country --- */}
      <div className="city-name">{data.name}</div>
      <div className="country-badge">{data.sys.country}</div>

      {/* --- Temperature + Weather Icon --- */}
      <div className="weather-main">
        <div>
          {/* Math.round removes decimals (e.g. 28.4 → 28) */}
          <span className="temperature">{temp}</span>
          <span className="temp-unit">°C</span>
        </div>

        <div className="weather-icon-container">
          <img
            src={iconUrl}
            alt={condition.description}
            className="weather-icon"
          />
          {/* .description gives "light rain", .main gives "Rain" */}
          <div className="condition-text">{condition.description}</div>
        </div>
      </div>

      <div className="divider" />

      {/* --- Humidity & Wind Speed --- */}
      <div className="stats-row">

        {/* Humidity is a percentage (0–100) */}
        <div className="stat-box">
          <div className="stat-icon">💧</div>
          <div className="stat-label">Humidity</div>
          <div className="stat-value">
            {data.main.humidity}<span className="stat-unit">%</span>
          </div>
        </div>

        {/* Wind speed comes in m/s from the API */}
        <div className="stat-box">
          <div className="stat-icon">💨</div>
          <div className="stat-label">Wind</div>
          <div className="stat-value">
            {data.wind.speed}<span className="stat-unit"> m/s</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default WeatherCard
