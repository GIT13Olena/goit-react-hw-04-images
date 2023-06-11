import React, { useState } from 'react';

function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  function handleSearchQueryChange(event) {
    setSearchQuery(event.target.value);
  }

  function handleSearchFormSubmit(event) {
    event.preventDefault();
    onSubmit(searchQuery);
    setSearchQuery('');
  }

  return (
    <header className="searchbar">
      <form onSubmit={handleSearchFormSubmit}>
        <button type="submit">
          <span className="button-label">&#128270;</span>
        </button>

        <input
          className="input"
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

export default Searchbar;
