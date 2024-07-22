// const express = require("express");
// const router = express.Router();
// const verifyToken = require("../middleware/auth");
// const {
//   getContact,
//   createContact,
//   updateContact,
//   deleteContact,
//   getidContact,
// } = require("../controllers/contactController");

// router.use(verifyToken);

// router.get("/list", getContact);
// router.get("/create", (req, res) => {
//   res.render("contacts/create");
// });
// router.post("/create", createContact);
// router.get("/edit/:id", getidContact);
// router.put("/edit/:id", updateContact);
// router.delete("/edit/:id", deleteContact);

// module.exports = router;

const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getContactById,
} = require("../controllers/contactController");

router.use(verifyToken);

router.get("/list", getContact);
router.get("/create", (req, res) => {
  res.render("contacts/create");
});
router.post("/create", createContact);
router.get("/edit/:id", getContactById);
router.put("/edit/:id", updateContact);
router.delete("/edit/:id", deleteContact);

module.exports = router;
