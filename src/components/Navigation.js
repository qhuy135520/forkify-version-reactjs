import Bookmarks from './Bookmarks'

export default function Navigation({
  bookmarks,
  choseRecipeId,
  onChoseRecipeId,
  setIsOpenModal,
}) {
  return (
    <nav className='nav'>
      <ul className='nav__list'>
        <li className='nav__item'>
          <button
            className='nav__btn nav__btn--add-recipe'
            onClick={() => setIsOpenModal(true)}
          >
            <svg className='nav__icon'>
              <use href='assets/images/icons.svg#icon-edit'></use>
            </svg>
            <span>Add recipe</span>
          </button>
        </li>
        <li className='nav__item'>
          <button className='nav__btn nav__btn--bookmarks'>
            <svg className='nav__icon'>
              <use href='assets/images/icons.svg#icon-bookmark'></use>
            </svg>
            <span>Bookmarks</span>
          </button>
          <Bookmarks
            bookmarks={bookmarks}
            choseRecipeId={choseRecipeId}
            onChoseRecipeId={onChoseRecipeId}
          />
        </li>
      </ul>
    </nav>
  )
}
