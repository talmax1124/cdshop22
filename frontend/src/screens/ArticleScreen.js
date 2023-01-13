import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, ListGroup, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import ArticleInformation from "../components/ArticleInformation";
import ArticleContent from "../components/ArticleContent";
// import moment from "moment";

import { listArticleDetails } from "../actions/articleActions";

const ArticleScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const articleDetails = useSelector((state) => state.articleDetails);
  const { loading, error, article } = articleDetails;

  useEffect(() => {
    if (!article._id || article._id !== match.params.id) {
      dispatch(listArticleDetails(match.params.id));
    }
  }, [dispatch, match, article]);

  return (
    <React.Fragment>
      <Link to="/articles">
        <Button className="text-black bg-slate-50   rounded-lg mb-3 mt-2 no-underline hover:no-underline">
          <i className="fas fa-arrow-left mr-1 text-[1.4em]"></i>
          Go Back
        </Button>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={article.name} />
          <Row className="bg-slate-800 p-3 rounded-md article-top">
            <Col md={6}>
              <Image
                src={article.image}
                alt={article.name}
                fluid
                style={{
                  width: "100%",
                  objectFit: "contain",
                }}
              />
            </Col>
            <Col md={5} className="text-white article-styling-top">
              <h3>{article.name}</h3>
              <div>
                <span className="font-medium uppercase">Author:</span>{" "}
                <span className="font-light">{article.author}</span>
              </div>
              <div>
                <span className="font-medium uppercase">Category:</span>{" "}
                <span className="font-light">{article.category}</span>
              </div>
              <h4>Short Description: </h4>
              <ArticleInformation Article={article} />
            </Col>
          </Row>
          <ListGroup
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              border: "none",
              outline: "none",
              justifyContent: "center",
            }}
          >
            <ListGroup.Item style={{ minWidth: "100%", border: "transparent" }}>
              <h3 className="font-bold mb-3 text-[1.4em]">Content</h3>

              <ArticleContent Article={article} />
            </ListGroup.Item>
          </ListGroup>
        </>
      )}
    </React.Fragment>
  );
};

export default ArticleScreen;
