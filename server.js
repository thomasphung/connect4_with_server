/** Start server for Lunchly. */
const express = require("express");
const app = require("./index");



app.listen(3000, function() {
  console.log("listening on 3000");
});
