import Link from 'next/link';

export default function About() {
  return (
    <>
      <header className="bg-white text-gray-800 py-2 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
          {/* Left: Logo or Brand */}
          <div className="flex items-center space-x-2">
            <img src="/tree.jpg" alt="Life Review Logo" className="w-12 h-12" />
            <Link href="/" className="text-lg font-bold">
              Legacy
            </Link>
          </div>

          {/* Right: Navigation Links */}
          <nav className="ml-auto">
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="hover:text-indigo-300 text-sm">Home</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* About Section */}
      <div className="flex min-h-screen">
        {/* Left: Image */}
        <div
          className="w-1/2 h-screen bg-cover bg-center"
          style={{ backgroundImage: "url('/home_tree.jpg')" }} // Ensure image path is correct
        ></div>

        {/* Right: Text */}
        <div className="flex-1 bg-gray-100 text-gray-800 px-6 pt-37 py-12 flex flex-col justify-start">
          {/* Main Heading */}
          <h1 className="text-8xl lg:text-9xl font-bold leading-tight text-gray-900 mt-4">
            Life Review Is An Ai-Backed 
          </h1>

          <h1 style={{paddingLeft:'140px', paddingBottom:'59px'}} 
          className="text-8xl lg:text-9xl pl-20 font-bold leading-tight text-gray-900 mt-4">
          Platform 
          </h1>
          {/* Subheading */}
          <h2 className="mt-4 text-3xl lg:text-4xl font-semibold text-gray-700">
            Helping You Navigate Life's Journey
          </h2>

          <p className="mt-6 text-lg text-gray-600 max-w-2xl">
            At Life Review, we believe in the beauty of life, no matter the struggles you may face. With the right guidance, you can find meaning and purpose in every stage of your journey.
          </p>
        </div>
      </div>
    </>
  );
}
