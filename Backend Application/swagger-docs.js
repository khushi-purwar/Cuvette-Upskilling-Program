const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "E-Commerce API",
      description: "A simple express E-Commerce API",
      version: "1.0.0",
      contact: {
        name: "Khushi Purwar",
        email: "khushipurwar4@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server",
      },
    ],

    components: {
        schemas: {
          // user model
          id: {
            type: "string", // data type
            description: "An id of a todo", // desc
            example: "tyVgf", // example of an id
          },
        },
      },
  },
  apis: ["./routes/api/v1/*.js"],
 
};


const spec = swaggerJsDoc(options);

module.exports = { swaggerUI, spec };
