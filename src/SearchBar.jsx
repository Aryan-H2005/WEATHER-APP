// SearchBar.jsx
// This component shows an input field and a search button.
// The parent (App.jsx) controls the value and what happens on submit.

const SearchBar = ({ city, setCity, onSearch, loading }) => {

  // This runs when the user presses Enter in the input field.
  // It calls the same onSearch function as the button click.
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }

  return (
    <div className="search-card">
      <label className="search-label" htmlFor="city-input">
        Enter a city
      </label>

      <div className="search-row">
        {/* Controlled input: its value comes from state (city),
            and it updates state every time the user types (setCity) */}
        <input
          id="city-input"
          type="text"
          className="search-input"
          placeholder="e.g. Mumbai, London..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* Button is disabled while data is loading so the user
            can't spam requests. */}
        <button
          className="search-button"
          onClick={onSearch}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>
    </div>
  )
}

export default SearchBar
