import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const ItemDetails = () => {
  const [item, setItem] = useState([]);
  const { itemId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${itemId}`
      )
      .then((response) => {
        setItem(response.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [itemId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {loading ? (
                <>
                  <div className="col-md-6 text-center">
                    <Skeleton height={500} width={600} />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>
                        <Skeleton width={200} />
                      </h2>
                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <Skeleton width={50} />
                        </div>
                        <div className="item_info_like">
                          <Skeleton width={50} />
                        </div>
                      </div>
                      <p>
                        <Skeleton count={3} />
                      </p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>
                            <Skeleton width={50} />
                          </h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Skeleton circle={true} height={50} width={50} />
                              <i className="fa fa-check"></i>
                            </div>
                            <div className="author_list_info">
                              <Skeleton width={100} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>
                            <Skeleton width={50} />
                          </h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Skeleton circle={true} height={50} width={50} />
                              <i className="fa fa-check"></i>
                            </div>
                            <div className="author_list_info">
                              <Skeleton width={100} />
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>
                          <Skeleton width={50} />
                        </h6>
                        <div className="nft-item-price">
                          <Skeleton width={100} />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-6 text-center">
                    <img
                      src={item.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>{item.title} #{item.tag}</h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {item.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {item.likes}
                        </div>
                      </div>
                      <p>
                        doloremque laudantium, totam rem aperiam, eaque ipsa
                        quae ab illo inventore veritatis et quasi architecto
                        beatae vitae dicta sunt explicabo.
                      </p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${item.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={item.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${item.ownerId}`}>
                                {item.ownerName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${item.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={item.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${item.creatorId}`}>
                                {item.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{item.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
