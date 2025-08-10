import Logo from './Logo'
import SearchBar from './SearchBar'
import Navigation from './Navigation'

export default function Header({ children }) {
  return <header className='header'>{children}</header>
}
