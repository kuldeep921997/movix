import React, { useEffect, useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'
import "../trending/style.scss"

const TopRated = () => {

    const [endPoint, setEndPoint] = useState("movie")

    const { data, loading } = useFetch(`/${endPoint}/top_rated`)

    const onTabChange = (tab, index) => {
        setEndPoint(tab == "Movies" ? "movie" : "tv")
    }

    useEffect(() => {
        console.log("data = ", data)
    }, [data])

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Top Rated</span>
                <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
            </ContentWrapper>

            <Carousel data={data?.results} loading={loading} media_type={endPoint} />
        </div>
    )
}

export default TopRated