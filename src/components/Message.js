export default function Message({ text }) {
  return (
    <div className='message'>
      <div>
        <svg>
          <use href='assets/images/icons.svg#icon-smile'></use>
        </svg>
      </div>
      <p>{text}</p>
    </div>
  )
}
