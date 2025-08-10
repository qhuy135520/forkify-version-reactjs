export default function BookmarksItem({
  book,
  choseRecipeId,
  onChoseRecipeId,
}) {
  return (
    <li className='preview' onClick={() => onChoseRecipeId(book.id)}>
      <a
        className={`preview__link ${
          book.id === choseRecipeId ? 'preview__link--active' : ''
        } `}
        href={`#${book.id}`}
      >
        <figure className='preview__fig'>
          <img src={`${book.image}`} alt={`${book.title}`} />
        </figure>
        <div className='preview__data'>
          <h4 className='preview__title'>{`${book.title}`}</h4>
          <p className='preview__publisher'>{`${book.publisher}`}</p>
          <div
            className={`preview__user-generated ${book.key ? '' : 'hidden'}`}
          >
            <svg>
              <use href='assets/images/icons.svg#icon-user'></use>
            </svg>
          </div>
        </div>
      </a>
    </li>
  )
}
