import BookmarksItem from './BookmarksItem'

export default function Bookmarks({
  bookmarks,
  choseRecipeId,
  onChoseRecipeId,
}) {
  if (bookmarks.length === 0) {
    return (
      <div className='bookmarks'>
        <ul className='bookmarks__list'>
          <div className='message'>
            <div>
              <svg>
                <use href='assets/images/icons.svg#icon-smile'></use>
              </svg>
            </div>
            <p>No bookmarks yet. Find a nice recipe and bookmark it :)</p>
          </div>
        </ul>
      </div>
    )
  }

  return (
    <div className='bookmarks'>
      <ul className='bookmarks__list'>
        {bookmarks.map((book, index) => {
          return (
            <BookmarksItem
              key={index}
              book={book}
              choseRecipeId={choseRecipeId}
              onChoseRecipeId={onChoseRecipeId}
            />
          )
        })}
      </ul>
    </div>
  )
}
