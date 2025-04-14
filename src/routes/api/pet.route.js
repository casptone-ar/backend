const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: 서버 상태 확인
 *     tags: [System]
 *     responses:
 *       200:
 *         description: 서버 정상 작동 중
 */
router.get("/pet", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
