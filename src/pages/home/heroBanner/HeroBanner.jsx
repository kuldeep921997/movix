import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./style.scss"

import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';

import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const HeroBanner = () => {

    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const { data, loading } = useFetch("/movie/upcoming")
    const { url } = useSelector((state) => state.home)

    useEffect(() => {
        const bg = url?.backdrop + data?.results[Math.floor(Math.random() * 20)]?.backdrop_path

        setBackground(bg)
    }, [data])


    const searchQueryHandler = (e) => {
        if (e.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }

    return (
        <div className='heroBanner'>
            {!loading && <div className="backdrop-img">
                <Img src={background} />
            </div>}


            <div className="opacity-layer"></div>


            <ContentWrapper>
                <div className="heroBannerContent">
                    <div className="title">Welcome.</div>
                    <div className="subTitle">Millions of movies, TV Shows and people to discover. Explore now.</div>

                    <div className="searchInput">
                        <input
                            className="searchInputBox"
                            type="text"
                            placeholder="Search for movies or TV shows...."
                            onChange={(e) => { setQuery(e.target.value) }}
                            onKeyUp={searchQueryHandler}
                        />
                        <button className='searchButton'>
                            Search
                        </button>
                    </div>
                </div>
            </ContentWrapper >
        </div>

    )
}

export default HeroBanner