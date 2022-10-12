import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        productID: Schema.Types.ObjectId,
        quantity: Number,
        name: String,
        price: Number,
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    modifiedOn: {
      type: Date,
      default: Date.now,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// const cartFields = [
//   "userID",
//   "brand",
//   "photo",
//   "price",
//   "discount",
//   "quantity",
//   "description",
// ];

// const cartNumericFields = [
//   "price",
//   "quantity",
//   "discount",
//   "avg_rating",
//   "number_of_review",
// ];

const Cart = new mongoose.model("Cart", cartSchema);

export { Cart };
