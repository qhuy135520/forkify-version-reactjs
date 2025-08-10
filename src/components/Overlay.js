export default function Overlay({ isOpenModal }) {
  return <div className={`overlay ${!isOpenModal ? 'hidden' : ''}`}></div>
}
