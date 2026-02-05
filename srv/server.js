const cds = require("@sap/cds");
const custom_auth = require("./custom-auth");

cds.on("bootstrap", (app) => {
  app.use(custom_auth); 
});

module.exports = cds.server;
