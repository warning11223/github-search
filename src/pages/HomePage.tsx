import React, {useEffect, useState} from 'react';
import {useLazySearchRepositoryQuery, useSearchUsersQuery} from "../store/github/github.api";
import {useDebounce} from "../hooks/debounce";
import RepositoryCard from "../components/RepositoryCard";

const HomePage = () => {
    const [inputValue, setInputValue] = useState('');
    const [debouncedVisible, setDebouncedVisible] = useState(false);

    const debounced = useDebounce(inputValue, 1000);

    const { isError, isLoading, data } = useSearchUsersQuery(debounced, {
        skip: debounced.length < 2,
    }); // github login

    const [fetchRepository, { isLoading: isReposLoading, isError: isReposError, data: dataRepos }] = useLazySearchRepositoryQuery();

    useEffect(() => {
        if(debounced?.length > 0) {
            setDebouncedVisible(true);
        }
    }, [debounced])

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const itemListHandler = (user: string) => {
        fetchRepository(user);
        setDebouncedVisible(false);
    }

    return (
        <>
            {isError && <p className=' text-center text-red-600 mt-12 '>Something gone wrong...</p>}

            <div className=' flex justify-center pt-10 mx-auto h-screen w-screen '>
                <div className=' relative w-2/4 '>
                    <input
                        type="text"
                        className=' border py-2 px-4 w-full h-[42px] mb-2 outline-none '
                        placeholder='Search for github login'
                        value={inputValue}
                        onChange={inputHandler}
                    />
                    <ul className=' absolute t-[42px] left-0 right-0 max-h-96 shadow-lg bg-white overflow-y-scroll  '>
                        {isLoading && <div className='text-center text-green-600 overscroll-y-none'><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>}
                        {debouncedVisible && data?.map(item => (
                            <li
                                key={item.id}
                                className=' py-2 px-4 hover:bg-blue-300 hover:text-white transition-all cursor-pointer '
                                onClick={() => itemListHandler(item.login)}
                            >{item.login}</li>
                        ))}
                    </ul>

                    <div className="container overflow-y-scroll " style={{maxHeight: '80%'}}>
                        {isReposLoading && <div className='text-center text-green-600 overscroll-y-none'><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>}
                        {isReposError && <p className=' text-center text-red-600 '>Repository error</p>}
                        {dataRepos?.map(item => {
                            return <RepositoryCard item={item} key={item.id}/>
                        })}
                    </div>
                </div>
            </div>

        </>

    );
};

export default HomePage;
