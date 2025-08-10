import Header from './Header'
import SearchResults from './SearchResults'
import Recipe from './Recipe'
import AddRecipeModal from './AddRecipeModal'
import Overlay from './Overlay'
import { useEffect, useState } from 'react'
import { sendRequest } from '../utils/api'
import { API_URL, KEY, RES_PER_PAGE } from '../utils/config'
import { createRecipeObject } from '../utils/createRecipeObject'
import recipeFake from '../utils/recipe.json'
import Spinner from './Spinner'
import ResultList from './ResultList'
import Pagination from './Pagination'
import CopyRight from './CopyRight'
import RecipeFigure from './RecipeFigure'
import RecipeDetail from './RecipeDetail'
import RecipeDirections from './RecipeDirections'
import RecipeIngredients from './RecipeIngredients'
import Message from '../components/Message'
import SearchBar from './SearchBar'
import Navigation from './Navigation'
import Logo from './Logo'

export default function App() {
  const [choseRecipeId, setChoseRecipeId] = useState('664c8f193e7aa067e94e897b')
  const [recipe, setRecipe] = useState()
  const [searchResults, setSearchResults] = useState()
  const [bookmarks, setBookmarks] = useState([])
  const [resultPerPage, setResultPerPage] = useState()

  const [loadingRecipe, setLoadingRecipe] = useState(true)
  const [loadingSearch, setLoadingSearch] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = searchResults
    ? Math.ceil(searchResults?.length / RES_PER_PAGE)
    : 1
  const [isOpenModal, setIsOpenModal] = useState(false)
  useEffect(() => {
    async function fetchRecipeData() {
      try {
        const storage = await localStorage.getItem('bookmarks')
        if (storage) setBookmarks(JSON.parse(storage))
        setLoadingRecipe(true)
        const resRecipe = await sendRequest({
          url: `${API_URL}/${choseRecipeId}?key=${KEY}`,
        })
        setRecipe(createRecipeObject(resRecipe))
        // setRecipe(createRecipeObject(recipeFake))
      } catch (err) {
        console.error(err)
      } finally {
        setLoadingRecipe(false)
      }
    }
    fetchRecipeData()
  }, [choseRecipeId])

  async function handleSearchResults(query) {
    if (!query) return
    try {
      setLoadingSearch(true)
      const resResults = await sendRequest({
        url: `${API_URL}?search=${query}&key=${KEY}`,
        method: 'GET',
      })
      const newSearchResult = [...resResults.data.recipes]
      setSearchResults(newSearchResult)
      handlePageChange(1, newSearchResult)
    } catch (error) {
    } finally {
      setLoadingSearch(false)
    }
  }

  const persistBookmarks = function (bookmarks) {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }

  async function handleAddBookmarks(e) {
    e.preventDefault()
    const newBookmarks = [...bookmarks, recipe]
    setBookmarks(newBookmarks)
    setRecipe({ ...recipe, bookmarked: true })
    persistBookmarks(newBookmarks)
  }

  async function handleDeleteBookmarks(e) {
    e.preventDefault()
    const newBookmarks = bookmarks.filter((book) => book.id !== recipe.id)
    await setBookmarks([...newBookmarks])
    await setRecipe({ ...recipe, bookmarked: false })
    persistBookmarks(newBookmarks)
  }

  async function handleUpdateServings(newServings) {
    if (newServings === 0) return
    let newIngredients = await [...recipe.ingredients]
    newIngredients.forEach((ingredient) => {
      ingredient.quantity =
        (ingredient.quantity * newServings) / recipe.servings
    })

    setRecipe({ ...recipe, ingredients: newIngredients, servings: newServings })
  }

  function handlePageChange(pageChange, searchResultPerPage) {
    setCurrentPage(pageChange)
    setResultPerPage((prev) => {
      const start = (pageChange - 1) * RES_PER_PAGE
      const end = pageChange * RES_PER_PAGE
      return [...searchResultPerPage.slice(start, end)]
    })
  }

  return (
    <div className='container'>
      <Header>
        <Logo />
        <SearchBar onSearchResults={handleSearchResults} />
        <Navigation
          setIsOpenModal={setIsOpenModal}
          bookmarks={bookmarks}
          choseRecipeId={choseRecipeId}
          onChoseRecipeId={setChoseRecipeId}
        />
      </Header>

      <SearchResults>
        {loadingSearch ? (
          <Spinner />
        ) : searchResults?.length === 0 ? (
          <Message text={`No recipe found for your query! Please try again!`} />
        ) : (
          <>
            <ResultList
              resultPerPage={resultPerPage}
              choseRecipeId={choseRecipeId}
              onChoseRecipeId={setChoseRecipeId}
            />
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              searchResults={searchResults}
            />
            <CopyRight />
          </>
        )}
      </SearchResults>

      <Recipe>
        {loadingRecipe ? (
          <Spinner />
        ) : !recipe ? (
          <Message text='Start by searching for a recipe or an ingredient. Have fun!' />
        ) : (
          <>
            <RecipeFigure image={recipe.image} title={recipe.title} />
            <RecipeDetail
              recipe={recipe}
              bookmarks={bookmarks}
              onAddBookmarks={handleAddBookmarks}
              onDeleteBookmarks={handleDeleteBookmarks}
              onUpdateServings={handleUpdateServings}
            />
            <RecipeIngredients ingredients={recipe.ingredients} />
            <RecipeDirections
              publisher={recipe.publisher}
              source={recipe.source}
            />
          </>
        )}
      </Recipe>

      <AddRecipeModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        onAddBookmarks={handleAddBookmarks}
      />
      <Overlay isOpenModal={isOpenModal} />
    </div>
  )
}

