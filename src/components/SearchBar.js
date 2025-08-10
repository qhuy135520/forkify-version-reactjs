import { useState } from 'react'

export default function SearchBar({ onSearchResults }) {
  const [inputSearch, setInputSearch] = useState('')
  function handleSubmit(e) {
    e.preventDefault()
    onSearchResults(inputSearch)
  }

  return (
    <form className='search' onSubmit={(e) => handleSubmit(e)}>
      <input
        type='text'
        className='search__field'
        placeholder='Search over 1,000,000 recipes...'
        value={inputSearch}
        onChange={(e) => setInputSearch(e.target.value)}
      />
      <button className='btn search__btn'>
        <svg className='search__icon'>
          <use href='assets/images/icons.svg#icon-search'></use>
        </svg>
        <span>Search</span>
      </button>
    </form>
  )
}
