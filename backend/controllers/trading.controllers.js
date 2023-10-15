const Trading = require("../models/Trading");
const Withdraw = require("../models/Withdraw");
const User = require("../models/User");
const Flutterwave = require("flutterwave-node-v3");
const flw = new Flutterwave(process.env.PUBLIC_KEY, process.env.SECRET_KEY);
const ErrorResponse = require("../utils/errorResponse");

exports.createTrading = async (req, res, next) => {
  try {
    req.body.bids = JSON.parse(req.body.bids);
    let trading = new Trading({
      ...req.body,
      image: req.file.filename,
      type: req.params.type,
    });

    const result = await trading.save();

    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Failed to Create the Post",
        data: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: `Successfully Created the ${req.params.type} Trading Post`,
      user: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: err.message,
      data: [],
    });
  }
};

exports.Withdraw = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.data[1]);
    req.body.User = { id: req.user.data[1], phoneNumber: user.phoneNumber };
    let withdraw = new Withdraw({
      ...req.body,
      Status: "pending"
    });

    const result = await withdraw.save();

    if (!result) {npm 
      return res.status(400).json({
        success: false,
        message: "Failed to Create the Withdraw",
        data: [],
      });
    }

    // Find the Trading document by its ID
   

    // Add the charge to the trading's bidding array
    user.amount = parseInt(user.amount) - parseInt(req.body.Amount);

    user.save();

    return res.status(200).json({
      success: true,
      message: `Successfully Created the Withdraw`,
      withdraw: result
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: err.message,
      data: [],
    });
  }
};

exports.findWithdraws = async (req, res, next) => {
  try {
    const withdraws = await Withdraw.find({});

    if (withdraws) {
      return res.status(200).json({
        success: true,
        message: "Got Data Successfully",
        data: withdraws.reverse(),
      });
    }
    return res.status(200).json({
      success: false,
      message: "No Data Found",
      data: [],
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: err.message,
      data: [],
    });
  }
};


