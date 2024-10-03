import { Link } from "react-router-dom"; // Import Link for navigation
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/loginSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.login);
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Admin</div>
      <ul className="navbar-links">
        {loggedIn && (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
