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

    tags: [
      {
        name: "User operations",
      },
      {
        name: "Product operations",
      },
      {
        name: "Cart operations",
      },
    ],

    components: {
      schemas: {
        // user model
        User: {
          type: "object",
          properties: {
            firstName: {
              type: "string",
              description: "First name of the user",
              example: "Khushi",
            },
            lastName: {
              type: "string",
              description: "Last name of the user",
              example: "Purwar",
            },
            username: {
              type: "string",
              description: "username will be unique",
              example: "khushiP123",
            },
            email: {
              type: "string",
              description: "Email of the user",
              example: "khushi123@gmail.com",
            },
            passwrod: {
              type: "string",
              description: "Password",
              example: "khushipur123",
            },
            role: {
              type: "string",
              enum: ["Consumer", "Admin", "Supplier"],
              description: "Role of the user",
              example: " Admin ",
            },
          },
        },
        // product schema
        Product: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of the product",
              example: "Watch",
            },
            price: {
              type: "number",
              description: "price of the product",
              example: "12999",
            },
            qty: {
              type: "number",
              description: "Quantity of the product",
              example: "100",
            },
            desc: {
              type: "string",
              description: "About the product",
              example:
                "LCS-8188 BLUE DIAL AND SILVER STRAP DAY & DATE FUNCTIONING WATCH FOR BOYS Analog Watch - For Men",
            },
            productPictures: {
              type: "array",
              description: "Product pictures",
            },
          },
        },
      },
    },

    paths: {
      "/api/v1/consumer/signup": {
        post: {
          tags: ["User operations"],
          description: "Register Consumer",
          operationId: "registerconsumer",
          parameters: [
            {
                "-in": "body",
               name: "body",
               description: "",
               required: true,
               schema: {
                email : "khushi123@gmail.com",
                password : "khushi123"
              },
            }
             ],
          responses: {
            200: {
              description: "Consumer register successfully",
              content: {
                // content-type
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/User", 
                  },
                },
              },
            },
            400: {
              description: "Something went wrong!",
             
            },
          },
        },
      },
      "/api/v1/consumer/signin": {
        post: {
          tags: ["User operations"],
          description: "Login Consumer",
          operationId: "loginconsumer",
          parameters: [
         {
              "-in": "body",
            name: "body",
            description: "",
            required: true,
            schema:
           { $ref: "#/components/schemas/user"}
         }
          ],
          responses: {
            200: {
              description: "Consumer login successfully",

            },
          },
        },
      },
    },
  },
  apis: ["./routes/api/v1/*.js"],
};

const spec = swaggerJsDoc(options);

module.exports = { swaggerUI, spec };
