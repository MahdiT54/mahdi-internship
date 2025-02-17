import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const ExploreItems = () => {
  const [visibleItems, setVisibleItems] = useState(8);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [filter, setFilter] = useState("");

  const loadMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds) => {
    if (totalSeconds <= 0) {
      return "EXPIRED";
    }
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedHours = String(hours).padStart(1, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedHours}h ${formattedMinutes}m ${formattedSeconds}s`;
  };

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
      .then((response) => {
        setItems(response.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const fetchItems = (filter) => {
    const url = `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`;
    axios
      .get(url)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchItems(filter);
  }, [filter]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading
        ? new Array(8).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton circle={true} height={50} width={50} />
                </div>
                <div className="nft__item_wrap">
                  <Skeleton height={200} />
                </div>
                <div className="nft__item_info">
                  <Skeleton width={150} />
                  <Skeleton width={100} />
                </div>
              </div>
            </div>
          ))
        : items.slice(0, visibleItems).map((item, index) => {
            const expiryTime = item.expiryDate
              ? new Date(item.expiryDate)
              : null;
            let timeLeftInSeconds = expiryTime
              ? Math.floor((expiryTime - currentTime) / 1000)
              : null;
            if (timeLeftInSeconds < 0) timeLeftInSeconds = 0;
            return (
              <div
                key={index}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block", backgroundSize: "cover" }}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link
                      to="/author"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                    >
                      <img className="lazy" src={item.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  {timeLeftInSeconds !== null && (
                    <div className="de_countdown">
                      {formatTime(timeLeftInSeconds)}
                    </div>
                  )}

                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <Link to="/item-details">
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to="/item-details">
                      <h4>{item.title}</h4>
                    </Link>
                    <div className="nft__item_price">{item.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      {visibleItems < items.length && (
        <div className="text-center">
          <Link
            to="#"
            id="loadmore"
            className="btn-main lead"
            onClick={loadMoreItems}
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
