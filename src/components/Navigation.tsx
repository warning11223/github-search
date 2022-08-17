import React from 'react';
import {Link} from "react-router-dom";

const Navigation: React.FC = () => {
    return (
        <nav className=' flex justify-between h-15 items-center shadow-md bg-gray-400 text-white text-xl '>
            <h3 className=' font-bold m-4 '> Github search react-redux app</h3>

            <span className=' mr-5 '>
                <Link to='/' className=' mr-2 '>Home</Link>
                <Link to='/favourites'>Favourites</Link>
            </span>
        </nav>
    );
};

export default Navigation;
