import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between border-r-2 border-zinc-400">
        <img src={assets.logo} alt="Subasi Admin" className="w-[max(10%,80px)]" />
        {/* <div>
          <div className="text-lg font-semibold text-slate-900">Subasi Admin</div>
          <div className="text-xs text-slate-500">Dashboard</div>
        </div> */}  

      {/* <ul className="hidden sm:flex gap-6 text-sm text-slate-700">
        <li>
          <Link to="/add" className="hover:text-slate-900 transition">Add Product</Link>
        </li>
        <li>
          <Link to="/list" className="hover:text-slate-900 transition">Product List</Link>
        </li>
        <li>
          <Link to="/orders" className="hover:text-slate-900 transition">Orders</Link>
        </li>
      </ul> */}

      <button onClick={()=>setToken('')}  className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2  text-xs sm:text-sm rounded-full  font-medium transition hover:bg-gray-500">
        Logout
      </button>
    </div>
  )
}

export default Navbar