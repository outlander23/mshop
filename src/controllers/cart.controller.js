import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const addUserID = (req, res, next) => {
  if (!req.body.userID) req.body.userID = req.user.id;
  next();
};

export const addToCart = catchAsync(async (req, res) => {
  const { productID, quantity, userID } = req.body;

  console.log(productID, quantity, userID);

  let name, price;
  let cart = await Cart.findOne({ userID });
  const product = await Product.findById(productID);

  if (!product) {
    return next(AppError("No product found with this id", 403));
  }

  name = product.name;
  price = product.price;

  if (cart) {
    let itemIndex = cart.products.findIndex((p) => p.productID == productID);

    if (itemIndex > -1) {
      const productItem = cart.products[itemIndex];
      productItem.quantity = quantity;
      cart.products[itemIndex] = productItem;
    } else {
      cart.products.push({ productID, quantity, price, name });
    }

    let totalPrice = 0;
    for (let i = 0; i < cart.products.length; i++) {
      totalPrice += cart.products[i].price * cart.products[i].quantity;
    }
    cart.total = totalPrice;
    cart = await cart.save();
    return res.status(201).send(cart);
  } else {
    const newCart = await Cart.create({
      userID,
      products: [{ productID, quantity, name, price }],
      total: price * quantity,
    });

    return res.status(201).send(newCart);
  }
});
