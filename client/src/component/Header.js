import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav className='bg-[#282828] h-[16vh] md:h-[18vh] flex items-center justify-center'>
                <ul className='flex md:gap-40 gap-5'>
                    <li className='bg-black px-8 py-3 rounded-md'>
                        <Link to="/">Home</Link>
                    </li>
                    <li className='bg-black px-8 py-3 rounded-md'>
                        <Link to="/addBlog">Add Blog</Link>
                    </li>
                    <li className='bg-black px-8 py-3 rounded-md'>
                        <Link to="/login">Login/Register</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
