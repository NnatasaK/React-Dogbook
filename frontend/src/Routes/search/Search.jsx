import React from 'react';
import { useState, useEffect } from 'react';
import { BsSearch } from "react-icons/bs";
import { BsXCircleFill } from "react-icons/bs";
import './SearchField.css'
import { Link } from 'react-router-dom';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

function Search() {

    const [query, setQuery] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [select, setSelect] = useState(-1);
    const [isSearchActive, setIsSearchActive] = useState(false);



    const handleChange = e => {
        const value = e.target.value;
        setQuery(value);
        if (value === "") {
            setSearchData([]);
            setSelect(-1); // Reset selection index
        }
        setIsSearchActive(value.trim() !== "");
    };

    const handleClose = () => {
        setQuery("");
        setSearchData([]);
        setSelect(-1);
        setIsSearchActive(false);
    }
    // Function that enables search with arrow keys 
    const handleKeyDown = e => {
        if (searchData.length > 0) { // Check if there are search results
            if (select < searchData.length) {
                if (e.key === "ArrowUp" && select > 0) {
                    setSelect(prev => prev - 1)
                }
                else if (e.key === "ArrowDown" && select < searchData.length - 1) {
                    setSelect(prev => prev + 1)
                }
                else if (e.key === "Enter" && select >= 0) {
                    window.open(searchData[select].url)
                }
            } else {
                setSelect(-1)
            }
        }
    };


    useEffect(() => {

        if (query !== "") {
            fetch(`${apiBaseUrl}/search?q=${query}`)
                .then(res => res.json())
                .then(data => setSearchData(data))
                .catch(error => console.error('Error fetching data:', error));
        }

    }, [query]) //useEffect will run whenever we change 'query' value


    return (
        <section className="container-right">
            <div className="search-container">
                <div className="search-input-container">

                    <div className='search-icon'>
                        <BsSearch />
                    </div>

                    <input
                        className='search-input'
                        type="text"
                        placeholder='Search'
                        value={query}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}

                    />
                    {/* <button onClick={handleSearch}>Search</button> */}
                    {query && (
                        <div >
                            <BsXCircleFill onClick={handleClose} className="close-button" />
                        </div>
                    )}

                    <div className='search-results'>
                        {isSearchActive && (
                            searchData.length > 0 ? (
                                searchData.map((user, index) => (
                                    <Link
                                        to={`/profile/${user._id}`}
                                        key={index}
                                        className={select === index ? 'suggestion-line active' : 'suggestion-line'}
                                    >
                                        @{user.nickname}
                                    </Link>
                                ))
                            ) : (
                                <p>Try searching for dog profiles</p>
                            )
                        )}
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Search;
