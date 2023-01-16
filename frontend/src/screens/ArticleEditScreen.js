import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listArticleDetails, updateArticle } from "../actions/articleActions";
import { ARTICLE_UPDATE_RESET } from "../constants/articleConstants";
import JoditEditor from "jodit-react";

const ArticleEditScreen = ({ match, history }) => {
  const articleId = match.params.id;

  const editor = useRef(null);
  const config = {
    readonly: false,
    placeholder: "Write product description...",
    askBeforePasteHTML: false,
  };

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const articleDetails = useSelector((state) => state.articleDetails);
  const { loading, error, article } = articleDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const articleUpdate = useSelector((state) => state.articleUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = articleUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ARTICLE_UPDATE_RESET });
      history.push("/admin/articlelist");
    } else {
      if (!article.name || article._id !== articleId) {
        dispatch(listArticleDetails(articleId));
      } else {
        setName(article.name);
        setImage(article.image);
        setAuthor(article.author);
        setCategory(article.category);
        setDescription(article.description);
        setContent(article.content);
      }
    }
  }, [dispatch, history, articleId, article, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    const token = userInfo && userInfo.token;

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateArticle({
        _id: articleId,
        name,
        image,
        author,
        category,
        description,
        content,
      })
    );
  };

  return (
    <>
      <Link to="/admin/articlelist" className="btn btn-dark my-3">
        Go Back
      </Link>

      <div className="flex product-edit-container">
        <div className="product-preview bg-slate-100">
          <h1 className="text-3xl font-medium mb-3 mt-3 p-2">Preview</h1>

          <Image src={image} width="100%" className="p-2" fluid />
          <div className="Product-Card-Body">
            <p className="font-bold text-[1.7em] font-sans uppercase mb-[.5em] text-black">
              Title: {name}
            </p>
          </div>
        </div>
        <div className="product-info">
          <FormContainer>
            <h1 className="font-medium mb-2 text-2xl">Edit Article</h1>

            {/* Product Preview */}

            {/*  */}

            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="image">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter image url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  ></Form.Control>
                  <Form.File
                    label="Choose File"
                    custom
                    onChange={uploadFileHandler}
                  ></Form.File>
                  {uploading && <Loader />}
                </Form.Group>

                <Form.Group controlId="author">
                  <Form.Label>Author</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="text"
                    placeholder="Enter Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <JoditEditor
                    id="description"
                    ref={editor}
                    value={description}
                    config={config}
                    tabIndex={1}
                    onBlur={(e) => setDescription(e)}
                  />
                </Form.Group>

                <Form.Group controlId="content">
                  <Form.Label>Content</Form.Label>
                  <JoditEditor
                    id="content"
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1}
                    onBlur={(e) => setContent(e)}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="btn btn-block bg-black hover:bg-gray-800"
                >
                  Update / Create Product
                </Button>
              </Form>
            )}
          </FormContainer>
        </div>
      </div>
    </>
  );
};

export default ArticleEditScreen;
