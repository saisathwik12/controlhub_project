import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import Tasks from './Pages/Tasks'
import Users from './Pages/Users'
import Trash from './Pages/Trash'
import TaskDetails from './Pages/TaskDetails'
import { useDispatch, useSelector } from 'react-redux'
import SideBar from './components/SideBar'
import Navbar from './components/Navbar'
import { Fragment, useRef } from 'react'
import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import { IoClose } from 'react-icons/io5'
import Sidebar from './components/SideBar'
import { setOpenSidebar } from './redux/Slices/authSlice'
import { LandingPage } from './Pages/LandingPage'
import { StatusPage } from './Pages'
import Register from './Pages/Registraion'
// import Register from './Pages/Registraion'

function Layout() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  return user ? (
    <div className='w-full h-screen flex flex-col md:flex-row '>
      <div className='w-1/5 h-screenbg-white sticky top-e hidden md:block'>
        <SideBar/>
      </div>
      <MobileSidebar/>

      <div className='flex-1 overflow-y-auto'>
        <Navbar/>
        <div className="p-4 2x1:px-10 bg-[#F7F7F7] dark:bg-[#00246B]">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to='/home' state={{ from: location }} replace />
  );
}

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <>
      <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter='transition-opacity duration-700'
        enterFrom='opacity-x-10'
        enterTo='opacity-x-100'
        leave='transition-opacity duration-700'
        leaveFrom='opacity-x-100'
        leaveTo='opacity-x-0'
      >
        {(ref) => (
          <div
            ref={(node) => (mobileMenuRef.current = node)}
            className={clsx(
              "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform ",
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            )}
            onClick={() => closeSidebar()}
          >
            <div className='bg-white w-3/4 h-full'>
              <div className='w-full flex justify-end px-5 mt-5'>
                <button
                  onClick={() => closeSidebar()}
                  className='flex justify-end items-end'
                >
                  <IoClose size={25} />
                </button>
              </div>

              <div className='-mt-10'>
                <Sidebar />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};

function App() {

  return (
    <main className='w-full min-h-screen'>
      <Routes>
        <Route element={<Layout />}>
          <Route index path='/' element={<Navigate to='/home' />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/completed/:status' element={<Tasks />} />
          <Route path='/in-progress/:status' element={<Tasks />} />
          <Route path='/todo/:status' element={<Tasks />} />
          <Route path='/team' element={<Users />} />
          <Route path='/trashed' element={<Trash />} />
          <Route path='/task/:id' element={<TaskDetails />} />
          <Route path='/status' element={<StatusPage />} />
        </Route>
        <Route path='/log-in' element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/home' element={<LandingPage />} />
      </Routes>

      <Toaster richColors />
    </main>
  )
}

export default App
