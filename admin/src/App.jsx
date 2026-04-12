import React, { useEffect,useState }  from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Sidebar from './components/Sidebar'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const backendUrl=import.meta.env.VITE_BACKEND_URL
export const currency='$'
const App = () => {

  const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

  useEffect(()=>{
   localStorage.setItem('token',token )
  },[token])

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer/>
      {token === ""
      ?<Login setToken={setToken}/>:
     <>
      <Navbar  setToken={setToken}/>
      <hr />
      <div className='flex w-full'>
        <Sidebar/>
        <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
         <Routes>
          <Route path="/" element={'/'} />
          <Route path="/add" element={<Add token={token}/>} />
          <Route path="/list" element={<List token={token}/>} />
          <Route path="/orders" element={<Orders token={token}/>} />
        </Routes>
        </div>
      </div>
      </>}
      {/* <main className="pt-32 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pb-10">
        <div className="mb-8 rounded-4xl bg-linear-to-r from-pink-100 via-violet-100 to-sky-100 border border-slate-200 p-8 shadow-2xl">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Forever Admin</p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-900">Welcome to the admin dashboard</h1>
            <p className="mt-4 max-w-2xl text-slate-600">Manage products, view orders, and update stock from a clean, modern admin experience.</p>
          </div>
        </div>
 <div className="rounded-4xl bg-white border border-slate-200 p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Select a page from the navbar</h2>
              <p className="mt-2 text-slate-600">Use the links above to add products, view the product list, or manage orders.</p>
            </div>
        
      </main>  */}
     
    </div>
  )
}

export default App