import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  let curr_y = 0;

  useEffect(() => {
    // setLastScrollY(0)
    window.scrollTo(0, 0)
  }, [location]);


  const controlNavbar = () => {
    curr_y = window.scrollY
    if (curr_y > 180) {
      if (curr_y > lastScrollY && (!showSearch && !mobileMenu))
        setShow("hide")
      else
        setShow("show")
    }
    else
      setShow("top")

    setLastScrollY(curr_y)
  }

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar)
    return () => {
      window.removeEventListener("scroll", controlNavbar)
    }
  }, [lastScrollY])

  const openSearch = () => {

    setMobileMenu(false)
    setShowSearch(true)
  }

  const openMobileMenu = () => {
    setMobileMenu(true)
    setShowSearch(false)

  }

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`)

      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  }

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie")
    }
    else {
      navigate("/explore/tv")
    }

    setShowSearch(false)
  }

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="logo" onClick={() => navigate("/")}/>
        </div>

        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movie")}>Movies</li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>TV Shows</li>
          <li className="menuItem">
            <HiOutlineSearch onClick={() => setShowSearch(true)} />
          </li>
        </ul>


        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? <VscChromeClose onClick={() => setMobileMenu(false)} style={{ cursor: "pointer" }} /> : <SlMenu onClick={openMobileMenu} style={{ cursor: "pointer" }} />}
        </div>

      </ContentWrapper>

      {showSearch && <div className="searchBar">
        <ContentWrapper>
          <div className="searchInput">
            <input
              className="searchInputBox"
              type="text"
              placeholder="Search for movies or TV shows...."
              onChange={(e) => { setQuery(e.target.value) }}
              onKeyUp={searchQueryHandler}
            />
            <VscChromeClose onClick={() => { setShowSearch(false) }} />
          </div>
        </ContentWrapper>
      </div>}
    </header>
  );
};

export default Header;