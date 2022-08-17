import React from 'react';
import {useSelector} from "react-redux";
import {githubSelector} from "../store/github/github.slice";

const FavouritesPage: React.FC = () => {
    const { favourites } = useSelector(githubSelector);

    if(favourites.length === 0) {
        return <p className=' text-center text-green-600 h-screen w-screen mt-10 text-2xl '>No favourites repositories  😔</p>
    }

    return (
        <div className=' flex justify-center pt-10 mx-auto h-screen w-screen '>
            <ul className=' list-decimal mt-10 '>
                {favourites.map((item, index) => {
                    return (
                        <li
                            key={index}
                            className=' cursor-pointer text-white hover:text-green-700 transition-all text-2xl mb-1 '
                        >
                            <a target='_blank' href={item} >{item}</a>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default FavouritesPage;
