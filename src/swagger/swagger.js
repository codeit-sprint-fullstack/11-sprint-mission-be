import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Docs",
      version: "1.0.0",
    },
  },
  // 라우터 파일에 적은 @swagger 주석을 읽어오는 경로
  apis: ["./src/routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
