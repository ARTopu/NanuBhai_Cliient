import Link from 'next/link';
import { Menu, User, Search } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <button
                className="p-2 rounded-md hover:bg-gray-100"
                aria-label="Open menu"
              >
                <Menu className="h-7 w-7 text-gray-800" strokeWidth={2} />
              </button>
              <Link href="/" className="ml-4 text-2xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text"></span>
                <span className="text-gray-800">NanuBhai</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <span className="hidden md:block font-medium text-gray-800">Hi, User</span>
              <button
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="User menu"
              >
                <User className="h-7 w-7 text-gray-800" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="relative flex items-center">
            <input
              type="search"
              placeholder="Search For Products"
              className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-800"
            />
            <Search className="absolute left-3 h-5 w-5 text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;