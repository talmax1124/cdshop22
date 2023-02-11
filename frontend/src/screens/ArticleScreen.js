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

import { deleteArticle } from "../actions/articleActions";

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

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      dispatch(deleteArticle(id));
      goBackToHomeAfterDelete();
    }
  };

  // Line Below Reloads Page
  function LoadOnce() {
    window.location.reload();
  }

  // This is a function that makes the deletehandler reload the page once on the homescreen
  function goBackToHomeAfterDelete() {
    history.push("/");
    LoadOnce();
    alert("Article Has Been Deleted.");
  }

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <React.Fragment>
      <div className="flex justify-between">
        <Link to="/articles">
          <Button className="text-black bg-slate-50   rounded-lg mb-3 mt-2 no-underline hover:no-underline">
            <i className="fas fa-arrow-left mr-1 text-[1.4em]"></i>
            Go Back
          </Button>
        </Link>

        {userInfo && userInfo.isAdmin && (
          <>
            <div>
              <Link to={`/admin/article/${article._id}/edit`}>
                <Button className="text-black bg-green-100 hover:bg-red-500   rounded-lg mb-3 mt-2 no-underline hover:no-underline mr-2">
                  <i className="fas fa-pencil mr-1 text-[1.4em]"></i>
                  Edit
                </Button>
              </Link>
              <Button
                className="text-black bg-red-100 hover:bg-red-500   rounded-lg mb-3 mt-2 no-underline hover:no-underline"
                onClick={deleteHandler}
              >
                <i className="fas fa-trash mr-1 text-[1.4em]"></i>
                Delete
              </Button>
            </div>
          </>
        )}
      </div>

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
              <h3 className="mt-2">{article.name}</h3>
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
