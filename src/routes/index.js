const express = require("express");
const router = express.Router();

// API 라우트 연결
router.use("/api", require("./api"));

module.exports = router;
