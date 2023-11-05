const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  Payment,
  paymentSuccess,
  Bid,
  createTrading,
  findTradings,
  findAllTradings,
  findByIdAndDelete,
  calculateResult,
  findTradingById,
  Sell,
  Withdraw,
  findWithdraws,
  withdrawComplete
} = require("../../controllers/trading.controllers");
const checkAuth = require("../../middleware/check-auth");

var storage = multer.diskStorage({
  destination: "public/uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({
  storage: storage,
});


router.get("/", findAllTradings);
router.post("/payment", checkAuth, Payment);
router.post("/paymentsuccess", checkAuth, paymentSuccess);
router.get("/withdraw", findWithdraws);
router.post("/withdraw", checkAuth, Withdraw);
router.put("/withdraw/complete/:id", checkAuth, withdrawComplete);
router.post("/sell/:id", checkAuth, Sell);
router.post("/bid/:id", checkAuth, Bid);
router.post("/result/:id", calculateResult);
router.get("/single/:id", findTradingById);
router.get("/:type", findTradings);
router.post("/:type", upload.single("image"), createTrading);
router.delete("/:id", findByIdAndDelete);

module.exports = router;