exports.withdrawComplete = async (req, res, next) => {
  try {
    const result = await Withdraw.findByIdAndUpdate(req.params.id, {Status: "complete"});

    if (!result) {
      return next(new ErrorResponse("Update failed", 400));
    }

    return res.status(200).json({
      success: true,
      message: "Successfully Update the Withdraw",
      user: result,
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorResponse(err, 400));
  }
};

exports.findTradings = async (req, res, next) => {
  try {
    const tradings = await Trading.find({ type: req.params.type });

    if (tradings) {
      return res.status(200).json({
        success: true,
        message: "Got Data Successfully",
        data: tradings,
      });
    }
    return res.status(200).json({
      success: false,
      message: "No Data Found",
      data: [],
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: err.message,
      data: [],
    });
  }
};

exports.findTradingById = async (req, res, next) => {
  try {
    const trading = await Trading.findById(req.params.id);

    if (trading) {
      return res.status(200).json({
        success: true,
        message: "Got Data Successfully",
        data: trading,
      });
    }
    return res.status(200).json({
      success: false,
      message: "No Data Found",
      data: [],
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: err.message,
      data: [],
    });
  }
};

exports.findAllTradings = async (req, res, next) => {
  try {
    const tradings = await Trading.find({
      result: { $eq: "" },
    });

    if (tradings) {
      return res.status(200).json({
        success: true,
        message: "Got Data Successfully",
        data: tradings.reverse(),
      });
    }
    return res.status(200).json({
      success: false,
      message: "No Data Found",
      data: [],
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: err.message,
      data: [],
    });
  }
};

exports.findByIdAndDelete = async (req, res, next) => {
  try {
    const deletedtrading = await Trading.findByIdAndDelete(req.params.id);

    if (deletedtrading) {
      return res.status(200).json({
        success: true,
        message: "Successfully delete the Trading Post",
        data: [],
      });
    }
    return res.status(200).json({
      success: false,
      message: "Unable to delete the Trading Post",
      data: [],
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: err.message,
      data: [],
    });
  }
};

exports.calculateResult = async (req, res, next) => {
  try {
    const updatedTrading = await Trading.findByIdAndUpdate(req.params.id, {
      result: req.body.result,
    });

    if (updatedTrading) {
      return res.status(200).json({
        success: true,
        message: "Successfully calculated the result of Trading Post",
        data: [],
      });
    }
    return res.status(200).json({
      success: false,
      message: "Unable to delete the Trading Post",
      data: [],
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: err.message,
      data: [],
    });
  }
};

exports.Sell = async (req, res) => {
  try {
    console.log(req.body);
    const { oldamount, latestamount, share, bid } = req.body;

    var newAmount =
      parseInt(latestamount) - parseInt(oldamount) * parseFloat(share);
    var result = (newAmount * 10) / 100;

    // Find the Trading document by its ID
    const user = await User.findById(req.user.data[1]);

    // Add the charge to the trading's bidding array
    user.amount =
      parseInt(user.amount) + parseInt(latestamount) - parseInt(result);
    user.profit = parseInt(user.profit) + parseInt(newAmount);

    const existingBidIndex = user.bids.findIndex(
      (existingBid) => existingBid.tradingId === req.params.id
    );

    // Remove the existing bid at the specified index
    if (existingBidIndex !== -1 && user.bids[existingBidIndex].bid == bid) {
      // If an existing bid is found, update its values
      user.bids[existingBidIndex].share = (
        parseFloat(user.bids[existingBidIndex].share) - parseFloat(share)
      ).toFixed(2);
      user.bids[existingBidIndex].sold =
        user.bids[existingBidIndex].share > 0 ? false : true;
      // Mark the 'bids' array as modified
      user.markModified("bids");
    }

    // Save the updated trading document
    await user.save();

    res.status(200).json({
      message: "Sell Bid successfully",
      amount: user?.amount,
      profit: user?.profit,
    });
  } catch (error) {
    console.error("failed:", error);
    res.status(500).json({ error: "failed" });
  }
};

exports.Bid = async (req, res) => {
  try {
    const { bid, amount, bidamount } = req.body;

    // Find the Trading document by its ID
    const trading = await Trading.findById(req.params.id);

    if (!trading) {
      return res.status(404).json({ error: "Trading not found" });
    }

    var share = (parseFloat(bidamount) / parseFloat(amount)).toFixed(2);

    // Add the charge to the trading's bidding array
    trading.bids.push({
      bid: bid,
      share: share,
      oldamount: amount,
      bidamount: bidamount,
      userId: req.user.data[1],
    });

    // Save the updated trading document
    await trading.save();

    // Find the Trading document by its ID
    const user = await User.findById(req.user.data[1]);

    // Add the charge to the trading's bidding array
    user.amount = parseInt(user.amount) - parseInt(bidamount);

    const existingBidIndex = user.bids.findIndex(
      (existingBid) =>
        existingBid.tradingId === req.params.id &&
        existingBid.bid === req.body.bid
    );

    if (existingBidIndex !== -1 && user.bids[existingBidIndex].bid == bid) {
      // If an existing bid is found, update its values
      user.bids[existingBidIndex].share = (
        parseFloat(user.bids[existingBidIndex].share) + parseFloat(share)
      ).toFixed(2);
      user.bids[existingBidIndex].oldamount = (
        (parseFloat(user.bids[existingBidIndex].oldamount) +
          parseFloat(amount)) /
        2
      )
        .toFixed(2)
        .toString();
      user.bids[existingBidIndex].bidamount = (
        parseFloat(user.bids[existingBidIndex].bidamount) +
        parseFloat(bidamount)
      ).toString();
      // Mark the 'bids' array as modified
      user.markModified("bids");
    } else {
      // If no existing bid is found, push a new bid
      user.bids.push({
        bid: bid,
        share: share,
        oldamount: amount,
        bidamount: bidamount,
        tradingId: trading.id,
        tradingName: trading.title,
        sold: false,
      });
    }

    // Save the updated trading document
    await user.save();

    res.status(200).json({ message: "Bid Placed successfully", amount });
  } catch (error) {
    console.error("Payment failed:", error);
    res.status(500).json({ error: "Payment failed" });
  }
};

exports.Payment = async (req, res) => {
  // console.log(req,"req.bodyreq.bodyreq.bodyreq.bodyreq.body")
  try {
    const { card_number, cvv, expiry_month, expiry_year, amount } = req.body;
    const user = await User.findById(req.user.data[1]);
    // Create a customer in Stripe
    const payload = {
      card_number: card_number,
      cvv: cvv,
      expiry_month: expiry_month,
      expiry_year: expiry_year,
      currency: "NGN",
      amount: amount,
      email: user.email,
      fullname: user.fullName,
      tx_ref: "YOUR_PAYMENT_REFERENCE",
      enckey: process.env.ENCRYPTION_KEY,
    };
    flw.Charge.card(payload).then(async (response) => {
      console.log(response);

      // Add the charge to the trading's bidding array
      user.amount = parseInt(user.amount) + parseInt(amount);

      user.history.push(amount);

      // Save the updated trading document
      await user.save();

      res.status(200).json({ message: "Payment successful", amount: amount });
    });
  } catch (error) {
    console.error("Payment failed:", error);
    res.status(500).json({ error: "Payment failed" });
  }
};
