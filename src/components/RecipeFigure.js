export default function RecipeFigure({ image, title }) {
  return (
    <figure className='recipe__fig'>
      <img src={image} alt='Tomato' className='recipe__img' />
      <h1 className='recipe__title'>
        <span>{title}</span>
      </h1>
    </figure>
  )
}
