import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import PaginateArticle from "../components/PaginateArticle";
import {
  listArticles,
  deleteArticle,
  createArticle,
} from "../actions/articleActions";
import { ARTICLE_CREATE_RESET } from "../constants/articleConstants";
import { LinkContainer } from "react-router-bootstrap";

const ArticleListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const articleList = useSelector((state) => state.articleList);
  const { loading, error,
     articles, 
     page, pages } = articleList;

  const articleDelete = useSelector((state) => state.articleDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = articleDelete;

  const articleCreate = useSelector((state) => state.articleCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    article: createdArticle,
  } = articleCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: ARTICLE_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/article/${createdArticle._id}/edit`);
    } else {
      dispatch(listArticles("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdArticle,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteArticle(id));
    }
  };

  const createArticleHandler = () => {
    dispatch(createArticle());
  };

  return (
    <>
      <Row className="align-items-center flex justify-between article-list-screen-row">
        <h1 className="font-medium my-3 text-[1.9em] sm:text-[2em] md:text-2xl lg:text-3xl xl:text-4xl">
          Articles
        </h1>
        <Button
          className="bg-black hover:bg-slate-700 my-3"
          onClick={createArticleHandler}
        >
          <i className="fas fa-plus"></i> Create Article
        </Button>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>CATEGORY</th>
                <th>Author</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article._id}>
                  <LinkContainer to={`/article/${article._id}`}>
                    <td className="hover:underline hover:cursor-pointer">
                      {article._id}
                    </td>
                  </LinkContainer>
                  <td>{article.name}</td>
                  <td>{article.category}</td>
                  <td>{article.author}</td>
                  <td>
                    <Link to={`/admin/article/${article._id}/edit`}>
                      <Button className="btn-sm bg-black text-white hover:bg-gray-700">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      className="btn-sm bg-red-400"
                      onClick={() => deleteHandler(article._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <PaginateArticle pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ArticleListScreen;
