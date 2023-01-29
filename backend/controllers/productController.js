import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const brandKeyword = req.query.keyword
    ? {
        brand: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const categoryKeyword = req.query.keyword
    ? {
        category: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({
    $or: [{ ...keyword }, { ...brandKeyword }, { ...categoryKeyword }],
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort([["createdAt", -1]]);

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//GET PRODUCT BY BRAND

const getProductsByBrand = asyncHandler(async (req, res) => {
  const product = await Product.find({ brand: req.params.brand });
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

const getProductsByCategory = asyncHandler(async (req, res) => {
  const product = await Product.find({ category: req.params.category });
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image:
      "https://images.selfedge.com/cache/catalog/20210716/Samurai_Blank_T_Shirt_2_Pack_Medium_Weight_White-4-1025x680.jpg",
    additionalimageone: "",
    additionalimagetwo: "",
    additionalimagethree: "",
    digitalLink: "",
    productVideo: "",
    productTutorial: "",
    onSalePrice: 0,
    onSaleBadge: false,
    productImportantInformation: "",
    brand: "Creative Duo LLC",
    category: "Handmade",
    countInStock: 20,
    numReviews: 0,
    description: "Sample description",
    shortdescription: "Sample description",
    shippingReturnPolicy: "Sample description",
    type: "Physical",
    productWeightLbs: 0,
    productWeightOz: 0,
    productOptions: ["Sample option"],
    // colors: ["Sample color"],
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  console.log("product options >>", req.body.productOptions);
  const {
    name,
    price,
    description,
    shippingReturnPolicy,
    shortdescription,
    productWeightLbs,
    productWeightOz,
    digitalLink,
    type,
    image,
    brand,
    category,
    countInStock,
    additionalimageone,
    additionalimagetwo,
    additionalimagethree,
    productVideo,
    productTutorial,
    onSaleBadge,
    onSalePrice,
    specialPriceDiscountText,
    productImportantInformation,
    productOptions,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.digitalLink = digitalLink;
    product.description = description;
    product.shippingReturnPolicy = shippingReturnPolicy;
    product.shortdescription = shortdescription;
    product.productWeightLbs = productWeightLbs;
    product.productWeightOz = productWeightOz;
    product.type = type;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.additionalimageone = additionalimageone;
    product.additionalimagetwo = additionalimagetwo;
    product.additionalimagethree = additionalimagethree;
    product.productVideo = productVideo;
    product.productTutorial = productTutorial;
    product.onSaleBadge = onSaleBadge;
    product.onSalePrice = onSalePrice;
    product.specialPriceDiscountText = specialPriceDiscountText;
    product.productImportantInformation = productImportantInformation;
    product.productOptions = productOptions;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const review = {
      name: req.user.name,
      rating: Number(rating),
      profileImage: req.user.profileImage,
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const deleteProductReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    /// removing the specific review
    product.reviews = product.reviews.filter(
      (review) => review._id.toString() !== reviewId
    );

    // This bottom part deletes the bug for the number of reviews made.
    product.numReviews = product.numReviews - 1;

    product.rating =
      product.reviews.length > 0
        ? product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          product.reviews.length
        : 0;

    await product.save();
    res.status(201).json({ message: "Review deleted" });
  } else {
    res.status(404);
    throw new Error("Review not Deleted");
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public

// GET TOP RATED PRODUCTS

const getTopProducts = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const products = await Product.find({}).sort({ rating: -1 }).limit(4);
  res.json(products);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  deleteProductReview,
  getTopProducts,
  getProductsByBrand,
  getProductsByCategory,
};
