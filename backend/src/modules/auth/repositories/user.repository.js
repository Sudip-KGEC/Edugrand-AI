import User from "../models/User.model.js";

export const findByEmail = (email) =>
  User.findOne({ email });

export const findById = (id) =>
  User.findById(id);

export const createUser = (data) =>
  User.create(data);

export const updateUser = (id, data) =>
  User.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  });

export const deleteUser = (id) =>
  User.findByIdAndDelete(id);