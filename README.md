# 🌤 Simple Weather App

A beginner-friendly weather app built with **React + Vite**.
Search any city and instantly see the temperature, weather condition, humidity, and wind speed.

---

## 📁 File Structure

```
simple-weather/
├── src/
│   ├── App.jsx          ← Main component (state + API call)
│   ├── SearchBar.jsx    ← Search input + button
│   ├── WeatherCard.jsx  ← Displays fetched weather
│   ├── main.jsx         ← Entry point (mounts React app)
│   └── index.css        ← All styling
├── index.html
├── .env                 ← Your secret API key (you create this)
├── .env.example         ← Template showing what .env should look like
├── package.json
└── vite.config.js
```

---

## 🚀 Setup (Step by Step)

### Step 1 — Install Node.js
Download from [nodejs.org](https://nodejs.org) if you haven't already.
Check it's working: `node -v` should print a version number.

### Step 2 — Open the project folder
```bash
cd simple-weather
```

### Step 3 — Install dependencies
```bash
npm install
```
This reads `package.json` and downloads React, Axios, and Vite into `node_modules/`.

### Step 4 — Get a free API key
1. Go to [openweathermap.org](https://openweathermap.org) and create a free account
2. Click your username → **My API Keys**
3. Copy the default key (it's a long string of letters and numbers)

> ⚠️ New keys can take up to **2 hours** to activate. If you get a 401 error, just wait a bit.

### Step 5 — Create your `.env` file
In the project root, create a file called `.env` (no other name):

```
VITE_OPENWEATHER_API_KEY=paste_your_key_here
```

Example:
```
VITE_OPENWEATHER_API_KEY=abc123def456ghi789
```

> 🔒 Never share this file or commit it to GitHub. It contains your secret key.

### Step 6 — Run the app
```bash
npm run dev
```

Open your browser at **http://localhost:5173**

---

## 🧠 How It Works (for Beginners)

| Concept | Where it's used |
|---------|----------------|
| `useState` | `App.jsx` — stores city, weather, loading, error |
| `async/await` | `App.jsx` — waits for the API response before updating state |
| `axios.get()` | `App.jsx` — sends the HTTP request to OpenWeatherMap |
| Props | `App.jsx` passes data down to `SearchBar` and `WeatherCard` |
| Conditional rendering | `App.jsx` — shows loading / error / weather based on state |
| `.env` variables | `import.meta.env.VITE_*` — keeps the API key out of your code |

---

## 🌐 API Used

**OpenWeatherMap — Current Weather**
```
GET https://api.openweathermap.org/data/2.5/weather?q={city}&appid={key}&units=metric
```

Key fields from the response:
- `data.name` — city name
- `data.sys.country` — country code (e.g. "IN")
- `data.main.temp` — temperature in °C
- `data.main.humidity` — humidity percentage
- `data.wind.speed` — wind speed in m/s
- `data.weather[0].description` — condition text (e.g. "light rain")
- `data.weather[0].icon` — icon code used to build the icon image URL

---

## 🛠 Build for Production

```bash
npm run build
```
This creates an optimised `dist/` folder you can deploy anywhere (Vercel, Netlify, etc.).
