import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white text-gray-800 py-2 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4">


        {/* Left: Logo or Brand */}
        <div className="flex items-center space-x-2">
        {/* <div className="flex flex-col items-center justify-center"> */}
        <img src="/tree.jpg" className="" style={{ width: '50px' }} />
            {/* <a href="http://www.freepik.com">Designed by Freepik</a> */}
          <Link href="/" className="text-lg font-bold">
            Trash
          </Link>
        </div>

        {/* Right: Navigation Links */}
        <nav className="ml-auto">
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-indigo-300 text-sm">Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-indigo-300 text-sm">About</Link>
            </li>
            <li>
              <Link href="/signin" className="hover:text-indigo-300 text-sm">Sign In</Link>
            </li>
            <li>
              <Link href="/signup" className="hover:text-indigo-300 text-sm">Sign Up</Link>
            </li>
          </ul>
        </nav>

        {/* Optional: User Profile or Auth Buttons */}
        <div>
          {/* Example: Log Out Button (only visible when logged in) */}
          {/* <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
            Log Out
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
