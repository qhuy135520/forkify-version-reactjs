import Ingredient from './Ingredient'

export default function RecipeIngredients({ ingredients }) {
  return (
    <div className='recipe__ingredients'>
      <h2 className='heading--2'>Recipe ingredients</h2>
      <ul className='recipe__ingredient-list'>
        {ingredients.map((ingredient, index) => {
          return <Ingredient key={index} ingredient={ingredient} />
        })}
      </ul>
    </div>
  )
}
