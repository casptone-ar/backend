require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./config/logger");
const swaggerSpec = require("./config/swagger");
const swaggerUi = require("swagger-ui-express");

const app = express();

// CORS 설정 (개발용 상세 설정)
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.ALLOWED_ORIGINS.split(",")
      : "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(
  morgan("combined", {
    stream: logger.morganStream, // Winston과 호환되는 스트림 사용
  })
);
app.use(express.json());

// Swagger UI 설정
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customSiteTitle: "AR Pet API Docs",
  })
);

// 라우트 설정
app.use("/api/v1", require("./routes/api"));

// 상태 체크 엔드포인트
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    nodeVersion: process.version,
    memoryUsage: process.memoryUsage(),
  });
});

// 에러 핸들링
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
  logger.info(`API Docs: http://localhost:${PORT}/api-docs`);
});
