import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import ArticleInformation from "../components/ArticleInformation";
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
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={article.name} />
          <Row>
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
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3 className="font-medium font-sans text-[1.3em]">
                    {article.name}
                  </h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <span className="font-medium uppercase">Author:</span>{" "}
                  <span className="font-light">{article.author}</span>
                </ListGroup.Item>

                <ListGroup.Item>
                  <span className="font-medium uppercase">Category:</span>{" "}
                  <span className="font-light">{article.category}</span>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <ListGroup
            style={{
              marginTop: "10px",
              marginBottom: "10px",

              justifyContent: "center",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <ListGroup.Item style={{ minWidth: "100%" }}>
              <Row
                style={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                <h3 className="font-medium mb-3 text-[1.15em]">Description</h3>
              </Row>
              <Row
                style={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                <Col md={6}>
                  <ArticleInformation Article={article} />
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </>
      )}
    </React.Fragment>
  );
};

export default ArticleScreen;
