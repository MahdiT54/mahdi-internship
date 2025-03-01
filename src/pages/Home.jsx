import React, { useEffect } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        {/* <div data-aos="fade-in"> */}
          <Landing />
        {/* </div> */}
        <div data-aos="fade-in">
          <LandingIntro />
        </div>
        <div data-aos="fade-in">
          <HotCollections />
        </div>
        <div data-aos="fade-in">
          <NewItems />
        </div>
        <div data-aos="fade-in">
          <TopSellers />
        </div>
        {/* <div data-aos="fade-left"> */}
          <BrowseByCategory />
        {/* </div> */}
      </div>
    </div>
  );
};

export default Home;
