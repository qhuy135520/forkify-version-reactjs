export default function Error({ text }) {
  return (
    <div className='error'>
      <div>
        <svg>
          <use href='assets/images/icons.svg#icon-alert-triangle'></use>
        </svg>
      </div>
      {/* <p>No recipes found for your query. Please try again!</p> */}
      <p>{text}</p>
    </div>
  )
}
