// const asyncHandler = require("express-async-handler");
// const Contact = require("../models/contactModel");

// const getContact = asyncHandler(async (req, res) => {
//   const contacts = await Contact.find({ user_id: req.user.id });
//   res.status(200).render("contacts/list", { contacts });
// });

// const createContact = asyncHandler(async (req, res) => {
//   console.log("THE REQUEST BODY IS : ", req.body);
//   const { name, email, phone } = req.body;
//   if (!name || !email || !phone) {
//     res.status(400);
//     throw new Error("ALL FIELDS MANDATORY");
//   }
//   await Contact.create({
//     name,
//     email,
//     phone,
//     user_id: req.user.id,
//   });
//   res.status(200).render("success");
// });

// const updateContact = asyncHandler(async (req, res) => {
//   const contact = await Contact.findById(req.params.id);
//   if (!contact) {
//     res.status(404);
//     throw new Error("CONTACT NOT FOUND");
//   }
//   if (contact.user_id.toString() !== req.user.id) {
//     res.status(401);
//     throw new Error("CANNOT UPDATE SOMEONE ELSE'S CONTACTS");
//   }
//   await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.status(200).render("success");
// });

// const deleteContact = asyncHandler(async (req, res) => {
//   try {
//     const contact = await Contact.findById(req.params.id);
//     if (!contact) {
//       res.status(404);
//       throw new Error("CONTACT NOT FOUND");
//     }
//     if (contact.user_id.toString() !== req.user.id) {
//       res.status(401);
//       throw new Error("CANNOT DELETE SOMEONE ELSE'S CONTACTS");
//     }
//     await Contact.findByIdAndDelete(req.params.id);
//     res.status(200).render("success");
//   } catch (error) {
//     console.error("Error deleting contact:", error);
//     res
//       .status(500)
//       .json({ message: "Error deleting contact", error: error.message });
//   }
// });

// const getidContact = asyncHandler(async (req, res) => {
//   const contact = await Contact.findById(req.params.id);
//   if (!contact) {
//     res.status(404).throw(new Error("CONTACT NOT FOUND"));
//   }
//   res.status(200).render("contacts/edit", { contact });
// });

// module.exports = {
//   getContact,
//   createContact,
//   updateContact,
//   deleteContact,
//   getidContact,
// };

const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).render("contacts/list", { contacts });
});

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const existingContact = await Contact.findOne({
    $or: [{ email }, { phone }],
    user_id: req.user.id,
  });
  if (existingContact) {
    res.status(400);
    throw new Error("Email or phone number already exists");
  }
  await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).redirect("/contacts/list");
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("You cannot update someone else's contacts");
  }
  const { email, phone } = req.body;
  const existingContact = await Contact.findOne({
    $or: [{ email }, { phone }],
    _id: { $ne: req.params.id },
    user_id: req.user.id,
  });
  if (existingContact) {
    res.status(400);
    throw new Error("Email or phone number already exists");
  }
  await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).redirect("/contacts/list");
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("You cannot delete someone else's contacts");
  }
  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).redirect("/contacts/list");
});

const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).render("contacts/edit", { contact });
});

module.exports = {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getContactById,
};
