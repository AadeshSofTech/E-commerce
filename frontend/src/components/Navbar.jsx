import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {

    const [visible, setVisible] = useState(false);
    const { setShowSearch, getCartCount } = useContext(ShopContext);

    return (
        <div className='flex justify-between items-center py-5 font-medium  '>
            <Link to='/'>
                <img src={assets.logo} className='w-36' alt="" />
            </Link>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink className='flex flex-col items-center gap-1 ' to='/'>
                    <p>Home</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

                <NavLink className='flex flex-col items-center gap-1 ' to='/collection'>
                    <p>Collection</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

                <NavLink className='flex flex-col items-center gap-1 ' to='/about'>
                    <p>About</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

                <NavLink className='flex flex-col items-center gap-1 ' to='/content'>
                    <p>Content</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

            </ul>

            <div className='flex gap-6 items-center'>
                <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />

                <div className='group relative'>
                    <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>

                        <div className='flex flex-col gap-2 p-4 w-36 bg-slate-100 text-gray-500 rounded'>
                            <p className='cursor-pointer hover:text-black'>My Profile</p>
                            <p className='cursor-pointer hover:text-black'>My Orders</p>
                            <p className='cursor-pointer hover:text-black'>Logout</p>
                        </div>
                    </div>
                </div>
                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5 cursor-pointer' alt="" />
                    <p className='absolute right-[-5px] bottom-[-5px] text-center leading-4  bg-black aspect-square text-white rounded-full w-4 text-[8px]'>{getCartCount()}</p>
                </Link>

                <img src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" onClick={() => setVisible(true)} />
            </div>

            {/* sidebar  menu for small screen */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>

                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex gap-4 p-3 items-center cursor-pointer'>
                        <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
                        <p>Back</p>
                    </div>

                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>
                        Home
                    </NavLink>

                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>
                        Collection
                    </NavLink>

                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>
                        About
                    </NavLink>

                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/content'>
                        Content
                    </NavLink>

                </div>
            </div>

        </div>
    )
}

export default Navbar
