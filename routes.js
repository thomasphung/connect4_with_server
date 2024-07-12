/** Routes for Lunchly */
const express = require("express");
const router = new express.Router();


/** Homepage: show list of customers. */

router.get("/", async function(req, res, next) {
  try {
    return res.render("index.html", { customers });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
