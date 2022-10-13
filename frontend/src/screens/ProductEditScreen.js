import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import JoditEditor from "jodit-react";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const editor = useRef(null);
  const config = {
    readonly: false,
    placeholder: "Write product description...",
    askBeforePasteHTML: false,
  };

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [additionalimageone, setAdditionalimageone] = useState("");
  const [additionalimagetwo, setAdditionalimagetwo] = useState("");
  const [additionalimagethree, setAdditionalimagethree] = useState("");
  const [productVideo, setProductVideo] = useState("");
  const [productTutorial, setProductTutorial] = useState("");
  const [
    productImportantInformation,
    setProductImportantInformation,
  ] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [shortdescription, setShortdescription] = useState("");
  const [productWeightLbs, setProductWeightLbs] = useState(0);
  const [productWeightOz, setProductWeightOz] = useState(0);
  const [type, setType] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        setProductWeightLbs(product.productWeightLbs);
        setProductWeightOz(product.productWeightOz);
        setShortdescription(product.shortdescription);
        setType(product.type);
        setAdditionalimageone(product.additionalimageone);
        setAdditionalimagetwo(product.additionalimagetwo);
        setAdditionalimagethree(product.additionalimagethree);
        setProductImportantInformation(product.productImportantInformation);
        setProductVideo(product.productVideo);
        setProductTutorial(product.productTutorial);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

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

  const uploadFileHandlerone = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      setAdditionalimageone(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const uploadFileHandlertwo = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      setAdditionalimagetwo(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const uploadFileHandlerthree = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      setAdditionalimagethree(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (countInStock >= 0) {
      dispatch(
        updateProduct({
          _id: productId,
          name,
          price,
          image,
          brand,
          category,
          description,
          productWeightLbs,
          productWeightOz,
          shortdescription,
          type,
          countInStock,
          additionalimageone,
          additionalimagetwo,
          additionalimagethree,
          productVideo,
          productTutorial,
          productImportantInformation,
        })
      );
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-dark my-3">
        Go Back
      </Link>

      <div className="flex product-edit-container">
        <div className="product-preview bg-slate-100">
          <h1 className="text-3xl font-medium mb-3 mt-3 p-2">Preview</h1>

          <Image src={product.image} width="100%" className="p-2" fluid />
          <div className="Product-Card-Body">
            <p className="font-bold text-[1.7em] font-sans uppercase mb-[.5em] text-black">
              {name}
            </p>

            <p className="font-bold text-2xl mt-3">${price}</p>
          </div>
        </div>
        <div className="product-info">
          <FormContainer>
            <h1 className="font-medium mb-2 text-2xl">Edit Product</h1>

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

                <Form.Group controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    step="any"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
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

                <Form.Group controlId="Additionalimageone">
                  <Form.Label>Additional Image 1 </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter image URL"
                    value={additionalimageone}
                    onChange={(e) => setAdditionalimageone(e.target.value)}
                  ></Form.Control>
                  <Form.File
                    label="Choose File"
                    custom
                    onChange={uploadFileHandlerone}
                  ></Form.File>
                  {uploading && <Loader />}
                </Form.Group>

                <Form.Group controlId="Additionalimagetwo">
                  <Form.Label>Additional Image 2 </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter image URL"
                    value={additionalimagetwo}
                    onChange={(e) => setAdditionalimagetwo(e.target.value)}
                  ></Form.Control>
                  <Form.File
                    label="Choose File"
                    custom
                    onChange={uploadFileHandlertwo}
                  ></Form.File>
                  {uploading && <Loader />}
                </Form.Group>

                <Form.Group controlId="Additionalimagethree">
                  <Form.Label>Additional Image 3 </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter image URL"
                    value={additionalimagethree}
                    onChange={(e) => setAdditionalimagethree(e.target.value)}
                  ></Form.Control>
                  <Form.File
                    label="Choose File"
                    custom
                    onChange={uploadFileHandlerthree}
                  ></Form.File>
                  {uploading && <Loader />}
                </Form.Group>

                <Form.Group controlId="brand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    as="select"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="Creative Duo">Creative Duo</option>
                    <option value="Anna Sweet Treats">Anna Sweet Treats</option>
                    <option value="Other">Other</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="shortdescription">
                  <Form.Label>Short Description</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter Short Descriptor"
                    value={shortdescription}
                    onChange={(e) => setShortdescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="countInStock">
                  <Form.Label>Count In Stock</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter countInStock"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  ></Form.Control>
                  {countInStock < 0 && (
                    <i style={{ float: "right", margin: "10px", color: "red" }}>
                      Please enter a valid Stock Count
                    </i>
                  )}
                </Form.Group>

                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="...">Select...</option>
                    <option value="3D Printed">3D Printed</option>
                    <option value="Smart">Smart</option>
                    <option value="Business">Business</option>
                    <option value="Other">Other</option>
                  </Form.Control>
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
                  {/* <Form.Control
                as="textarea"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control> */}
                </Form.Group>

                <Form.Group controlId="productVideo">
                  <Form.Label>Product Video</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Video URL"
                    value={productVideo}
                    onChange={(e) => setProductVideo(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="productTutorial">
                  <Form.Label>Product Tutorial</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Video URL"
                    value={productTutorial}
                    onChange={(e) => setProductTutorial(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="productImportantInformation">
                  <Form.Label>Product Information</Form.Label>
                  <JoditEditor
                    id="productImportantInformation"
                    ref={editor}
                    value={productImportantInformation}
                    config={config}
                    tabIndex={1}
                    onBlur={(e) => setProductImportantInformation(e)}
                  />
                  {/* <Form.Control
                type="text"
                placeholder="Enter Product Info"
                value={productImportantInformation}
                onChange={(e) => setProductImportantInformation(e.target.value)}
              ></Form.Control> */}
                </Form.Group>

                <Form.Group controlId="type">
                  <Form.Label>Product Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="...">Select...</option>
                    <option value="Physical">Physical</option>
                    <option value="Digital">Digital</option>
                  </Form.Control>
                </Form.Group>

                <h1 className="font-bold text-[1.7em] font-sans uppercase mb-[.5em] text-black">
                  Shipping Information
                </h1>
                <Form.Group controlId="productWeightLbs">
                  <Form.Label>Product Weight in Lbs</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Product Weight in Pounds"
                    value={productWeightLbs}
                    onChange={(e) => setProductWeightLbs(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="productWeightOz">
                  <Form.Label>Product Weight in Oz</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Product Weight in Ounces"
                    value={productWeightOz}
                    onChange={(e) => setProductWeightOz(e.target.value)}
                  ></Form.Control>
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

export default ProductEditScreen;
