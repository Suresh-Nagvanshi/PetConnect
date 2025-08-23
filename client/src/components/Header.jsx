

function Header() {
    return (
        <header className="fixed top-0 left-0 w-full bg-black z-50">
            <nav className="flex items-center justify-between w-full px-6 py-3">
                <div className="flex items-center">
                    <img className="h-10 w-10 rounded-full" src="fav_icon.png" alt="Logo" />
                    <a className="ml-3 text-white italic text-2xl font-bold" href="#">PetConnect</a>
                </div>
                <ul className="flex space-x-6 text-sm text-white italic">
                    <li><a className="hover:underline font-bold" href="#">Home</a></li>
                    <li><a className="hover:underline font-bold" href="#">About Us</a></li>
                    <li><a className="hover:underline font-bold" href="#">Register</a></li>
                    <li><a className="hover:underline font-bold" href="#">Login</a></li>
                    <li><a className="hover:underline font-bold" href="#">Pet Store</a></li>
                    <li><a className="hover:underline font-bold" href="#">Contact Us</a></li>
                    <li><a className="hover:underline font-bold" href="#">Feedback</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
