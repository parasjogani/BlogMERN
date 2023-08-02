import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';


const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const getUserFromLocalStorage = localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user")) : null
        if (getUserFromLocalStorage) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        dispatch(logout())
        localStorage.removeItem("user")
        setIsLoggedIn(false);
        navigate('/login')
    };

    return (
        <header>
            <nav className='bg-[#282828] h-[74vh] md:h-[18vh] flex items-center justify-center'>
                <ul className='flex flex-col md:flex-row md:gap-40 gap-5 w-[50%] md:w-full justify-center'>
                    <li className='bg-black px-8 py-3 rounded-md'>
                        <Link to="/">Home</Link>
                    </li>
                    {isLoggedIn ? (
                        <>
                            <li className='bg-black px-8 py-3 rounded-md'>
                                <Link to="/addBlog">Add Blog</Link>
                            </li>
                            <li className='bg-black px-8 py-3 rounded-md'>
                                <Link to="/myblogs">My Blog</Link>
                            </li>
                            <li className='bg-black px-8 py-3 rounded-md'>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <li className='bg-black px-8 py-3 rounded-md'>
                            <Link to="/login">Login/Register</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
