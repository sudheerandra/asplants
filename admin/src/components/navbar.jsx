import React from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {
  const {setToken} = props;
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken('');
    navigate('/login')

  }
  return (
    <div className='flex justify-between items-center py-2 px-[4%]'>
        <img className='w-[max(10%,80px)] rounded-full object-cover' src={assets.logo} alt="" />
        <button onClick={handleLogout} className='px-5 py-2 sm:px-7 sm:py-2 rounded-full bg-gray-500 hover:bg-orange-500 text-white text-xs sm:text-sm'>logout</button>
    </div>
  )
}

export default Navbar;