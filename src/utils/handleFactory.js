import catchAsync from "./catchAsync.js";
import { handleValidationError } from "../errors/index.js";
import AppError from "./appError.js";
import APIFeatures from "./apiFeatures.js";

export const createOne = (Model, fields, validate) => {
  return catchAsync(async (req, res, next) => {
    const data = {};
    fields.forEach((el) => {
      data[el] = req.body[el];
    });
    const error = validate(data);
    if (error) return handleValidationError(res, error);
    const doc = await Model.create(data);
    res.status(201).json({
      status: "success",
      data: doc,
    });
  });
};

export const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(200).send({
      status: "success",
      message: "Document deleted successfully",
    });
  });

export const updateOne = (Model, fields, validate) => {
  return catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const data = {};
    fields.forEach((el) => {
      data[el] = req.body[el];
    });
    const docForUpdate = await Model.findById(id);
    if (!docForUpdate) {
      return next(new AppError("No document found with that ID", 404));
    }

    fields.forEach((el) => {
      if (!data[el]) {
        data[el] = docForUpdate[el];
      }
    });

    const error = validate(data);
    if (error) return handleValidationError(res, error);
    const doc = await Model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      status: "success",
      data: doc,
    });
  });
};

export const getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

export const getAll = (Model, numericFields) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    // if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(
      Model.find(filter),
      req.query,
      numericFields
    )
      .filter()
      .sort()
      .limitFields()
      .pagination();
    // const doc = await features.query.explain();
    const doc = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: doc,
    });
  });
