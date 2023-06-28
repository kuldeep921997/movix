import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating"
import SkeletonItem from "../skeletonItem/SkeletonItem";

import "./style.scss";
import Genres from "../genres/Genres";
const Carousel = ({ data, loading, media_type, title }) => {

    const carouselContainer = useRef()
    const { url } = useSelector((state) => state.home)
    const navigate = useNavigate()



    const navigation = (dir) => {
        const container = carouselContainer.current;
        const scrollAmount = (dir === "left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20));

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        })
    }

    return (
        <div className="carousel">
            <ContentWrapper>
                {title && <div className="carouselTitle" >{title}</div>}

                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />


                <BsFillArrowRightCircleFill
                    className="carouselRightNav arrow"
                    onClick={() => navigation("right")}
                />

                {!loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.map((item) => {
                            const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback
                            return (
                                <div
                                    key={item.id}
                                    className="carouselItem"
                                    onClick={() => navigate(`/${item.media_type ? item.media_type : media_type}/${item.id}`)}
                                >
                                    <div className="posterBlock">
                                        <Img src={posterUrl} />
                                        <CircleRating
                                            rating={item.vote_average.toFixed(1)}
                                        />

                                        <Genres data={item.genre_ids.slice(0, 2)} />
                                    </div>

                                    <div className="textBlock">
                                        <span className="title">
                                            {item.title || item.name}
                                        </span>

                                        <span className="date">

                                            {dayjs(item.release_Date).format("MMM DD, YYYY")}

                                        </span>



                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <span className="loadingSkeleton">
                        <SkeletonItem />
                        <SkeletonItem />
                        <SkeletonItem />
                        <SkeletonItem />
                        <SkeletonItem />
                    </span>
                )}

            </ContentWrapper>
        </div >
    )
}

export default Carousel