import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      )
      .then((response) => {
        setSellers(response.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Skeleton circle={true} height={50} width={50} />
                      </div>
                      <div className="author_list_info">
                        <Skeleton width={100} />
                        <Skeleton width={50} />
                      </div>
                    </li>
                  ))
                : sellers.map((item, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-author"
                            src={item.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to="/author">{item.authorName}</Link>
                        <span>{item.price} ETH</span>
                      </div>
                    </li>
                  ))}
              {/* {new Array(12).fill(0).map((_, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-author"
                        src={AuthorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to="/author">Monica Lucas</Link>
                    <span>2.1 ETH</span>
                  </div>
                </li>
              ))} */}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
