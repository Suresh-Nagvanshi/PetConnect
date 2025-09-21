import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  // Smooth navigation function for React Router links
  const smoothNavigate = (path) => {
    // First scroll to top smoothly
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Then navigate after scrolling
    setTimeout(() => {
      navigate(path);
    }, 500);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-black z-50">
      <nav className="flex items-center justify-between w-full px-6 py-3">
        <div className="flex items-center">
          <img
            className="h-10 w-10 rounded-full"
            src="fav_icon.png"
            alt="Logo"
          />
          <Link className="ml-3 text-white italic text-2xl font-bold" to="/">
            PetConnect
          </Link>
        </div>
        <ul className="flex space-x-3 text-sm text-white italic">
          <li>
            <button
              onClick={() => smoothNavigate("/")}
              className="font-bold px-4 py-2 rounded-lg inline-flex items-center origin-center transform will-change-transform transition-transform duration-200 hover:bg-yellow-400 hover:text-black hover:shadow-md hover:scale-110 active:scale-95"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => smoothNavigate("/about")}
              className="font-bold px-4 py-2 rounded-lg inline-flex items-center origin-center transform will-change-transform transition-transform duration-200 hover:bg-yellow-400 hover:text-black hover:shadow-md hover:scale-110 active:scale-95"
            >
              About Us
            </button>
          </li>
          <li>
            <button
              onClick={() => smoothNavigate("/login")}
              className="font-bold px-4 py-2 rounded-lg inline-flex items-center origin-center transform will-change-transform transition-transform duration-200 hover:bg-yellow-400 hover:text-black hover:shadow-md hover:scale-110 active:scale-95"
            >
              Login
            </button>
          </li>
          <li>
            <button
              onClick={() => smoothNavigate("/register")}
              className="font-bold px-4 py-2 rounded-lg inline-flex items-center origin-center transform will-change-transform transition-transform duration-200 hover:bg-yellow-400 hover:text-black hover:shadow-md hover:scale-110 active:scale-95"
            >
              Register
            </button>
          </li>
          <li>
            <button
              onClick={() => smoothNavigate("/petstore")}
              className="font-bold px-4 py-2 rounded-lg inline-flex items-center origin-center transform will-change-transform transition-transform duration-200 hover:bg-yellow-400 hover:text-black hover:shadow-md hover:scale-110 active:scale-95"
            >
              Pet Store
            </button>
          </li>
          <li>
            <button
              onClick={() => smoothNavigate("/contact")}
              className="font-bold px-4 py-2 rounded-lg inline-flex items-center origin-center transform will-change-transform transition-transform duration-200 hover:bg-yellow-400 hover:text-black hover:shadow-md hover:scale-110 active:scale-95"
            >
              Contact Us
            </button>
          </li>
          <li>
            <button
              onClick={() => smoothNavigate("/feedback")}
              className="font-bold px-4 py-2 rounded-lg inline-flex items-center origin-center transform will-change-transform transition-transform duration-200 hover:bg-yellow-400 hover:text-black hover:shadow-md hover:scale-110 active:scale-95"
            >
              Feedback
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
