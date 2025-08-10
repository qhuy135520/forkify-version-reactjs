export default function RecipeDirections({ publisher, source }) {
  return (
    <div className='recipe__directions'>
      <h2 className='heading--2'>How to cook it</h2>
      <p className='recipe__directions-text'>
        This recipe was carefully designed and tested by
        <span className='recipe__publisher'> {publisher}</span>. Please check
        out directions at their website.
      </p>
      <a
        className='btn--small recipe__btn'
        href={source}
        target='_blank'
        rel='noreferrer'
      >
        <span>Directions</span>
        <svg className='search__icon'>
          <use href='assets/images/icons.svg#icon-arrow-right'></use>
        </svg>
      </a>
    </div>
  )
}
