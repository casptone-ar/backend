const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AR Pet Health API",
      version: "1.0.0",
      description: "가상 애완동물 키우기 백엔드 API",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [
    path.join(__dirname, "../routes/api/*.route.js"),
    path.join(__dirname, "../swagger/*.yaml"),
  ],
};

module.exports = swaggerJSDoc(options);
