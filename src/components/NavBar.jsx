
import Link from 'next/link';
import React from 'react'

function NavBar() {
  return (
    <nav className="bg-zinc-900 text-white py-3 mb-2 ">
      <div className="container mx-auto flex justify-between items-center p-3 mt-3">
        <Link href="/products">
          
          <h3 className="text-3xl ">Mister Market</h3>
        </Link>

        <ul>
          <Link
            href="/new"
            className="bg-sky-500 hover:bg-sky-400 p-4 rounded cursor-pointer"
          >
            Create Product's
          </Link>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar