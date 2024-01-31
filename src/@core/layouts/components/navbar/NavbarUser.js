// ** Dropdowns Imports
import UserDropdown from "./UserDropdown"
import IntlDropdown from "./IntlDropdown"

const NavbarUser = () => {
  return (
    <ul className="nav navbar-nav align-items-center ms-auto">
    <IntlDropdown />
      <UserDropdown />
    </ul>
  )
}
export default NavbarUser
