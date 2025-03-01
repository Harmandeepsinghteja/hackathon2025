import Link from 'next/link';
export default function Header(){
    return(
        <header className="bg-white text-gray-800 py-2 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
  
  
          {/* Left: Logo or Brand */}
          <div className="flex items-center space-x-2">
          {/* <div className="flex flex-col items-center justify-center"> */}
          <img src="/tree.jpg" className="" style={{ width: '50px' }} />
              {/* <a href="http://www.freepik.com">Designed by Freepik</a> */}
            <Link href="/" className="text-lg font-bold">
              Life Review
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
                <Link href="/signin" className="hover:text-indigo-300 text-sm">My Account</Link>
              </li>
              
            </ul>
          </nav>
  
        </div>
      </header>
    )
}