require("dotenv").config();
const express = require("express");
const app = express();
const expressSwagger = require("express-swagger-generator")(app);

let options = {
  swaggerDefinition: {
    info: {
      description:
        "API Server to get info on teams and people stored in local db",
      title: "Lab-07",
      version: "1.0.1"
    },
    host: process.env.HOST_URL,
    basePath: "/",
    produces: ["application/json"],
    schemes: ["http", "https"],
    securityDefinitions: {
      basicAuth: {
        type: "basic"
      }
    }
  },
  basedir: __dirname, //app absolute path
  files: ["../../lib/*.js", "../../lib/routes/*.js"] //Path to the API handle folder
};
expressSwagger(options);
// start up a specific standalone swagger server on a specific port
app.listen(process.env.SWAG_PORT, () =>
  console.log(`Swagger up on port ${process.env.SWAG_PORT}`)
);
