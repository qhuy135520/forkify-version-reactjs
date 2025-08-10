import Fraction from 'fraction.js'

export default function Ingredient({ ingredient }) {
  return (
    <li className='recipe__ingredient'>
      <svg className='recipe__icon'>
        <use href='assets/images/icons.svg#icon-check'></use>
      </svg>
      <div className='recipe__quantity'>
        {ingredient.quantity
          ? new Fraction(ingredient.quantity).toFraction()
          : ''}
      </div>
      <div className='recipe__description'>
        <span className='recipe__unit'>{ingredient.unit}</span>
        {ingredient.description}
      </div>
    </li>
  )
}
