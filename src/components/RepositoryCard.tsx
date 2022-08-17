import React, {useState} from 'react';
import {IRepository} from "../models/models";
import {addToFavourites, githubSelector, removeFromFavourites} from "../store/github/github.slice";
import {useDispatch, useSelector} from "react-redux";

type RepositoryCardType = {
    item: IRepository
}

const RepositoryCard: React.FC<RepositoryCardType> = ({item}) => {
    const { favourites } = useSelector(githubSelector);
    const dispatch = useDispatch();
    const [items, setItems] = useState(favourites.includes(item.html_url));

    const addToFav = (e: React.MouseEvent<HTMLButtonElement>, url: string) => {
        e.preventDefault();
        setItems(true);
        dispatch(addToFavourites(url));
    }

    const removeFromFav = (e: React.MouseEvent<HTMLButtonElement>, url: string) => {
        e.preventDefault();
        setItems(false);
        dispatch(removeFromFavourites(url));
    }

    return (
        <div className=' border rounded py-3 px-5 mb-2 hover:shadow-md hover:bg-blue-200 transition-all  '>
            <a href={item.html_url} target='_blank'>
                <h2 className=' text-gray-700 font-bold '>{item.full_name}</h2>

                <p className='  '>
                    Size: {item.size} <br/>
                    Forks: {item.forks} <br/>
                    Language: {item.language}
                </p>
                {item.description && <p className=' text-sm '>Description: {item?.description}</p>}
            </a>

            {!items && <button
                className=' border rounded py-3 px-5 mt-3 mb-1 bg-green-400 hover:bg-green-500 hover:text-white transition-all '
                onClick={(e) => addToFav(e, item.html_url)}
            >Add</button>}

            {items && <button
                className=' border rounded py-3 px-5 mt-3 mb-1 bg-red-400 hover:bg-red-500 hover:text-white transition-all '
                onClick={(e) => removeFromFav(e, item.html_url)}
            >Remove</button>}
        </div>
    );
};

export default RepositoryCard;
