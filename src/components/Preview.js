export default function Preview({ choseRecipeId, recipe, onChoseRecipeId }) {
  recipe = {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    image: recipe.image_url,
    ...(recipe.key && { key: recipe.key }),
  }
  //  preview__link--active
  return (
    <li
      className={`preview ${
        recipe.id === choseRecipeId ? `preview__link--active` : ''
      }`}
      onClick={() => onChoseRecipeId(recipe.id)}
    >
      <a className='preview__link' href={`#${recipe.id}`}>
        <figure className='preview__fig'>
          <img src={recipe.image} alt={recipe.title} />
        </figure>
        <div className='preview__data'>
          <h4 className='preview__title'>{recipe.title}</h4>
          <p className='preview__publisher'>{recipe.publisher}</p>
          <div
            className={`preview__user-generated ${recipe.key ? '' : 'hidden'}`}
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
