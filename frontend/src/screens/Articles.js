import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "react-bootstrap";
import Article from "../components/Article";
import Message from "../components/Message";
import Loader from "../components/Loader";
import PaginateArticle from "../components/PaginateArticle";
import Meta from "../components/Meta";
import { listArticles } from "../actions/articleActions";
// import LatestProducts from "../components/LatestProducts";
// import ShopByCategory from "../components/ShopByCategory";
// import ShopByBrand from "../components/ShopByBrand";
// import Sort from "../components/Sort";
import { Container } from "react-bootstrap";

const Articles = ({ match, history, location }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const articleList = useSelector((state) => state.articleList);
  const { loading, error, articles, page, pages } = articleList;

  useEffect(() => {
    dispatch(listArticles(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <>
      <Meta />
      {/* <ShopByCategory /> */}
      <span id="prod"></span>
      <main className="py-3">
        <Container>
          {/* <ShopByCategory products={products} /> */}
          <h1 className="text-[2em] font-bold font-sans mt-4 mb-4">Articles</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {articles.map((article) => (
                <Row key={article._id} className="items-center justify-center">
                  <Article article={article} className="self-stretch mb-3" />
                </Row>
              ))}
              <PaginateArticle
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ""}
              />
            </>
          )}
        </Container>
      </main>
    </>
  );
};

export default Articles;
