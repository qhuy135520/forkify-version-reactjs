export default function RecipeDetail({
  recipe,
  bookmarks,
  onAddBookmarks,
  onDeleteBookmarks,
  onUpdateServings,
}) {
  const bookmarked = bookmarks.some((bookmark) => bookmark.id === recipe.id)

  return (
    <div className='recipe__details'>
      <div className='recipe__info'>
        <svg className='recipe__info-icon'>
          <use href='assets/images/icons.svg#icon-clock'></use>
        </svg>
        <span className='recipe__info-data recipe__info-data--minutes'>
          {recipe.cookingTime}
        </span>
        <span className='recipe__info-text'>minutes</span>
      </div>
      <div className='recipe__info'>
        <svg className='recipe__info-icon'>
          <use href='assets/images/icons.svg#icon-users'></use>
        </svg>
        <span className='recipe__info-data recipe__info-data--people'>
          {recipe.servings}
        </span>
        <span className='recipe__info-text'>servings</span>

        <div className='recipe__info-buttons'>
          <button
            className='btn--tiny btn--increase-servings'
            onClick={() => onUpdateServings(+recipe.servings - 1)}
          >
            <svg>
              <use href='assets/images/icons.svg#icon-minus-circle'></use>
            </svg>
          </button>
          <button
            className='btn--tiny btn--increase-servings'
            onClick={() => onUpdateServings(+recipe.servings + 1)}
          >
            <svg>
              <use href='assets/images/icons.svg#icon-plus-circle'></use>
            </svg>
          </button>
        </div>
      </div>
      <div className='recipe__user-generated'>
        <svg>
          <use href='assets/images/icons.svg#icon-user'></use>
        </svg>
      </div>
      <button
        className='btn--round'
        onClick={
          !bookmarked ? (e) => onAddBookmarks(e) : (e) => onDeleteBookmarks(e)
        }
      >
        <svg className=''>
          <use
            href={`assets/images/icons.svg#icon-bookmark${
              bookmarked ? '-fill' : ''
            }`}
          ></use>
        </svg>
      </button>
    </div>
  )
}
