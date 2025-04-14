const express = require("express");
const router = express.Router();

// 각 라우트 파일 연결
router.use("/health", require("./health.route"));
router.use("/pets", require("./pet.route"));

module.exports = router;
