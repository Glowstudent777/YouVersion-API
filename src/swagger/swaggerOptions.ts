import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "YouVersion API",
      version: "1.0.0",
      description: "Express Rest API for getting verses and such from YouVersion.",
      contact: {
        url: "https://github.com/Glowstudent777/YouVersion-API"
      }
    }
  },
  apis: [
    "./src/api/v1/verse/*.ts",
    "./src/api/v1/votd/*.ts",
    "./src/api/v1/status.ts"
  ]
};
